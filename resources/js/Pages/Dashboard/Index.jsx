import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Rocket, FileText, Calendar, Clock, Eye, ShoppingCart, Plus, MoreVertical, ExternalLink, Sparkles, User } from 'lucide-react';
import Layout from '@/Layouts/Dashboard/Layout';

export default function Dashboard() {
    return (
        <Layout>
            <Head title="Dashboard" />

            {/* Welcome Banner */}
            <div className="bg-jual-card border border-jual-border rounded-xl p-8 mb-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-jual-green/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold text-jual-green mb-2 flex items-center gap-3">
                        Bismillah, Mari Mulai Jualan <Rocket className="w-8 h-8 text-jual-green fill-jual-green/20" />
                    </h1>
                    <p className="text-sm text-jual-text-muted max-w-xl mb-6 leading-relaxed">
                        Bangun halaman penjualan yang elegan dan berkonversi tinggi hanya dalam
                        hitungan menit dengan bantuan AI kami yang canggih.
                    </p>
                    <button className="bg-jual-green hover:bg-jual-green-hover text-white font-medium py-2.5 px-6 rounded-md transition-all shadow-[0_0_15px_rgba(0,181,122,0.3)] hover:shadow-[0_0_20px_rgba(0,181,122,0.5)] flex items-center gap-2">
                        Buat Sales Page Baru <Plus className="w-4 h-4 bg-white/20 rounded-full p-0.5" />
                    </button>
                </div>
            </div>

            {/* Divider */}
            <div className="flex items-center mb-8">
                <div className="flex-1 border-t border-jual-border border-dashed"></div>
                <div className="w-2 h-2 rounded-full bg-jual-green/50 mx-4"></div>
                <div className="flex-1 border-t border-jual-border border-dashed"></div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Stat 1 */}
                <div className="bg-jual-bg border border-jual-border rounded-xl p-6 relative overflow-hidden flex flex-col justify-between hover:border-jual-green/30 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs text-jual-text-muted">Total Halaman Dibuat</span>
                        <FileText className="w-24 h-24 text-white/5 absolute -bottom-4 -right-4" />
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-white mb-2">124</div>
                        <div className="flex items-center gap-1 text-xs text-jual-green">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                            +12% dari bulan lalu
                        </div>
                    </div>
                </div>

                {/* Stat 2 */}
                <div className="bg-jual-bg border border-jual-border rounded-xl p-6 relative overflow-hidden flex flex-col justify-between hover:border-jual-green/30 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-jual-green"></div>
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs text-jual-text-muted">Dibuat Bulan Ini</span>
                        <Calendar className="w-24 h-24 text-white/5 absolute -bottom-4 -right-4" />
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-white mb-2">18</div>
                        <div className="flex items-center gap-1 text-xs text-jual-green">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            Aktif semua
                        </div>
                    </div>
                </div>

                {/* Stat 3 */}
                <div className="bg-jual-bg border border-jual-border rounded-xl p-6 relative overflow-hidden flex flex-col justify-between hover:border-jual-green/30 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-400"></div>
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs text-jual-text-muted">Terakhir Dibuat</span>
                        <Clock className="w-24 h-24 text-white/5 absolute -bottom-4 -right-4" />
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white mb-2">2 Jam Lalu</div>
                        <div className="text-xs text-jual-text-muted italic">"Produk Skin Care Halal"</div>
                    </div>
                </div>
            </div>

            {/* Proyek Terbaru Section */}
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="text-xl font-bold text-jual-green mb-1">Proyek Terbaru</h2>
                    <p className="text-xs text-jual-text-muted">Kelola halaman penjualan yang telah Anda buat</p>
                </div>
                <a href="#" className="text-xs text-yellow-500 hover:text-yellow-400 font-medium flex items-center gap-1 transition-colors">
                    Lihat Semua <span className="text-lg leading-none">&rarr;</span>
                </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Project Card 1 */}
                <div className="bg-[#131b2f] border border-jual-border rounded-xl p-5 flex gap-5 border-l-2 border-l-jual-green hover:bg-[#1a243a] transition-colors">
                    <div className="w-32 h-full bg-[#1e2536] rounded-lg"></div>
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-medium text-white">Premium Oud Fragrance Collection</h3>
                                <span className="bg-jual-green/20 text-jual-green text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase">Published</span>
                            </div>
                            <p className="text-xs text-jual-text-muted mb-4">Target: High-end lifestyle enthusiasts</p>

                            <div className="flex gap-4 mb-4">
                                <div className="flex items-center gap-1.5 text-xs text-jual-text-muted">
                                    <Eye className="w-4 h-4" /> 1.2k Views
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-jual-text-muted">
                                    <ShoppingCart className="w-4 h-4" /> 84 Conversions
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="bg-[#1e293b] hover:bg-[#2d3b51] text-xs font-medium text-white px-4 py-1.5 rounded transition-colors border border-jual-border">
                                Edit Halaman
                            </button>
                            <button className="bg-transparent hover:bg-jual-card text-xs font-medium text-jual-text-muted hover:text-white px-4 py-1.5 rounded transition-colors border border-jual-border">
                                Analitik
                            </button>
                        </div>
                    </div>
                </div>

                {/* Project Card 2 (In Progress) */}
                <div className="bg-[#131b2f] border border-jual-border rounded-xl p-5 border-l-2 border-l-emerald-500 hover:bg-[#1a243a] transition-colors flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="font-medium text-white">Katering Sehat Berkah</h3>
                            <button className="text-jual-text-muted hover:text-white"><MoreVertical className="w-4 h-4" /></button>
                        </div>
                        <p className="text-[10px] text-jual-text-muted mb-4">Dibuat: 12 Okt 2023</p>

                        <div className="mb-2">
                            <div className="h-1.5 w-full bg-[#1e293b] rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[65%]"></div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-[10px]">
                            <span className="text-jual-text-muted">Optimization Score</span>
                            <span className="text-emerald-500 font-medium">65%</span>
                        </div>
                    </div>

                    <button className="w-full mt-4 bg-[#1e293b] hover:bg-jual-green text-xs font-medium text-white hover:text-white px-4 py-2 rounded transition-colors border border-jual-border hover:border-jual-green">
                        Selesaikan Draft
                    </button>
                </div>
            </div>

            {/* Bottom Row Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Project Card 3 */}
                <div className="bg-[#131b2f] border border-jual-border rounded-xl p-4 flex items-center justify-between border-l-2 border-l-jual-green hover:bg-[#1a243a] transition-colors group">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#1e293b] rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-jual-text-muted" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-white mb-0.5">Herbal Tea Bundle Pack</h3>
                            <p className="text-[10px] text-jual-text-muted mb-1">Copywriting AI v2.1 applied</p>
                            <div className="flex items-center gap-1 text-[10px] text-jual-text-muted">
                                <span className="text-white">★</span> High Intent
                            </div>
                        </div>
                    </div>
                    <button className="text-jual-text-muted hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 opacity-0 group-hover:opacity-100">
                        <ExternalLink className="w-4 h-4" />
                    </button>
                </div>

                {/* Project Card 4 */}
                <div className="bg-[#131b2f] border border-jual-border rounded-xl p-4 flex items-center justify-between border-l-2 border-l-cyan-500 hover:bg-[#1a243a] transition-colors group">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#1e293b] rounded-lg flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-jual-text-muted" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-white mb-0.5">E-Course: Jago Digital Ads</h3>
                            <p className="text-[10px] text-jual-text-muted mb-1">A/B Testing in progress</p>
                            <div className="flex items-center gap-1 text-[10px] text-jual-text-muted">
                                <User className="w-3 h-3" /> 450 Leads
                            </div>
                        </div>
                    </div>
                    <button className="text-jual-text-muted hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 opacity-0 group-hover:opacity-100">
                        <ExternalLink className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Bottom decoration */}
            <div className="flex justify-center mt-12 pb-8">
                <Sparkles className="w-16 h-16 text-white/5" />
            </div>

        </Layout>
    );
}
