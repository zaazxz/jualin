import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff, Mail, Lock, LogIn, Sparkles, AlertCircle, CheckCircle2, Moon, Sun, Globe } from 'lucide-react';
import DevelopmentModal from '@/Components/DevelopmentModal';
import { useAppStore } from '@/store/useAppStore';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showDevModal, setShowDevModal] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

    const { t, theme, toggleTheme, language, setLanguage } = useAppStore();

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const languages = [
        { code: 'id', label: 'Indonesia' },
        { code: 'en', label: 'English' },
        { code: 'ms', label: 'Malaysia' }
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-jual-bg text-jual-text-main font-sans selection:bg-jual-green selection:text-white bg-grid-pattern relative flex justify-center items-center p-4 sm:p-6 lg:p-8">
            <Head title={t('login')} />

            {/* Top Right Actions */}
            <div className="absolute top-6 right-6 flex items-center gap-3 z-50">
                {/* Language Selector */}
                <div className="relative">
                    <button
                        onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                        className="flex items-center gap-2 text-jual-text-muted hover:text-emerald-400 transition-colors p-2 hover:bg-jual-card rounded-lg bg-jual-card/50 backdrop-blur-sm border border-jual-border"
                    >
                        <Globe className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase hidden md:block">{language}</span>
                    </button>
                    
                    {isLangMenuOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsLangMenuOpen(false)}></div>
                            <div className="absolute right-0 mt-3 w-40 bg-jual-card border border-jual-border rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden z-20">
                                <div className="p-2">
                                    {languages.map(lang => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setLanguage(lang.code);
                                                setIsLangMenuOpen(false);
                                            }}
                                            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors ${language === lang.code ? 'bg-emerald-500/10 text-emerald-500 font-bold' : 'text-jual-text-main hover:bg-jual-bg'}`}
                                        >
                                            {lang.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Dark Mode Toggle */}
                <button
                    onClick={toggleTheme}
                    className="text-jual-text-muted hover:text-emerald-400 transition-colors p-2 hover:bg-jual-card rounded-lg bg-jual-card/50 backdrop-blur-sm border border-jual-border"
                    title={theme === 'dark' ? t('light_mode') : t('dark_mode')}
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>

            <div className="w-full max-w-[440px] animate-in fade-in zoom-in duration-500">

                {/* Header / Logo */}
                <div className="mb-5 flex flex-col items-center">

                    <Link href="/" className="flex items-center gap-3 mb-2 group">

                        {/* Logo Triangle */}
                        <span className="text-2xl font-bold text-emerald-500 tracking-tight">Jual<span className="text-jual-text-main">.in</span></span>

                    </Link>

                    <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                        <span className="text-xs font-semibold tracking-wider text-emerald-600 dark:text-emerald-500">THE FUTURE OF SALES</span>
                    </div>

                </div>

                {/* Login Card */}
                <div className="w-full bg-jual-card backdrop-blur-xl rounded-2xl border border-jual-border p-6 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden group/card">

                    {/* Subtle top glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-jual-text-main tracking-tight">{t('login')}</h2>
                        <p className="text-sm text-jual-text-muted mt-1.5 leading-relaxed">{t('login_subtitle')}</p>
                    </div>

                    {/* Flash Status Message */}
                    {status && (
                        <div className="mb-6 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-xl animate-in slide-in-from-top-2 duration-300">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-200 leading-tight">{status}</p>
                        </div>
                    )}

                    {/* General Error Message (Optional Debug) */}
                    {errors.message && (
                        <div className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl animate-in slide-in-from-top-2 duration-300">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                            <p className="text-sm font-medium text-red-600 dark:text-red-200 leading-tight">{errors.message}</p>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={submit}>

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500/90 uppercase tracking-widest ml-1">{t('email')}</label>
                            <div className="relative group/input">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className={`w-4 h-4 ${errors.email ? 'text-red-500' : 'text-jual-text-muted group-focus-within/input:text-emerald-500'} transition-colors`} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="nama@email.com"
                                    className={`w-full bg-jual-input border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-jual-border focus:border-emerald-500/50'} rounded-xl pl-11 pr-4 py-3 text-sm text-jual-text-main placeholder-jual-text-muted/50 focus:outline-none focus:ring-4 ${errors.email ? 'focus:ring-red-500/10' : 'focus:ring-emerald-500/10'} transition-all duration-300`}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-[11px] font-medium text-red-500 ml-1 mt-1 animate-in fade-in duration-200">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500/90 uppercase tracking-widest">{t('password')}</label>
                                <Link 
                                    href={route('password.request')}
                                    className="text-[10px] font-bold text-amber-600 hover:text-amber-500 dark:text-yellow-600 dark:hover:text-yellow-500 uppercase tracking-wider transition-colors"
                                >
                                    {t('forgot_password')}
                                </Link>
                            </div>
                            <div className="relative group/input">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className={`w-4 h-4 ${errors.password ? 'text-red-500' : 'text-jual-text-muted group-focus-within/input:text-emerald-500'} transition-colors`} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className={`w-full bg-jual-input border ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-jual-border focus:border-emerald-500/50'} rounded-xl pl-11 pr-12 py-3 text-sm text-jual-text-main placeholder-jual-text-muted/50 focus:outline-none focus:ring-4 ${errors.password ? 'focus:ring-red-500/10' : 'focus:ring-emerald-500/10'} transition-all duration-300`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-jual-text-muted hover:text-emerald-500 transition-colors outline-none"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-[11px] font-medium text-red-500 ml-1 mt-1 animate-in fade-in duration-200">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center select-none group/check">
                            <div className="relative flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-jual-border bg-jual-input checked:border-emerald-500 checked:bg-emerald-500 transition-all duration-300"
                                />
                                <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity">
                                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                            </div>
                            <label htmlFor="remember" className="ml-3 text-sm text-jual-text-muted cursor-pointer group-hover/check:text-jual-text-main transition-colors">
                                {t('remember_me')}
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_8px_25px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            <span>{processing ? t('processing') : t('login')}</span>
                            {!processing && <LogIn className="w-4 h-4" />}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="mt-3 mb-3 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-jual-border"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.2em]">
                            <span className="bg-jual-card px-4 text-jual-text-muted">{t('or_login_with')}</span>
                        </div>
                    </div>

                    {/* Google Login */}
                    <a 
                        href={route('auth.google')}
                        className="w-full bg-jual-bg hover:bg-jual-bg-alt border border-jual-border hover:border-emerald-500/30 rounded-xl py-3 flex items-center justify-center gap-3 transition-all duration-300 group/google"
                    >
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        <span className="text-sm font-semibold text-jual-text-main transition-colors">Google</span>
                    </a>

                    {/* Footer Link */}
                    <div className="mt-10 text-center">
                        <p className="text-sm text-jual-text-muted">
                            {t('no_account')}{' '}
                            <Link href={route('register')} className="text-emerald-600 dark:text-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400 font-bold transition-colors ml-1">
                                {t('register')}
                            </Link>
                        </p>
                    </div>
                </div>

                <DevelopmentModal 
                    isOpen={showDevModal} 
                    onClose={() => setShowDevModal(false)} 
                />
            </div>
        </div>
    );
}
