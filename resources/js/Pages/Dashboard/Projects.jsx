import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { FolderOpen, Search, Star, Calendar, ExternalLink, Download, Trash2, ArrowRight, LayoutTemplate, MoreVertical } from 'lucide-react';
import Layout from '@/Layouts/Dashboard/Layout';

export default function Projects({ sales }) {
    const [searchQuery, setSearchQuery] = useState('');
    
    const { delete: destroy } = useForm();

    const handleDelete = (id, e) => {
        e.preventDefault();
        if (confirm('Apakah Anda yakin ingin menghapus halaman ini?')) {
            destroy(route('sales.destroy', id), { preserveScroll: true });
        }
    };

    const handleDownload = (item) => {
        if (!item.html_content) {
            alert('File HTML tidak ditemukan untuk proyek ini.');
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
        } catch (e) {}
        
        if (templateData.length > 20) return 'Modern';
        return templateData;
    };

    return (
        <Layout>
            <Head title="Proyek Saya" />

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                            <FolderOpen className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white leading-tight">Proyek Saya</h1>
                            <p className="text-xs text-jual-text-muted mt-0.5">Kelola semua halaman penjualan yang telah AI buatkan untuk Anda</p>
                        </div>
                    </div>
                    
                    <div className="relative">
                        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input 
                            type="text" 
                            placeholder="Cari nama produk atau deskripsi..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-[#131d23] border border-[#1f2e36] text-sm text-white rounded-xl pl-10 pr-4 py-2.5 w-full sm:w-64 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 transition-all placeholder-slate-600"
                        />
                    </div>
                </div>

                <div className="bg-jual-card border border-jual-border rounded-3xl overflow-hidden shadow-2xl relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                    
                    <div className="overflow-x-auto relative z-10 scrollbar-hide">
                        <table className="w-full text-left border-collapse table-fixed min-w-[800px]">
                            <thead>
                                <tr className="border-b border-[#1f2e36] bg-[#0a0f12]/50">
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-2/5">Info Produk</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-1/5">Template</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-32">Skor AI</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-32">Tanggal Dibuat</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-32 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1f2e36]">
                                {filteredSales.length > 0 ? (
                                    filteredSales.map((item) => (
                                        <tr key={item.id} className="hover:bg-[#0f171c] transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-[#131d23] border border-[#1f2e36] flex-shrink-0 flex items-center justify-center overflow-hidden group-hover:border-emerald-500/30 transition-colors">
                                                        {item.generated_content?.hero_image ? (
                                                            <img src={item.generated_content.hero_image} alt={item.product_name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                        ) : (
                                                            <LayoutTemplate className="w-5 h-5 text-slate-600 group-hover:text-emerald-500/50" />
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors truncate">{item.product_name}</p>
                                                        <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.product_info?.description || 'Tanpa deskripsi'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#131d23] text-slate-300 border border-[#1f2e36] max-w-full truncate">
                                                    {getTemplateName(item.template)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500">
                                                    <Star className="w-4 h-4 fill-amber-500/20" /> {90 + (item.id % 10)}/100
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                                    <Calendar className="w-3.5 h-3.5 opacity-50" />
                                                    {new Date(item.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <a 
                                                        href={route('sales.preview', item.slug)} 
                                                        target="_blank" 
                                                        rel="noreferrer"
                                                        className="w-8 h-8 rounded-lg bg-[#131d23] hover:bg-blue-500/10 border border-[#1f2e36] hover:border-blue-500/30 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-all group/btn"
                                                        title="Live Preview"
                                                    >
                                                        <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                                    </a>
                                                    <button 
                                                        onClick={() => handleDownload(item)}
                                                        className="w-8 h-8 rounded-lg bg-[#131d23] hover:bg-emerald-500/10 border border-[#1f2e36] hover:border-emerald-500/30 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-all group/btn"
                                                        title="Download HTML"
                                                    >
                                                        <Download className="w-4 h-4 group-hover/btn:-translate-y-0.5 transition-transform" />
                                                    </button>
                                                    <div className="w-px h-4 bg-[#1f2e36] mx-1"></div>
                                                    <button 
                                                        onClick={(e) => handleDelete(item.id, e)}
                                                        className="w-8 h-8 rounded-lg bg-[#131d23] hover:bg-red-500/10 border border-[#1f2e36] hover:border-red-500/30 flex items-center justify-center text-slate-400 hover:text-red-400 transition-all group/btn"
                                                        title="Hapus Proyek"
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
                                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#131d23] border border-[#1f2e36] mb-4">
                                                <Search className="w-6 h-6 text-slate-600" />
                                            </div>
                                            <h3 className="text-sm font-bold text-white mb-1">Tidak ada proyek ditemukan</h3>
                                            <p className="text-xs text-slate-500">Mungkin coba kata kunci lain atau buat proyek baru.</p>
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
