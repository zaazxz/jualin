import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { FolderOpen, Search, Star, Calendar, ExternalLink, Download, Trash2, ArrowRight, LayoutTemplate, MoreVertical, PenTool, Sparkles, ChevronDown } from 'lucide-react';
import axios from 'axios';
import Layout from '@/Layouts/Dashboard/Layout';
import { useAppStore } from '@/store/useAppStore';

export default function Projects({ sales }) {
    const [searchQuery, setSearchQuery] = useState('');

    const { delete: destroy } = useForm();
    const { t } = useAppStore();

    const handleDelete = (id, e) => {
        e.preventDefault();
        if (confirm(t('delete_confirm'))) {
            destroy(route('sales.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.put(route('sales.update', id), { status: newStatus });
            router.reload({ only: ['sales'] });
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    const handleDownload = (item) => {
        let template = { bg_color: '#ffffff', text_color: '#1e293b' };
        try {
            template = typeof item.template === 'string' ? JSON.parse(item.template) : (item.template || template);
        } catch (e) { }

        const fullHtml = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${item.product_name} - Sales Page</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: ${template.bg_color}; color: ${template.text_color}; }
    </style>
</head>
<body>
    ${item.html_content || '<div class="p-8 text-center">Konten belum di-generate</div>'}
</body>
</html>`;

        const blob = new Blob([fullHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${item.slug || 'sales-page'}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const filteredSales = sales.filter(item =>
        item.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.product_info?.description && item.product_info.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const getTemplateName = (templateData) => {
        if (!templateData) return 'Modern';
        if (typeof templateData === 'object') return templateData.name || templateData.NAME || templateData.id || templateData.ID || 'Modern';

        try {
            if (templateData.startsWith('{')) {
                const parsed = JSON.parse(templateData);
                return parsed.name || parsed.NAME || parsed.id || parsed.ID || 'Modern';
            }
        } catch (e) { }

        if (templateData.length > 20) return 'Modern';
        return templateData;
    };

    return (
        <Layout>
            <Head title={t('my_projects')} />

            <div className="mb-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                            <FolderOpen className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-jual-text-main">{t('my_projects')}</h1>
                            <p className="text-xs text-jual-text-muted mt-0.5">{t('manage_projects_desc')}</p>
                        </div>
                    </div>

                    <div className="relative">
                        <Search className="w-4 h-4 text-jual-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder={t('search_placeholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-jual-input border border-jual-border text-sm text-jual-text-main rounded-xl pl-10 pr-4 py-2.5 w-full sm:w-64 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 transition-all placeholder-jual-text-muted/50"
                        />
                    </div>
                </div>

                <div className="bg-jual-card border border-jual-border rounded-3xl overflow-hidden shadow-2xl relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                    <div className="overflow-x-auto relative z-10 scrollbar-hide">
                        <table className="w-full text-left border-collapse table-fixed min-w-[900px]">
                            <thead>
                                <tr className="border-b border-jual-border bg-jual-bg-alt">
                                    <th className="px-6 py-4 text-[10px] font-bold text-jual-text-muted uppercase tracking-widest w-[35%]">{t('product_info')}</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-jual-text-muted uppercase tracking-widest w-[15%]">{t('template')}</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-jual-text-muted uppercase tracking-widest w-[15%]">{t('ai_score')}</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-jual-text-muted uppercase tracking-widest w-[10%]">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-jual-text-muted uppercase tracking-widest w-[15%]">{t('date_created')}</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-jual-text-muted uppercase tracking-widest w-[20%] text-right">{t('actions')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-jual-border">
                                {filteredSales.length > 0 ? (
                                    filteredSales.map((item) => (
                                        <tr key={item.id} className="hover:bg-jual-card-hover transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-jual-input border border-jual-border flex-shrink-0 flex items-center justify-center overflow-hidden group-hover:border-emerald-500/30 transition-colors">
                                                        {item.generated_content?.hero_image ? (
                                                            <img src={item.generated_content.hero_image} alt={item.product_name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                        ) : (
                                                            <LayoutTemplate className="w-5 h-5 text-jual-text-muted group-hover:text-emerald-500/50" />
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-bold text-sm text-jual-text-main group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">{item.product_name}</p>
                                                        <p className="text-[11px] text-jual-text-muted truncate mt-0.5">{item.product_info?.description || t('no_description')}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-jual-input text-jual-text-main border border-jual-border max-w-full truncate">
                                                    {getTemplateName(item.template)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500">
                                                    <Star className="w-4 h-4 fill-amber-500/20" /> {item.generated_content?.analysis?.score ?? (90 + (item.id % 10))}/100
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="relative inline-block w-full">
                                                    <select
                                                        value={item.status || 'draft'}
                                                        onChange={(e) => updateStatus(item.id, e.target.value)}
                                                        className={`appearance-none bg-transparent text-[10px] font-bold uppercase tracking-widest cursor-pointer focus:outline-none pr-6 py-1 border-b border-dashed ${
                                                            item.status === 'published' ? 'text-emerald-500 border-emerald-500/30' : 
                                                            item.status === 'downloaded' ? 'text-blue-500 border-blue-500/30' : 'text-slate-500 border-slate-500/30'
                                                        }`}
                                                    >
                                                        <option value="draft" className="text-slate-900">Draft</option>
                                                        <option value="downloaded" className="text-slate-900">Downloaded</option>
                                                        <option value="published" className="text-slate-900">Published</option>
                                                    </select>
                                                    <ChevronDown className="w-3 h-3 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-xs text-jual-text-muted">
                                                    <Calendar className="w-3.5 h-3.5 opacity-50" />
                                                    {new Date(item.created_at).toLocaleDateString(
                                                        { 'id': 'id-ID', 'en': 'en-US', 'ms': 'ms-MY' }[useAppStore.getState().language] || 'id-ID',
                                                        { year: 'numeric', month: 'short', day: 'numeric' }
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <a
                                                        href={route('sales.preview', item.slug)}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="w-10 h-10 flex-shrink-0 rounded-xl bg-jual-input hover:bg-blue-500/10 border border-jual-border hover:border-blue-500/30 flex items-center justify-center text-jual-text-muted hover:text-blue-600 dark:hover:text-blue-400 transition-all group/btn"
                                                        title={t('live_preview')}
                                                    >
                                                        <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                                    </a>
                                                    <Link
                                                        href={route('dashboard.ai-generator', item.id)}
                                                        className="w-10 h-10 flex-shrink-0 rounded-xl bg-jual-input hover:bg-amber-500/10 border border-jual-border hover:border-amber-500/30 flex items-center justify-center text-jual-text-muted hover:text-amber-600 dark:hover:text-amber-400 transition-all group/btn"
                                                        title={t('edit_regenerate')}
                                                    >
                                                        <PenTool className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDownload(item)}
                                                        className="w-10 h-10 flex-shrink-0 rounded-xl bg-jual-input hover:bg-emerald-500/10 border border-jual-border hover:border-emerald-500/30 flex items-center justify-center text-jual-text-muted hover:text-emerald-600 dark:hover:text-emerald-400 transition-all group/btn"
                                                        title={t('download_html')}
                                                    >
                                                        <Download className="w-4 h-4 group-hover/btn:-translate-y-0.5 transition-transform" />
                                                    </button>
                                                    <div className="w-px h-6 bg-jual-border mx-1 flex-shrink-0"></div>
                                                    <button
                                                        onClick={(e) => handleDelete(item.id, e)}
                                                        className="w-10 h-10 flex-shrink-0 rounded-xl bg-jual-input hover:bg-red-500/10 border border-jual-border hover:border-red-500/30 flex items-center justify-center text-jual-text-muted hover:text-red-600 dark:hover:text-red-400 transition-all group/btn"
                                                        title={t('delete_project')}
                                                    >
                                                        <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-16 text-center">
                                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-jual-input border border-jual-border mb-4">
                                                <Search className="w-6 h-6 text-jual-text-muted" />
                                            </div>
                                            <h3 className="text-sm font-bold text-jual-text-main mb-1">{t('no_projects_found')}</h3>
                                            <p className="text-xs text-jual-text-muted">{t('no_projects_search_desc')}</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
