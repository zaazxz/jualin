import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Sparkles, Scale, ShieldCheck, Clock } from 'lucide-react';

export default function Terms() {
    return (
        <div className="min-h-screen bg-jual-bg text-jual-text-main font-sans selection:bg-jual-green selection:text-white bg-grid-pattern relative py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Syarat & Ketentuan" />

            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header */}
                <div className="flex flex-col items-center mb-12">
                    <Link href="/" className="flex items-center gap-3 mb-6 group">
                        <span className="text-3xl font-bold text-emerald-400 tracking-tight">Jual<span className="text-white">.in</span></span>
                    </Link>

                    <div className="inline-flex items-center space-x-2 bg-jual-card border border-jual-border rounded-full px-4 py-1.5 mb-6">
                        <Scale className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">Syarat & Ketentuan Penggunaan</span>
                    </div>

                    <h1 className="text-4xl font-extrabold text-white tracking-tight text-center mb-4">Aturan Main Jual.in</h1>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>Terakhir diperbarui: 27 April 2026</span>
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-[#0f171c]/80 backdrop-blur-xl rounded-3xl border border-[#1a272e] p-8 sm:p-12 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-emerald-500/0"></div>

                    <div className="prose prose-invert prose-emerald max-w-none space-y-10">
                        <section>
                            <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-3 mb-4">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 text-sm">01</span>
                                Penerimaan Ketentuan
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                Dengan mengakses atau menggunakan platform Jual.in, Anda setuju untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak menyetujui bagian apa pun dari ketentuan ini, Anda tidak diperbolehkan menggunakan layanan kami.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-3 mb-4">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 text-sm">02</span>
                                Akun Pengguna
                            </h2>
                            <p className="text-slate-400 leading-relaxed mb-4">
                                Untuk menggunakan fitur-fitur tertentu, Anda wajib membuat akun. Anda bertanggung jawab penuh atas:
                            </p>
                            <ul className="list-disc list-inside text-slate-400 space-y-2 ml-4">
                                <li>Menjaga kerahasiaan kata sandi Anda.</li>
                                <li>Semua aktivitas yang terjadi di bawah akun Anda.</li>
                                <li>Memberikan informasi yang akurat dan terbaru.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-3 mb-4">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 text-sm">03</span>
                                Penggunaan Layanan
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                Jual.in menyediakan alat untuk pembuatan sales page dan manajemen penjualan. Anda dilarang menggunakan layanan kami untuk aktivitas ilegal, penipuan, atau menyebarkan konten yang melanggar hak kekayaan intelektual orang lain.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-3 mb-4">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 text-sm">04</span>
                                Batasan Tanggung Jawab
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                Jual.in tidak bertanggung jawab atas kerugian finansial atau kegagalan bisnis yang mungkin timbul dari penggunaan platform kami. Kami menyediakan alat, namun hasil penjualan sepenuhnya bergantung pada strategi bisnis Anda sendiri.
                            </p>
                        </section>

                        <div className="pt-8 border-t border-[#1f2e36] flex flex-col sm:flex-row items-center justify-between gap-6">
                            <p className="text-slate-500 text-sm italic">
                                Ada pertanyaan? Hubungi tim kami di mirzaqamaruzzaman18@gmail.com
                            </p>
                            <Link
                                href={route('register')}
                                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(16,185,129,0.2)]"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Kembali Daftar
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer Decor */}
                <div className="mt-12 flex justify-center opacity-20">
                    <Sparkles className="w-12 h-12 text-emerald-500" />
                </div>
            </div>
        </div>
    );
}
