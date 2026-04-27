import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Lock, Sparkles, Eye, EyeOff, KeyRound, AlertCircle } from 'lucide-react';

export default function ResetPassword({ email, token }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-jual-bg text-jual-text-main font-sans selection:bg-jual-green selection:text-white bg-grid-pattern relative flex justify-center items-center p-4 sm:p-6 lg:p-8">
            <Head title="Reset Password" />

            <div className="w-full max-w-[440px] animate-in fade-in zoom-in duration-500">
                {/* Header / Logo */}
                <div className="mb-5 flex flex-col items-center">
                    <div className="flex items-center gap-3 mb-2 group">
                        <span className="text-2xl font-bold text-emerald-400 tracking-tight">Jual<span className="text-white">.in</span></span>
                    </div>
                    <div className="inline-flex items-center space-x-2 bg-jual-card border border-jual-border rounded-full px-4 py-1.5">
                        <Sparkles className="w-4 h-4 text-[#FDE047]" />
                        <span className="text-xs font-semibold tracking-wider text-[#FDE047]">THE FUTURE OF SALES</span>
                    </div>
                </div>

                {/* Card */}
                <div className="w-full bg-[#0f171c]/80 backdrop-blur-xl rounded-2xl border border-[#1a272e] p-6 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden group/card">
                    {/* Subtle top glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>

                    <div className="mb-6 text-center sm:text-left">
                        <h2 className="text-xl font-semibold text-slate-100 tracking-tight">Atur Ulang Kata Sandi</h2>
                        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                            Silakan masukkan kata sandi baru Anda untuk <span className="text-slate-300 font-medium">{email}</span>.
                        </p>
                    </div>

                    {errors.email && (
                        <div className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl animate-in slide-in-from-top-2 duration-300">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                            <p className="text-sm font-medium text-red-200 leading-tight">{errors.email}</p>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={submit}>
                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-emerald-500/90 uppercase tracking-widest ml-1">Kata Sandi Baru</label>
                            <div className="relative group/input">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className={`w-4 h-4 ${errors.password ? 'text-red-400' : 'text-slate-500 group-focus-within/input:text-emerald-500'} transition-colors`} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className={`w-full bg-[#131d23] border ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-[#1f2e36] focus:border-emerald-500/50'} rounded-xl pl-11 pr-12 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-4 ${errors.password ? 'focus:ring-red-500/10' : 'focus:ring-emerald-500/10'} transition-all duration-300`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-emerald-500 transition-colors outline-none"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-[11px] font-medium text-red-400 ml-1 mt-1 animate-in fade-in duration-200">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-emerald-500/90 uppercase tracking-widest ml-1">Konfirmasi Kata Sandi</label>
                            <div className="relative group/input">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className={`w-4 h-4 ${errors.password_confirmation ? 'text-red-400' : 'text-slate-500 group-focus-within/input:text-emerald-500'} transition-colors`} />
                                </div>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="••••••••"
                                    className={`w-full bg-[#131d23] border ${errors.password_confirmation ? 'border-red-500/50 focus:border-red-500' : 'border-[#1f2e36] focus:border-emerald-500/50'} rounded-xl pl-11 pr-12 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-4 ${errors.password_confirmation ? 'focus:ring-red-500/10' : 'focus:ring-emerald-500/10'} transition-all duration-300`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-emerald-500 transition-colors outline-none"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password_confirmation && (
                                <p className="text-[11px] font-medium text-red-400 ml-1 mt-1 animate-in fade-in duration-200">{errors.password_confirmation}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-900 font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_8px_25px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            <span>{processing ? 'Memproses...' : 'Simpan Kata Sandi'}</span>
                            {!processing && <KeyRound className="w-4 h-4" />}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
