import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Sparkles, Scale, ShieldCheck, Clock, Globe, Sun, Moon } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export default function Terms() {
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

    return (
        <div className="min-h-screen bg-jual-bg text-jual-text-main font-sans selection:bg-jual-green selection:text-white bg-grid-pattern relative py-12 px-4 sm:px-6 lg:px-8 pt-24">
            <Head title={t('terms_badge')} />

            {/* Top Right Actions */}
            <div className="absolute top-6 right-6 flex items-center gap-3 z-50">
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

                <button
                    onClick={toggleTheme}
                    className="text-jual-text-muted hover:text-emerald-400 transition-colors p-2 hover:bg-jual-card rounded-lg bg-jual-card/50 backdrop-blur-sm border border-jual-border"
                    title={theme === 'dark' ? t('light_mode') : t('dark_mode')}
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>

            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header */}
                <div className="flex flex-col items-center mb-12">
                    <Link href="/" className="flex items-center gap-3 mb-6 group">
                        <span className="text-3xl font-bold text-emerald-500 tracking-tight">Jual<span className="text-jual-text-main">.in</span></span>
                    </Link>

                    <div className="inline-flex items-center space-x-2 bg-jual-card border border-jual-border rounded-full px-4 py-1.5 mb-6">
                        <Scale className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-semibold tracking-wider text-emerald-500 uppercase">{t('terms_badge')}</span>
                    </div>

                    <h1 className="text-4xl font-extrabold text-jual-text-main tracking-tight text-center mb-4">{t('terms_title')}</h1>
                    <div className="flex items-center gap-2 text-jual-text-muted text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{t('last_updated')}</span>
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-jual-card/80 backdrop-blur-xl rounded-3xl border border-jual-border p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-emerald-500/0"></div>

                    <div className="prose prose-emerald max-w-none space-y-10">
                        <section>
                            <h2 className="text-2xl font-bold text-jual-text-main flex items-center gap-3 mb-4">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 text-sm">01</span>
                                {t('terms_sec1_title')}
                            </h2>
                            <p className="text-jual-text-muted leading-relaxed">
                                {t('terms_sec1_desc')}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-jual-text-main flex items-center gap-3 mb-4">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 text-sm">02</span>
                                {t('terms_sec2_title')}
                            </h2>
                            <p className="text-jual-text-muted leading-relaxed mb-4">
                                {t('terms_sec2_desc')}
                            </p>
                            <ul className="list-disc list-inside text-jual-text-muted space-y-2 ml-4">
                                <li>{t('terms_sec2_bull1')}</li>
                                <li>{t('terms_sec2_bull2')}</li>
                                <li>{t('terms_sec2_bull3')}</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-jual-text-main flex items-center gap-3 mb-4">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 text-sm">03</span>
                                {t('terms_sec3_title')}
                            </h2>
                            <p className="text-jual-text-muted leading-relaxed">
                                {t('terms_sec3_desc')}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-jual-text-main flex items-center gap-3 mb-4">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 text-sm">04</span>
                                {t('terms_sec4_title')}
                            </h2>
                            <p className="text-jual-text-muted leading-relaxed">
                                {t('terms_sec4_desc')}
                            </p>
                        </section>

                        <div className="pt-8 border-t border-jual-border flex flex-col sm:flex-row items-center justify-between gap-6">
                            <p className="text-jual-text-muted text-sm italic">
                                {t('terms_footer_contact')}
                            </p>
                            <button
                                onClick={() => window.history.length > 2 ? window.history.back() : window.location.href = '/'}
                                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(16,185,129,0.2)]"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                {t('back')}
                            </button>
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
