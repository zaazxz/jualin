import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { BarChart3, TrendingUp, Users, ShoppingCart, ArrowUpRight, ArrowDownRight, Calendar, Download, MousePointerClick, Globe2, Sparkles, BookOpen, Target, Star, ChevronDown } from 'lucide-react';
import Layout from '@/Layouts/Dashboard/Layout';
import { useAppStore } from '@/store/useAppStore';

export default function Analytics({ sales }) {
    const { t } = useAppStore();
    
    const analysis = sales?.generated_content?.analysis || {};

    return (
        <Layout>
            <Head title={t('analytics')} />

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                                <BarChart3 className="w-5 h-5 text-emerald-500" />
                            </div>
                            <h1 className="text-2xl font-bold text-jual-text-main">{t('performance_analytics')}</h1>
                        </div>
                        <p className="text-sm text-jual-text-muted">{t('performance_desc')}</p>
                    </div>

                    {sales && (
                        <div className="flex items-center gap-3">
                            <div className="bg-jual-input border border-jual-border px-6 py-2.5 rounded-xl text-sm font-bold text-jual-text-main flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                {sales.product_name}
                            </div>
                        </div>
                    )}
                </div>

                {sales ? (
                    <>
                        {/* Key Metrics Grid - AI Scores */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                            {[
                                { label: 'Overall Score', value: analysis.score ? `${analysis.score}/100` : '-', up: (analysis.score || 0) >= 80, icon: Star, color: 'text-amber-500' },
                                { label: 'SEO Score', value: analysis.seo_score ? `${analysis.seo_score}/100` : '-', up: (analysis.seo_score || 0) >= 80, icon: Globe2, color: 'text-blue-500' },
                                { label: 'Copywriting Score', value: analysis.copywriting_score ? `${analysis.copywriting_score}/100` : '-', up: (analysis.copywriting_score || 0) >= 80, icon: Sparkles, color: 'text-purple-500' },
                                { label: 'UI/UX Score', value: analysis.ui_ux_score ? `${analysis.ui_ux_score}/100` : '-', up: (analysis.ui_ux_score || 0) >= 80, icon: MousePointerClick, color: 'text-emerald-500' },
                            ].map((m, i) => (
                                <div key={i} className="bg-jual-card border border-jual-border rounded-2xl p-6 relative overflow-hidden group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`w-10 h-10 rounded-xl bg-jual-input border border-jual-border flex items-center justify-center ${m.color}`}>
                                            <m.icon className="w-5 h-5" />
                                        </div>
                                        <div className={`flex items-center gap-1 text-xs font-bold ${m.up ? 'text-emerald-500' : 'text-amber-500'}`}>
                                            {m.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                            AI
                                        </div>
                                    </div>
                                    <h4 className="text-xs font-bold text-jual-text-muted uppercase tracking-widest mb-1">{m.label}</h4>
                                    <div className="text-2xl font-black text-jual-text-main">{m.value}</div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Insights & Research */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-jual-card border border-jual-border rounded-3xl p-8 relative overflow-hidden">
                                    <div className="flex items-center gap-3 mb-6">
                                        <BookOpen className="w-6 h-6 text-emerald-500" />
                                        <h3 className="text-lg font-bold text-jual-text-main">Hasil Riset Pasar</h3>
                                    </div>
                                    <p className="text-sm text-jual-text-muted leading-relaxed">
                                        {analysis.market_research || "Belum ada riset pasar untuk produk ini. Silakan generate ulang menggunakan fitur AI Generator terbaru."}
                                    </p>
                                </div>
                                
                                <div className="bg-jual-card border border-jual-border rounded-3xl p-8 relative overflow-hidden">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Target className="w-6 h-6 text-blue-500" />
                                        <h3 className="text-lg font-bold text-jual-text-main">Analisis Target Audiens</h3>
                                    </div>
                                    <p className="text-sm text-jual-text-muted leading-relaxed">
                                        {analysis.target_audience_analysis || "Belum ada analisis target audiens. Silakan generate ulang."}
                                    </p>
                                </div>
                            </div>

                            {/* AI Suggestions */}
                            <div className="bg-jual-card border border-jual-border rounded-3xl p-8 h-fit">
                                <div className="flex items-center gap-3 mb-6">
                                    <Sparkles className="w-6 h-6 text-amber-500" />
                                    <h3 className="text-lg font-bold text-jual-text-main">Saran Peningkatan AI</h3>
                                </div>
                                
                                {analysis.suggestions && Array.isArray(analysis.suggestions) && analysis.suggestions.length > 0 ? (
                                    <ul className="space-y-4">
                                        {analysis.suggestions.map((sug, i) => (
                                            <li key={i} className="text-sm text-jual-text-muted flex items-start gap-3 p-4 bg-jual-bg-alt rounded-2xl border border-jual-border/50">
                                                <span className="text-emerald-500 font-bold mt-0.5">•</span> 
                                                <span>{sug}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-jual-text-muted italic">Tidak ada saran AI yang tersedia.</p>
                                )}
                                
                                <div className="mt-8 p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                                    <p className="text-[11px] text-emerald-500 font-bold uppercase tracking-widest mb-1">Status Optimasi</p>
                                    <p className="text-xs text-jual-text-muted leading-relaxed mb-4">
                                        Terapkan saran AI ini pada copywriting dan struktur halaman untuk meningkatkan rasio konversi Anda secara signifikan.
                                    </p>
                                    <Link 
                                        href={`${route('dashboard.ai-generator', sales.id)}?apply_suggestions=true`}
                                        className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-slate-900 rounded-xl text-sm font-bold transition-colors gap-2"
                                    >
                                        <Sparkles className="w-4 h-4" />
                                        Terapkan Saran & Re-generate
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                        <div className="w-20 h-20 bg-jual-input border border-jual-border rounded-full flex items-center justify-center mb-6">
                            <BarChart3 className="w-10 h-10 text-jual-text-muted" />
                        </div>
                        <h2 className="text-xl font-bold text-jual-text-main mb-2">Belum ada data analitik</h2>
                        <p className="text-sm text-jual-text-muted max-w-md">
                            Silakan buat project baru atau pilih project dari menu Proyek Saya untuk melihat analitik performa.
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
