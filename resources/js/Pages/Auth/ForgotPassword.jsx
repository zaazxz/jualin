import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, ArrowRight, Sparkles, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen bg-jual-bg text-jual-text-main font-sans selection:bg-jual-green selection:text-white bg-grid-pattern relative flex justify-center items-center p-4 sm:p-6 lg:p-8">
            <Head title="Forgot Password" />

            <div className="w-full max-w-[440px] animate-in fade-in zoom-in duration-500">
                {/* Header / Logo */}
                <div className="mb-5 flex flex-col items-center">
                    <Link href="/" className="flex items-center gap-3 mb-2 group">
                        <span className="text-2xl font-bold text-emerald-400 tracking-tight">Jual<span className="text-white">.in</span></span>
                    </Link>
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
                        <h2 className="text-xl font-semibold text-slate-100 tracking-tight">Lupa Kata Sandi?</h2>
                        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                            Tidak masalah. Beritahu kami alamat email Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi Anda.
                        </p>
                    </div>

                    {/* Flash Status Message */}
                    {status && (
                        <div className="mb-6 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-xl animate-in slide-in-from-top-2 duration-300">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                            <p className="text-sm font-medium text-emerald-200 leading-tight">{status}</p>
                        </div>
                    )}

                    {errors.message && (
                        <div className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl animate-in slide-in-from-top-2 duration-300">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                            <p className="text-sm font-medium text-red-200 leading-tight">{errors.message}</p>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={submit}>
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-emerald-500/90 uppercase tracking-widest ml-1">Alamat Email</label>
                            <div className="relative group/input">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className={`w-4 h-4 ${errors.email ? 'text-red-400' : 'text-slate-500 group-focus-within/input:text-emerald-500'} transition-colors`} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="nama@email.com"
                                    className={`w-full bg-[#131d23] border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-[#1f2e36] focus:border-emerald-500/50'} rounded-xl pl-11 pr-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-4 ${errors.email ? 'focus:ring-red-500/10' : 'focus:ring-emerald-500/10'} transition-all duration-300`}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-[11px] font-medium text-red-400 ml-1 mt-1 animate-in fade-in duration-200">{errors.email}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-900 font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_8px_25px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            <span>{processing ? 'Mengirim...' : 'Kirim Tautan Reset'}</span>
                            {!processing && <ArrowRight className="w-4 h-4" />}
                        </button>
                    </form>

                    {/* Back to Login */}
                    <div className="mt-8 text-center">
                        <Link href={route('login')} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-500 transition-colors font-medium">
                            <ArrowLeft className="w-4 h-4" />
                            Kembali ke halaman Masuk
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
