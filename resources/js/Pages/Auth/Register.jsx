import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Eye, EyeOff, Mail, Lock, User, UserPlus, Sparkles } from 'lucide-react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="min-h-screen bg-jual-bg text-jual-text-main font-sans selection:bg-jual-green selection:text-white bg-grid-pattern relative flex justify-center items-center p-4">
            <Head title="Register" />

            <div className="w-full max-w-[440px] animate-in fade-in zoom-in duration-500">
                {/* Header / Logo */}
                <div className="mb-4 flex flex-col items-center">
                    <Link href="/" className="flex items-center gap-3 mb-2 group">
                        <span className="text-2xl font-bold text-emerald-400 tracking-tight">Jual<span className="text-white">.in</span></span>
                    </Link>

                    <div className="inline-flex items-center space-x-2 bg-jual-card border border-jual-border rounded-full px-4 py-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
                        <span className="text-[10px] font-bold tracking-wider text-[#FDE047]">THE FUTURE OF SALES</span>
                    </div>
                </div>

                {/* Register Card */}
                <div className="w-full bg-[#0f171c]/80 backdrop-blur-xl rounded-2xl border border-[#1a272e] p-5 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden group/card">
                    {/* Subtle top glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>

                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-slate-100 tracking-tight">Buat Akun Baru</h2>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">Mulai perjalanan bisnis digital Anda hari ini.</p>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        {/* Name Input */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-emerald-500/90 uppercase tracking-widest ml-1">Nama Lengkap</label>
                            <div className="relative group/input">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="w-4 h-4 text-slate-500 group-focus-within/input:text-emerald-500 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Nama Anda"
                                    className="w-full bg-[#131d23] border border-[#1f2e36] rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-emerald-500/90 uppercase tracking-widest ml-1">Alamat Email</label>
                            <div className="relative group/input">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="w-4 h-4 text-slate-500 group-focus-within/input:text-emerald-500 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="nama@email.com"
                                    className="w-full bg-[#131d23] border border-[#1f2e36] rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Password Fields Row (to save space) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-emerald-500/90 uppercase tracking-widest ml-1">Kata Sandi</label>
                                <div className="relative group/input">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="w-4 h-4 text-slate-500 group-focus-within/input:text-emerald-500 transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="w-full bg-[#131d23] border border-[#1f2e36] rounded-xl pl-11 pr-11 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-emerald-500 transition-colors outline-none"
                                    >
                                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-emerald-500/90 uppercase tracking-widest ml-1">Konfirmasi</label>
                                <div className="relative group/input">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="w-4 h-4 text-slate-500 group-focus-within/input:text-emerald-500 transition-colors" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="w-full bg-[#131d23] border border-[#1f2e36] rounded-xl pl-11 pr-11 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-emerald-500 transition-colors outline-none"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Terms & Conditions */}
                        <div className="flex items-start select-none group/check py-1">
                            <div className="relative flex items-center mt-0.5">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-[#1f2e36] bg-[#131d23] checked:border-emerald-500 checked:bg-emerald-500 transition-all duration-300"
                                />
                                <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-900 opacity-0 peer-checked:opacity-100 transition-opacity">
                                    <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                            </div>
                            <label htmlFor="terms" className="ml-3 text-[11px] text-slate-400 cursor-pointer group-hover/check:text-slate-300 transition-colors leading-tight">
                                Saya setuju dengan <Link href="#" className="text-emerald-500 hover:underline">Syarat & Ketentuan</Link> serta <Link href="#" className="text-emerald-500 hover:underline">Kebijakan Privasi</Link> yang berlaku.
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-900 font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_8px_25px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <span>Daftar Sekarang</span>
                            <UserPlus className="w-4 h-4" />
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="mt-4 mb-4 relative text-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#1f2e36]"></div>
                        </div>
                        <span className="relative bg-[#0f171c] px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Atau daftar dengan</span>
                    </div>

                    {/* Google Signup */}
                    <button className="w-full bg-[#131d23] hover:bg-[#18242b] border border-[#1f2e36] rounded-xl py-2.5 flex items-center justify-center gap-3 transition-all duration-300 group/google">
                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">Google</span>
                    </button>

                    {/* Footer Link */}
                    <div className="mt-5 text-center">
                        <p className="text-xs text-slate-400">
                            Sudah punya akun?{' '}
                            <Link href="/login" className="text-emerald-500 hover:text-emerald-400 font-bold transition-colors ml-1">
                                Masuk
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}