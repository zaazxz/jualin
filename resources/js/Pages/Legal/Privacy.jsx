import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Sparkles, ShieldCheck, Eye, Lock, Clock } from 'lucide-react';

export default function Privacy() {
    return (
        <div className="min-h-screen bg-jual-bg text-jual-text-main font-sans selection:bg-jual-green selection:text-white bg-grid-pattern relative py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Kebijakan Privasi" />

            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header */}
                <div className="flex flex-col items-center mb-12">
                    <Link href="/" className="flex items-center gap-3 mb-6 group">
                        <span className="text-3xl font-bold text-emerald-400 tracking-tight">Jual<span className="text-white">.in</span></span>
                    </Link>

                    <div className="inline-flex items-center space-x-2 bg-jual-card border border-jual-border rounded-full px-4 py-1.5 mb-6">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">Kebijakan Privasi Data</span>
                    </div>

                    <h1 className="text-4xl font-extrabold text-white tracking-tight text-center mb-4">Privasi Anda Adalah Prioritas</h1>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>Terakhir diperbarui: 27 April 2026</span>
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-[#0f171c]/80 backdrop-blur-xl rounded-3xl border border-[#1a272e] p-8 sm:p-12 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-emerald-500/0"></div>

                    <div className="prose prose-invert prose-emerald max-w-none space-y-10">
                        <section>
                            <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-3 mb-4">
                                <Eye className="w-6 h-6" />
                                Data yang Kami Kumpulkan
                            </h2>
                            <p className="text-slate-400 leading-relaxed mb-4">
                                Kami mengumpulkan informasi yang Anda berikan langsung kepada kami saat mendaftar, seperti:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-[#131d23] p-4 rounded-xl border border-[#1f2e36]">
                                    <h4 className="text-white font-medium mb-1">Informasi Identitas</h4>
                                    <p className="text-xs text-slate-500">Nama lengkap, alamat email, dan kredensial akun.</p>
                                </div>
                                <div className="bg-[#131d23] p-4 rounded-xl border border-[#1f2e36]">
                                    <h4 className="text-white font-medium mb-1">Data Penggunaan</h4>
                                    <p className="text-xs text-slate-500">Alamat IP, tipe browser, dan interaksi dengan platform.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-3 mb-4">
                                <Sparkles className="w-6 h-6" />
                                Bagaimana Kami Menggunakan Data
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                Data Anda digunakan semata-mata untuk mempersonalisasi pengalaman Anda, memproses transaksi, dan meningkatkan kualitas layanan AI kami. Kami <span className="text-white font-bold">TIDAK AKAN PERNAH</span> menjual data pribadi Anda kepada pihak ketiga.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-3 mb-4">
                                <Lock className="w-6 h-6" />
                                Keamanan Data
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                Kami menerapkan enkripsi tingkat lanjut dan protokol keamanan industri untuk melindungi data Anda dari akses yang tidak sah. Privasi Anda terlindungi di balik sistem keamanan berlapis kami.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-3 mb-4">
                                <ShieldCheck className="w-6 h-6" />
                                Hak Anda
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                Anda memiliki hak penuh untuk mengakses, memperbaiki, atau menghapus data pribadi Anda dari sistem kami kapan saja melalui pengaturan akun atau dengan menghubungi tim dukungan kami.
                            </p>
                        </section>

                        <div className="pt-8 border-t border-[#1f2e36] flex flex-col sm:flex-row items-center justify-between gap-6">
                            <p className="text-slate-500 text-sm italic">
                                Khawatir tentang data Anda? Hubungi mirzaqamaruzzaman18@gmail.com
                            </p>
                            <Link
                                href={route('register')}
                                className="flex items-center gap-2 bg-[#131d23] hover:bg-[#1a272e] text-emerald-400 border border-emerald-500/20 font-bold py-3 px-8 rounded-xl transition-all duration-300"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Kembali Daftar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
