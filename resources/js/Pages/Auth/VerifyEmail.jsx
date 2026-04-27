import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Sparkles, MailCheck, Send, LogOut, CheckCircle2 } from 'lucide-react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <div className="min-h-screen bg-jual-bg text-jual-text-main font-sans selection:bg-jual-green selection:text-white bg-grid-pattern relative flex justify-center items-center p-4 sm:p-6 lg:p-8">
            <Head title="Email Verification" />

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
                <div className="w-full bg-[#0f171c]/80 backdrop-blur-xl rounded-2xl border border-[#1a272e] p-6 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden group/card text-center sm:text-left">
                    {/* Subtle top glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>

                    <div className="flex justify-center sm:justify-start mb-6">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
                            <MailCheck className="w-8 h-8 text-emerald-500" />
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-100 tracking-tight">Verifikasi Email Anda</h2>
                        <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                            Terima kasih telah mendaftar! Sebelum memulai, bisakah Anda memverifikasi alamat email Anda dengan mengeklik tautan yang baru saja kami kirimkan melalui email kepada Anda? Jika Anda tidak menerima email tersebut, kami akan dengan senang hati mengirimkan tautan lainnya.
                        </p>
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="mb-8 flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl animate-in fade-in duration-300">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            <p className="text-sm font-medium text-emerald-200 leading-relaxed text-left">
                                Tautan verifikasi baru telah dikirim ke alamat email yang Anda berikan saat pendaftaran.
                            </p>
                        </div>
                    )}

                    <form onSubmit={submit} className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-900 font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_8px_25px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            <span>{processing ? 'Mengirim...' : 'Kirim Ulang Tautan'}</span>
                            {!processing && <Send className="w-4 h-4" />}
                        </button>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-xl transition-colors outline-none focus:ring-2 focus:ring-slate-700"
                        >
                            Keluar
                            <LogOut className="w-4 h-4" />
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
