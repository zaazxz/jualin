import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Sparkles, Heart, Activity, CheckCircle2 } from 'lucide-react';
import Navbar from '@/Components/Main/Navbar';
import Footer from '@/Components/Main/Footer';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-jual-bg text-jual-text-main font-sans selection:bg-jual-green selection:text-white bg-grid-pattern relative">
            <Head title="JualMachine - Tingkatkan Konversi Penjualan" />

            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
                <div className="inline-flex items-center space-x-2 bg-jual-card border border-jual-border rounded-full px-4 py-1.5 mb-8">
                    <Sparkles className="w-4 h-4 text-[#FDE047]" />
                    <span className="text-xs font-semibold tracking-wider text-[#FDE047]">THE FUTURE OF SALES</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                    Tingkatkan Konversi Penjualan Anda dengan <span className="text-jual-green italic">Artificial Intelligence</span>
                </h1>

                <p className="mt-4 text-lg text-jual-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
                    <span className="text-jual-green">Jual.in</span> membantu Anda membuat halaman jualan yang memikat dan
                    profesional dalam hitungan detik. Gabungkan teknologi cerdas dan etika bisnis.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        href="/dashboard"
                        className="bg-jual-green hover:bg-jual-green-hover text-white font-semibold py-3 px-8 rounded-md transition-all shadow-[0_0_15px_rgba(0,181,122,0.3)] hover:shadow-[0_0_25px_rgba(0,181,122,0.5)]"
                    >
                        Mulai Sekarang
                    </Link>
                    <a
                        href="/#features"
                        className="border border-jual-border hover:border-jual-green text-jual-text-main hover:text-jual-green font-semibold py-3 px-8 rounded-md transition-all bg-jual-card/50 backdrop-blur-sm"
                    >
                        Pelajari Fitur
                    </a>
                </div>
            </div>

            {/* Features Section */}
            <div id="features" className="py-20 bg-jual-bg relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-jual-border to-transparent"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl font-bold text-jual-green mb-4">Fitur Unggulan</h2>
                        <p className="text-jual-text-muted text-sm tracking-wide">Praktis & digital dalam setiap gores.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <div className="bg-jual-card border border-jual-border rounded-xl p-8 hover:border-jual-green/50 transition-colors group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-jual-green/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                            <div className="w-10 h-10 bg-jual-bg rounded-lg flex items-center justify-center border border-jual-border mb-6">
                                <Sparkles className="w-5 h-5 text-jual-green" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3">Salinan Persuasif</h3>
                            <p className="text-sm text-jual-text-muted leading-relaxed">
                                AI Copywriting kami dilatih untuk menghasilkan narasi yang menyentuh
                                emosi pembeli sekaligus menjaga kejujuran informasi.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-jual-card border border-jual-border rounded-xl p-8 hover:border-jual-green/50 transition-colors group relative overflow-hidden">
                            <div className="absolute top-4 right-4 opacity-5">
                                <Heart className="w-24 h-24" />
                            </div>
                            <div className="w-10 h-10 bg-jual-bg rounded-lg flex items-center justify-center border border-jual-border mb-6">
                                <Heart className="w-5 h-5 text-jual-green" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3">Desain Modern</h3>
                            <p className="text-sm text-jual-text-muted leading-relaxed">
                                Template mewah dengan sentuhan estetika minimalis dan motif
                                geometris yang memberikan kesan eksklusif dan terpercaya.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-jual-card border border-jual-border rounded-xl p-8 hover:border-jual-green/50 transition-colors group relative overflow-hidden">
                            <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-jual-green/20 to-transparent"></div>
                            <div className="w-10 h-10 bg-jual-bg rounded-lg flex items-center justify-center border border-jual-border mb-6">
                                <Activity className="w-5 h-5 text-jual-green" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3">Optimasi Konversi</h3>
                            <p className="text-sm text-jual-text-muted leading-relaxed">
                                Setiap elemen diletakkan berdasarkan data perilaku pengguna untuk
                                memastikan perjalanan pembeli yang lancar dan cepat.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Showcase Section */}
            <div id="showcase" className="py-24 bg-[#0d1322] border-y border-jual-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Image Placeholder */}
                        <div className="w-full lg:w-1/2 aspect-video bg-jual-card border border-jual-border rounded-2xl relative overflow-hidden group shadow-2xl flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-jual-green/10 to-transparent"></div>
                            {/* Abstract Tech Circle Visualization */}
                            <div className="relative w-48 h-48 rounded-full border border-jual-green/30 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                                <div className="absolute w-32 h-32 rounded-full border-t-2 border-jual-green/60 animate-[spin_6s_linear_infinite_reverse]"></div>
                                <div className="absolute w-16 h-16 rounded-full border-r-2 border-jual-green animate-[spin_3s_linear_infinite]"></div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-3xl font-bold italic mb-6 text-white">Strategi yang Terukur</h2>
                            <p className="text-jual-text-muted mb-8 text-sm leading-relaxed">
                                Kami percaya bahwa keberhasilan dimulai dengan niat yang baik dan proses
                                yang presisi. Jual.In menggunakan mesin AI yang dikalibrasi untuk
                                memahami nuansa psikologi konsumen modern.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="mt-1 flex-shrink-0">
                                        <CheckCircle2 className="w-5 h-5 text-[#FDE047]" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Analisis Niche Terintegrasi</h4>
                                        <p className="text-xs text-jual-text-muted">Memahami target pasar Anda secara mendalam sebelum menyusun strategi.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1 flex-shrink-0">
                                        <CheckCircle2 className="w-5 h-5 text-[#FDE047]" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Struktur AIDA yang Disesuaikan</h4>
                                        <p className="text-xs text-jual-text-muted">Attention, Interest, Desire, Action — disusun dengan urutan sistematis.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visualisasi Kesuksesan Section */}
            <div className="py-24 bg-jual-bg">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-white mb-16">Visualisasi Kesuksesan Anda</h2>

                    {/* Browser Mockup */}
                    <div className="bg-jual-card border border-jual-border rounded-xl overflow-hidden shadow-2xl mx-auto max-w-full">

                        {/* Browser Header */}
                        <div className="bg-[#1e293b] border-b border-jual-border px-3 md:px-4 py-2 md:py-3 flex items-center gap-1.5 md:gap-2">
                            <div className="flex gap-1.5 md:gap-2 shrink-0">
                                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="ml-2 md:ml-4 bg-jual-bg text-[10px] md:text-xs text-jual-text-muted px-2 md:px-4 py-1 md:py-1.5 rounded-md flex-1 text-left flex items-center gap-1.5 md:gap-2 max-w-sm overflow-hidden">
                                <span>🔒</span>
                                <span className="truncate">https://app.jual.in/builder</span>
                            </div>
                        </div>
                        {/* Browser Content Mock */}
                        <div className="p-3 md:p-6 bg-[#1a243a] aspect-[4/3] md:aspect-[16/9] flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20">
                                {/* Subtle pattern inside mockup */}
                                <div className="w-full h-full bg-grid-pattern"></div>
                            </div>
                            <div className="relative z-10 w-[90%] md:w-3/4 h-[90%] md:h-3/4 bg-white/5 rounded-lg border border-white/10 p-3 md:p-6 flex flex-col backdrop-blur-sm">
                                <div className="h-4 md:h-6 w-1/2 md:w-1/3 bg-white/10 rounded mb-4 md:mb-8 shrink-0"></div>
                                <div className="flex-1 flex gap-3 md:gap-6 min-h-0">
                                    {/* Sidebar Mock */}
                                    <div className="w-1/3 md:w-1/4 flex flex-col gap-2 md:gap-3">
                                        <div className="h-6 md:h-8 w-full bg-jual-green/20 rounded border border-jual-green/30"></div>
                                        <div className="h-6 md:h-8 w-full bg-white/5 rounded"></div>
                                        <div className="h-6 md:h-8 w-full bg-white/5 rounded hidden sm:block"></div>
                                        <div className="h-6 md:h-8 w-full bg-white/5 rounded hidden sm:block"></div>
                                    </div>
                                    {/* Content Mock */}
                                    <div className="w-2/3 md:w-3/4 flex flex-col gap-2 md:gap-4">
                                        <div className="h-3 md:h-4 w-1/2 bg-white/10 rounded"></div>
                                        <div className="flex-1 bg-white/5 rounded border border-white/10 mt-1 md:mt-2"></div>
                                        <div className="flex gap-2 md:gap-4 mt-2 md:mt-4 h-8 md:h-10 shrink-0">
                                            <div className="h-full flex-1 bg-white/5 rounded border border-white/10"></div>
                                            <div className="h-full flex-1 bg-white/5 rounded border border-white/10 hidden sm:block"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div id="get-started" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#131b2f] to-[#0a0f1c] border border-jual-border rounded-2xl p-12 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-jual-green to-transparent"></div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Siap Untuk Sukses Bersama <span className="text-jual-green">Jual</span>.In ? </h2>
                    <p className="text-sm text-jual-text-muted max-w-xl mx-auto mb-10 leading-relaxed">
                        Bergabunglah dengan ribuan pengusaha yang telah meningkatkan konversi
                        mereka hingga 300% dengan bantuan kecerdasan buatan.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/dashboard"
                            className="bg-jual-green hover:bg-jual-green-hover text-white font-semibold py-3 px-10 rounded-md transition-all shadow-[0_0_15px_rgba(0,181,122,0.3)]"
                        >
                            Coba Gratis
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />

        </div>
    );
}
