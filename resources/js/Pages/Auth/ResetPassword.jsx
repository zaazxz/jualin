import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Lock, Sparkles, Eye, EyeOff, KeyRound, AlertCircle, Moon, Sun, Globe } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export default function ResetPassword({ email, token }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

    const { t, theme, toggleTheme, language, setLanguage } = useAppStore();

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const languages = [
        { code: 'id', label: 'Indonesia' },
        { code: 'en', label: 'English' },
        { code: 'ms', label: 'Malaysia' }
    ];

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-jual-bg text-jual-text-main font-sans selection:bg-jual-green selection:text-white bg-grid-pattern relative flex justify-center items-center p-4 sm:p-6 lg:p-8">
            <Head title={t('reset_password_title')} />

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
                    <div className="flex items-center gap-3 mb-2 group">
                        <span className="text-2xl font-bold text-emerald-500 tracking-tight">Jual<span className="text-jual-text-main">.in</span></span>
                    </div>
                    <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                        <span className="text-xs font-semibold tracking-wider text-emerald-600 dark:text-emerald-500 uppercase">THE FUTURE OF SALES</span>
                    </div>
                </div>

                {/* Card */}
                <div className="w-full bg-jual-card backdrop-blur-xl rounded-2xl border border-jual-border p-6 sm:p-10 shadow-xl relative overflow-hidden group/card">
                    {/* Subtle top glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>

                    <div className="mb-6 text-center sm:text-left">
                        <h2 className="text-xl font-semibold text-jual-text-main tracking-tight">{t('reset_password_title')}</h2>
                        <p className="text-sm text-jual-text-muted mt-2 leading-relaxed">
                            {language === 'id' ? `Silakan masukkan kata sandi baru Anda untuk` : language === 'en' ? `Please enter your new password for` : `Sila masukkan kata laluan baru anda untuk`} <span className="text-emerald-500 font-medium">{email}</span>.
                        </p>
                    </div>

                    {errors.email && (
                        <div className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl animate-in slide-in-from-top-2 duration-300">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                            <p className="text-sm font-medium text-red-600 dark:text-red-200 leading-tight">{errors.email}</p>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={submit}>
                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500/90 uppercase tracking-widest ml-1">{t('new_password')}</label>
                            <div className="relative group/input">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className={`w-4 h-4 ${errors.password ? 'text-red-500' : 'text-jual-text-muted group-focus-within/input:text-emerald-500'} transition-colors`} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
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

                        {/* Confirm Password Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500/90 uppercase tracking-widest ml-1">{t('confirm_new_password')}</label>
                            <div className="relative group/input">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className={`w-4 h-4 ${errors.password_confirmation ? 'text-red-500' : 'text-jual-text-muted group-focus-within/input:text-emerald-500'} transition-colors`} />
                                </div>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="••••••••"
                                    className={`w-full bg-jual-input border ${errors.password_confirmation ? 'border-red-500/50 focus:border-red-500' : 'border-jual-border focus:border-emerald-500/50'} rounded-xl pl-11 pr-12 py-3 text-sm text-jual-text-main placeholder-jual-text-muted/50 focus:outline-none focus:ring-4 ${errors.password_confirmation ? 'focus:ring-red-500/10' : 'focus:ring-emerald-500/10'} transition-all duration-300`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-jual-text-muted hover:text-emerald-500 transition-colors outline-none"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password_confirmation && (
                                <p className="text-[11px] font-medium text-red-500 ml-1 mt-1 animate-in fade-in duration-200">{errors.password_confirmation}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full mt-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(16,185,129,0.2)]"
                        >
                            <span>{processing ? t('processing') : t('reset_password_btn')}</span>
                            {!processing && <KeyRound className="w-4 h-4" />}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
