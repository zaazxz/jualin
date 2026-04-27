import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Rocket, FileText, Calendar, Clock, Eye, ShoppingCart, Plus, MoreVertical, ExternalLink, Sparkles, User, Trash2, ArrowRight } from 'lucide-react';
import Layout from '@/Layouts/Dashboard/Layout';
import LoginSuccessModal from '@/Components/Dashboard/LoginSuccessModal';

export default function Dashboard({ sales }) {
    const { auth } = usePage().props;
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        const hasShownWelcome = sessionStorage.getItem('hasShownWelcome');
        if (!hasShownWelcome) {
            setShowWelcome(true);
            sessionStorage.setItem('hasShownWelcome', 'true');
        }
    }, []);

    const totalPages = sales.length;
    const publishedPages = sales.filter(s => s.status === 'published').length;
    const lastActive = sales.length > 0 ? new Date(sales[0].created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : '-';

    return (
        <Layout>
            <Head title="Dashboard" />

            <LoginSuccessModal 
                isOpen={showWelcome} 
                onClose={() => setShowWelcome(false)} 
                userName={auth.user.name}
            />

            {/* Welcome Banner */}
            <div className="bg-jual-card border border-jual-border rounded-2xl p-8 mb-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold text-emerald-500 mb-2 flex items-center gap-3">
                        Bismillah, Mari Mulai Jualan {auth.user.name.split(' ')[0]} <Rocket className="w-8 h-8 text-emerald-500 animate-bounce" />
                    </h1>
                    <p className="text-sm text-jual-text-muted max-w-xl mb-6 leading-relaxed">
                        Bangun halaman penjualan yang elegan dan berkonversi tinggi hanya dalam
                        hitungan menit dengan bantuan AI kami yang canggih.
                    </p>
                    <Link 
                        href={route('dashboard.ai-generator')}
                        className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3 px-6 rounded-xl transition-all shadow-[0_4px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_8px_25px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Buat Sales Page Baru <Plus className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-jual-card border border-jual-border rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-bold text-jual-text-muted uppercase tracking-widest">Total Halaman</span>
                        <FileText className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <div className="text-4xl font-black text-white mb-1">{totalPages}</div>
                        <div className="text-[10px] text-jual-text-muted font-bold uppercase">Halaman Tersimpan</div>
                    </div>
                </div>

                <div className="bg-jual-card border border-jual-border rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-jual-green"></div>
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-bold text-jual-text-muted uppercase tracking-widest">Live Pages</span>
                        <Globe className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                        <div className="text-4xl font-black text-white mb-1">{publishedPages}</div>
                        <div className="text-[10px] text-emerald-500 font-bold uppercase">Sudah Dipublish</div>
                    </div>
                </div>

                <div className="bg-jual-card border border-jual-border rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-400"></div>
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-bold text-jual-text-muted uppercase tracking-widest">Aktivitas Terakhir</span>
                        <Clock className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-white mb-1">{lastActive}</div>
                        <div className="text-[10px] text-jual-text-muted font-bold uppercase">Update Terbaru</div>
                    </div>
                </div>
            </div>

            {/* Proyek Terbaru Section */}
            <div className="flex justify-between items-end mb-6 px-1">
                <div>
                    <h2 className="text-xl font-bold text-white mb-1">Proyek Terbaru</h2>
                    <p className="text-xs text-jual-text-muted">Kelola halaman penjualan yang telah Anda buat</p>
                </div>
                {sales.length > 0 && (
                    <Link href="#" className="text-xs text-emerald-500 hover:text-emerald-400 font-bold flex items-center gap-1 transition-colors uppercase tracking-widest">
                        Lihat Semua <ArrowRight className="w-3 h-3" />
                    </Link>
                )}
            </div>

            {sales.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {sales.map((item) => (
                        <div key={item.id} className="bg-jual-card border border-jual-border rounded-2xl p-5 flex flex-col sm:flex-row gap-5 border-l-4 border-l-emerald-500 hover:bg-[#0f171c] transition-all duration-300 group">
                            <div className="w-full sm:w-32 aspect-square bg-[#131d23] rounded-xl flex items-center justify-center border border-jual-border group-hover:border-emerald-500/20 transition-colors">
                                <FileText className="w-10 h-10 text-slate-700 group-hover:text-emerald-500/40 transition-colors" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">{item.product_name}</h3>
                                        <div className="flex gap-2">
                                            <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter ${
                                                item.status === 'published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-jual-text-muted mb-4 line-clamp-2">
                                        {item.product_info.description || 'Tidak ada deskripsi.'}
                                    </p>

                                    <div className="flex gap-4 mb-4">
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                                            <Eye className="w-3.5 h-3.5" /> 0 Views
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                                            <Calendar className="w-3.5 h-3.5" /> {new Date(item.created_at).toLocaleDateString('id-ID')}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <Link 
                                        href={route('sales.preview', item.slug)}
                                        target="_blank"
                                        className="bg-[#131d23] hover:bg-emerald-500 text-[10px] font-bold text-slate-400 hover:text-slate-900 px-4 py-2 rounded-lg transition-all border border-jual-border hover:border-emerald-500"
                                    >
                                        Lihat Preview
                                    </Link>
                                    <Link
                                        href={route('sales.destroy', item.id)}
                                        method="delete"
                                        as="button"
                                        className="bg-transparent hover:bg-red-500/10 text-[10px] font-bold text-slate-600 hover:text-red-500 px-3 py-2 rounded-lg transition-all border border-transparent hover:border-red-500/20"
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
                    <h3 className="text-xl font-bold text-white mb-2">Belum Ada Proyek</h3>
                    <p className="text-sm text-jual-text-muted max-w-sm mx-auto mb-8">
                        Mulai langkah sukses Anda dengan membuat sales page pertama yang dibantu oleh AI canggih kami.
                    </p>
                    <Link 
                        href={route('dashboard.ai-generator')}
                        className="inline-flex items-center gap-2 bg-[#131d23] hover:bg-emerald-500 text-emerald-500 hover:text-slate-900 border border-emerald-500/20 hover:border-emerald-500 font-bold py-3 px-8 rounded-2xl transition-all"
                    >
                        Buat Sekarang <Plus className="w-4 h-4" />
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

function Globe({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
    );
}
