import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { LayoutTemplate, Search, Filter, Eye, MousePointer2, Star, Clock, Flame, ChevronDown } from 'lucide-react';
import Layout from '@/Layouts/Dashboard/Layout';

export default function Templates() {
    const categories = ['Semua', 'E-Course', 'Produk Fisik', 'Layanan', 'Personal Brand', 'Webinar'];
    const [activeCategory, setActiveCategory] = useState('Semua');

    const templates = [
        { id: 1, name: 'Modern Tech Sales', category: 'Layanan', rating: 4.9, used: 1240, img: 'tech' },
        { id: 2, name: 'Eco-Friendly Shop', category: 'Produk Fisik', rating: 4.8, used: 850, img: 'eco' },
        { id: 3, name: 'Masterclass Hub', category: 'E-Course', rating: 5.0, used: 2100, img: 'course' },
        { id: 4, name: 'Consultant Pro', category: 'Layanan', rating: 4.7, used: 640, img: 'consultant' },
        { id: 5, name: 'Health & Beauty', category: 'Produk Fisik', rating: 4.9, used: 1560, img: 'beauty' },
        { id: 6, name: 'Live Event Page', category: 'Webinar', rating: 4.6, used: 420, img: 'event' },
    ];

    return (
        <Layout>
            <Head title="Templates" />

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                                <LayoutTemplate className="w-5 h-5 text-emerald-500" />
                            </div>
                            <h1 className="text-2xl font-bold text-white">Template Penjualan</h1>
                        </div>
                        <p className="text-sm text-jual-text-muted">Pilih template yang sudah teruji konversinya untuk produk Anda.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Cari template..."
                                className="bg-[#131d23] border border-[#1f2e36] rounded-xl pl-11 pr-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 w-full sm:w-64"
                            />
                        </div>
                        <button className="bg-[#131d23] border border-[#1f2e36] p-3 rounded-xl hover:border-emerald-500/30 transition-colors text-slate-400 hover:text-emerald-500">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Categories Bar */}
                <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                                activeCategory === cat 
                                ? 'bg-emerald-500 text-slate-900' 
                                : 'bg-[#131d23] border border-[#1f2e36] text-slate-400 hover:border-emerald-500/50'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {templates.map((tpl) => (
                        <div 
                            key={tpl.id} 
                            className="bg-jual-card border border-jual-border rounded-2xl overflow-hidden group hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-emerald-500/5"
                        >
                            {/* Thumbnail Container */}
                            <div className="aspect-[4/3] bg-[#131d23] relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f171c] to-transparent opacity-60"></div>
                                
                                {/* Hover Overlay Buttons */}
                                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                                    <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-2 transition-all">
                                        <MousePointer2 className="w-3.5 h-3.5" /> Pakai
                                    </button>
                                    <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-2 transition-all border border-white/20">
                                        <Eye className="w-3.5 h-3.5" /> Preview
                                    </button>
                                </div>

                                {/* Placeholder Image Pattern */}
                                <div className="w-full h-full flex items-center justify-center text-emerald-500/5 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <LayoutTemplate className="w-32 h-32 rotate-12" />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">{tpl.name}</h3>
                                    <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                                        <Star className="w-3.5 h-3.5 fill-yellow-500" />
                                        {tpl.rating}
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                                    <span className="flex items-center gap-1.5">
                                        <Flame className="w-3 h-3 text-orange-500" /> {tpl.used} Digunakan
                                    </span>
                                    <span className="bg-[#131d23] border border-jual-border px-2 py-0.5 rounded text-emerald-500">
                                        {tpl.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More */}
                <div className="mt-12 flex justify-center">
                    <button className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-emerald-500 transition-colors border border-jual-border hover:border-emerald-500/30 px-8 py-3 rounded-xl bg-[#131d23]">
                        Tampilkan Lebih Banyak <ChevronDown className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </Layout>
    );
}
