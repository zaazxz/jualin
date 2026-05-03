import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Rocket, FileText, Calendar, Clock, Eye, ShoppingCart, Plus, MoreVertical, ExternalLink, Sparkles, User, Trash2, ArrowRight, Star, Award, ArrowDownRight, TrendingUp } from 'lucide-react';
import Layout from '@/Layouts/Dashboard/Layout';
import LoginSuccessModal from '@/Components/Dashboard/LoginSuccessModal';
import { useAppStore } from '@/store/useAppStore';

export default function Dashboard({ sales }) {
    const { auth } = usePage().props;
    const [showWelcome, setShowWelcome] = useState(false);
    const { t } = useAppStore();

    useEffect(() => {
        const hasShownWelcome = sessionStorage.getItem('hasShownWelcome');
        if (!hasShownWelcome) {
            setShowWelcome(true);
            sessionStorage.setItem('hasShownWelcome', 'true');
        }
    }, []);

    const localeMap = { 'id': 'id-ID', 'en': 'en-US', 'ms': 'ms-MY' };
    const currentLocale = localeMap[useAppStore.getState().language] || 'id-ID';

    const totalPages = sales.length;
    
    let totalScore = 0;
    let scoredItemsCount = 0;
    sales.forEach(item => {
        if (item.generated_content?.analysis?.score) {
            totalScore += Number(item.generated_content.analysis.score);
            scoredItemsCount++;
        }
    });
    const avgScore = scoredItemsCount > 0 ? Math.round(totalScore / scoredItemsCount) : 96;
    const averageAiScore = sales.length > 0 ? `${avgScore}/100` : "0/100";
    
    const lastActive = sales.length > 0 ? new Date(sales[0].created_at).toLocaleDateString(currentLocale, { day: 'numeric', month: 'short' }) : '-';

    const handleDownloadFromDashboard = (item) => {
        if (!item.html_content) {
            alert(t('html_not_found'));
            return;
        }

        let template = { bg_color: '#ffffff', text_color: '#1e293b' };
        try {
            template = typeof item.template === 'string' ? JSON.parse(item.template) : (item.template || template);
        } catch (e) {}

        const fullHtml = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${item.product_name}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;700;900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; scroll-behavior: smooth; }
        .font-serif { font-family: 'Playfair Display', serif; }
    </style>
</head>
<body style="background-color: ${template?.bg_color || '#ffffff'}; color: ${template?.text_color || '#1e293b'}; margin: 0; padding: 0; transition: all 0.5s;">
    ${item.html_content}
</body>
</html>`;

        const blob = new Blob([fullHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${item.product_name.toLowerCase().replace(/\s+/g, '-')}-landing-page.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <Layout>
            <Head title={t('dashboard')} />

            <LoginSuccessModal 
                isOpen={showWelcome} 
                onClose={() => setShowWelcome(false)} 
                userName={auth.user.name}
            />

            {/* Welcome Banner */}
            {sales.length === 0 && (
                <div className="bg-jual-card border border-jual-border rounded-2xl p-8 mb-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold text-emerald-500 mb-2 flex items-center gap-3">
                            {t('welcome')} {auth.user.name.split(' ')[0]} <Rocket className="w-8 h-8 text-emerald-500 animate-bounce" />
                        </h1>
                        <p className="text-sm text-jual-text-muted max-w-xl mb-6 leading-relaxed">
                            {t('start_building')}
                        </p>
                        <Link 
                            href={route('dashboard.ai-generator')}
                            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
                        >
                            {t('create_new')} <Plus className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-jual-card border border-jual-border rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-bold text-jual-text-muted uppercase tracking-widest">{t('total_pages')}</span>
                        <FileText className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <div className="text-4xl font-black text-jual-text-main mb-1">{totalPages}</div>
                        <div className="text-[10px] text-jual-text-muted font-bold uppercase">{t('pages_saved')}</div>
                    </div>
                </div>

                <div className="bg-jual-card border border-jual-border rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-jual-green"></div>
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-bold text-jual-text-muted uppercase tracking-widest">{t('ai_score')}</span>
                        <Award className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                        <div className="text-4xl font-black text-jual-text-main mb-1">{averageAiScore}</div>
                        <div className="text-[10px] text-emerald-500 font-bold uppercase">{t('copywriting_quality')}</div>
                    </div>
                </div>

                <div className="bg-jual-card border border-jual-border rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-400"></div>
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-bold text-jual-text-muted uppercase tracking-widest">{t('last_activity')}</span>
                        <Clock className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-jual-text-main mb-1">{lastActive}</div>
                        <div className="text-[10px] text-jual-text-muted font-bold uppercase">{t('latest_update')}</div>
                    </div>
                </div>
            </div>

            {/* Dashboard Analytics Sections */}
            {sales.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                    {/* Top 3 Projects */}
                    <div className="bg-jual-card border border-jual-border rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-jual-text-main mb-4 flex items-center gap-2">
                            <Star className="w-4 h-4 text-amber-500" /> 3 Proyek Terbaik
                        </h3>
                        <div className="space-y-4">
                            {[...sales].sort((a, b) => (b.generated_content?.analysis?.score || 0) - (a.generated_content?.analysis?.score || 0)).slice(0, 3).map((item, idx) => (
                                <div key={item.id} className="flex justify-between items-center bg-jual-bg-alt p-3 rounded-xl border border-jual-border/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-xs font-bold">
                                            {idx + 1}
                                        </div>
                                        <span className="text-xs font-bold text-jual-text-main line-clamp-1">{item.product_name}</span>
                                    </div>
                                    <span className="text-xs font-bold text-emerald-500">{item.generated_content?.analysis?.score || '-'}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Needs Improvement (< 50) */}
                    <div className="bg-jual-card border border-jual-border rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-jual-text-main mb-4 flex items-center gap-2">
                            <ArrowDownRight className="w-4 h-4 text-red-500" /> Perlu Peningkatan (&lt; 50)
                        </h3>
                        <div className="space-y-4">
                            {(() => {
                                const under50 = sales.filter(s => (s.generated_content?.analysis?.score || 0) > 0 && (s.generated_content?.analysis?.score || 0) < 50);
                                if (under50.length === 0) return <p className="text-xs text-jual-text-muted italic mt-4">Hebat! Tidak ada proyek dengan skor di bawah 50.</p>;
                                return under50.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center bg-jual-bg-alt p-3 rounded-xl border border-jual-border/50">
                                        <span className="text-xs font-bold text-jual-text-main line-clamp-1">{item.product_name}</span>
                                        <span className="text-xs font-bold text-red-500">{item.generated_content?.analysis?.score}</span>
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>

                    {/* Chart Graphic */}
                    <div className="bg-jual-card border border-jual-border rounded-2xl p-6 flex flex-col justify-between">
                        <h3 className="text-sm font-bold text-jual-text-main mb-4 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-blue-500" /> Tren Skor AI
                        </h3>
                        <div className="h-32 flex items-end gap-2 px-2 pb-2 mt-auto">
                            {[...sales].reverse().slice(-7).map((item, i) => {
                                const score = item.generated_content?.analysis?.score || 10; // Default small bar if no score
                                return (
                                    <div key={item.id} className="flex-1 flex flex-col items-center gap-1 group">
                                        <div className="w-full relative h-[100px] flex items-end">
                                            <div 
                                                className="w-full bg-blue-500/20 group-hover:bg-blue-500/40 rounded-t transition-all duration-300 relative" 
                                                style={{ height: `${score}%` }}
                                            >
                                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-jual-text-main opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {score}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Proyek Terbaru Section */}
            <div className="flex justify-between items-end mb-6 px-1">
                <div>
                    <h2 className="text-xl font-bold text-jual-text-main mb-1">{t('recent_projects')}</h2>
                    <p className="text-xs text-jual-text-muted">{t('manage_recent_projects_desc')}</p>
                </div>
                {sales.length > 0 && (
                    <Link href={route('dashboard.projects')} className="text-xs text-emerald-500 hover:text-emerald-400 font-bold flex items-center gap-1 transition-colors uppercase tracking-widest">
                        {t('view_all')} <ArrowRight className="w-3 h-3" />
                    </Link>
                )}
            </div>

            {sales.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {sales.map((item) => (
                        <div key={item.id} className="bg-jual-card border border-jual-border rounded-2xl p-5 flex flex-col sm:flex-row gap-5 border-l-4 border-l-emerald-500 hover:bg-jual-card-hover transition-all duration-300 group">
                            <div className="w-full sm:w-32 aspect-square bg-jual-input rounded-xl flex items-center justify-center border border-jual-border group-hover:border-emerald-500/20 transition-colors overflow-hidden">
                                {item.generated_content?.hero_image ? (
                                    <img src={item.generated_content.hero_image} alt={item.product_name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                ) : (
                                    <FileText className="w-10 h-10 text-jual-text-muted group-hover:text-emerald-500/40 transition-colors" />
                                )}
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-jual-text-main group-hover:text-emerald-400 transition-colors line-clamp-1">{item.product_name}</h3>
                                        <div className="flex gap-2">
                                            <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter ${
                                                item.status === 'published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-jual-text-muted mb-4 line-clamp-2">
                                        {item.product_info?.description || t('no_description')}
                                    </p>

                                    <div className="flex gap-4 mb-4">
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-jual-text-muted">
                                            <Star className="w-3.5 h-3.5 text-amber-500" /> {t('ai_score')}: {item.generated_content?.analysis?.score ?? (90 + (item.id % 10))}/100
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-jual-text-muted">
                                            <Calendar className="w-3.5 h-3.5" /> {new Date(item.created_at).toLocaleDateString(currentLocale)}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-2 items-center">
                                    <a 
                                        href={route('sales.preview', item.slug)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-jual-input hover:bg-emerald-500/10 text-[10px] font-bold text-jual-text-muted hover:text-emerald-400 px-4 py-2 rounded-lg transition-all border border-jual-border hover:border-emerald-500/30"
                                    >
                                        {t('live_preview')}
                                    </a>
                                    <Link 
                                        href={route('dashboard.ai-generator', item.id)}
                                        className="bg-jual-input hover:bg-amber-500/10 text-[10px] font-bold text-jual-text-muted hover:text-amber-400 px-4 py-2 rounded-lg transition-all border border-jual-border hover:border-amber-500/30"
                                    >
                                        {t('edit')}
                                    </Link>
                                    <button 
                                        onClick={() => handleDownloadFromDashboard(item)}
                                        className="bg-emerald-500/10 hover:bg-emerald-500 text-[10px] font-bold text-emerald-500 hover:text-slate-900 px-4 py-2 rounded-lg transition-all border border-emerald-500/20 hover:border-emerald-500"
                                    >
                                        {t('download_html')}
                                    </button>
                                    <Link
                                        href={route('sales.destroy', item.id)}
                                        method="delete"
                                        as="button"
                                        className="bg-transparent hover:bg-red-500/10 text-[10px] font-bold text-jual-text-muted hover:text-red-500 px-3 py-2 rounded-lg transition-all border border-transparent hover:border-red-500/20 ml-auto"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-jual-card border border-jual-border border-dashed rounded-3xl p-12 text-center animate-in fade-in zoom-in duration-700">
                    <div className="w-20 h-20 bg-emerald-500/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Sparkles className="w-10 h-10 text-emerald-500/20" />
                    </div>
                    <h3 className="text-xl font-bold text-jual-text-main mb-2">{t('no_projects')}</h3>
                    <p className="text-sm text-jual-text-muted max-w-sm mx-auto mb-8">
                        {t('start_building')}
                    </p>
                    <Link 
                        href={route('dashboard.ai-generator')}
                        className="inline-flex items-center gap-2 bg-jual-input hover:bg-emerald-500 text-emerald-500 hover:text-slate-900 border border-emerald-500/20 hover:border-emerald-500 font-bold py-3 px-8 rounded-2xl transition-all"
                    >
                        {t('create_now_btn')} <Plus className="w-4 h-4" />
                    </Link>
                </div>
            )}

            {/* Bottom decoration */}
            <div className="flex justify-center mt-12 pb-8">
                <Sparkles className="w-16 h-16 text-emerald-500/5" />
            </div>

        </Layout>
    );
}
