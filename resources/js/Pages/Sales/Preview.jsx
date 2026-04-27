import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Check, ArrowRight, Zap, ShoppingCart, ShieldCheck, Star } from 'lucide-react';

export default function Preview({ sales }) {
    const { product_name, generated_content, product_info } = sales;
    const content = generated_content || {
        headline: product_name,
        subheadline: "Solusi terbaik untuk bisnis Anda.",
        description: "Konten sedang dihasilkan...",
        benefits: [],
        cta: "Beli Sekarang"
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
            <Head title={product_name} />

            {/* Navigation (Simple) */}
            <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <span className="text-xl font-black text-emerald-600 tracking-tighter">Jual<span className="text-slate-900">.in</span></span>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-full transition-all text-sm">
                        {content.cta}
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
                        <Zap className="w-3.5 h-3.5 fill-emerald-700" /> Penawaran Eksklusif
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                        {content.headline}
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                        {content.subheadline}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        <button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-10 rounded-2xl text-lg transition-all shadow-[0_10px_30px_rgba(5,150,105,0.2)] hover:-translate-y-1">
                            {content.cta}
                        </button>
                        <button className="w-full sm:w-auto bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold py-4 px-10 rounded-2xl text-lg transition-all border border-slate-200">
                            Pelajari Selengkapnya
                        </button>
                    </div>
                </div>
            </section>

            {/* Benefits / Features Section */}
            <section className="py-24 bg-slate-50 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Kenapa Memilih {product_name}?</h2>
                        <div className="w-20 h-1.5 bg-emerald-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {content.benefits && content.benefits.length > 0 ? (
                            content.benefits.map((benefit, i) => (
                                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-emerald-500/5 transition-all group">
                                    <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:rotate-6 transition-all">
                                        <Check className="w-6 h-6 text-emerald-600 group-hover:text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">
                                        Didesain khusus untuk memberikan hasil maksimal dengan upaya minimal bagi bisnis Anda.
                                    </p>
                                </div>
                            ))
                        ) : (
                            // Fallback benefits
                            [1, 2, 3].map((i) => (
                                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                                    <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                                        <Check className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">Keuntungan Unggulan {i}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">
                                        Detail manfaat produk Anda akan muncul di sini setelah AI menyelesaikan analisisnya.
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Description Section */}
            <section className="py-24 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-4xl font-black text-slate-900 leading-tight">Solusi yang Mengubah Cara Anda Berbisnis.</h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            {content.description}
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                                <span className="font-bold text-slate-700 text-lg">Terjamin & Terpercaya</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Star className="w-6 h-6 text-emerald-600" />
                                <span className="font-bold text-slate-700 text-lg">Kualitas Premium</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <div className="aspect-square bg-slate-100 rounded-[3rem] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-transparent"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <ShoppingCart className="w-40 h-40 text-emerald-600/10 group-hover:scale-110 transition-transform duration-700" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-24 px-6 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto text-center space-y-10">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                        Siap untuk Melejitkan Penjualan Anda Bersama {product_name}?
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Bergabunglah dengan ribuan pengusaha sukses lainnya yang telah membuktikan kualitas kami.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black py-4 px-12 rounded-2xl text-xl transition-all shadow-[0_10px_40px_rgba(16,185,129,0.3)]">
                            {content.cta}
                        </button>
                    </div>
                    <p className="text-slate-500 text-sm">
                        Garansi uang kembali 30 hari tanpa syarat.
                    </p>
                </div>
            </section>

            {/* Bottom Footer */}
            <footer className="py-10 border-t border-slate-100 px-6 text-center text-slate-400 text-sm font-medium">
                © 2026 {product_name}. Powered by <Link href="/" className="text-emerald-600 font-bold">Jual.in</Link>
            </footer>
        </div>
    );
}
