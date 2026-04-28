import React, { useState } from 'react'
import { Link } from '@inertiajs/react'
import { Moon, Sun, Globe } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'

export default function Navbar() {
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const { theme, toggleTheme, language, setLanguage, t } = useAppStore();

    const languages = [
        { code: 'id', label: 'Indonesia' },
        { code: 'en', label: 'English' },
        { code: 'ms', label: 'Malaysia' }
    ];

    return (
        <>
            <nav className="fixed w-full z-50 top-0 left-0 bg-jual-bg/80 backdrop-blur-md border-b border-jual-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">

                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <a href="#">
                                <span className="text-2xl font-bold tracking-tight">
                                    <span className="text-jual-green">Jual</span>
                                    <span className="text-jual-text-main">.In</span>
                                </span>
                            </a>
                        </div>

                        {/* Navigation */}
                        <div className="hidden md:flex space-x-8 text-sm font-medium text-jual-text-muted">
                            <a href="/#features" className="hover:text-jual-green transition-colors">{t('features')}</a>
                            <a href="/#showcase" className="hover:text-jual-green transition-colors">{t('showcase')}</a>
                            <a href="/#get-started" className="hover:text-jual-green transition-colors">{t('get_started')}</a>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 md:space-x-4">
                            {/* Language Selector */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                    className="flex items-center gap-2 text-jual-text-muted hover:text-emerald-400 transition-colors px-2 md:px-3 py-2 hover:bg-jual-card rounded-lg"
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
                                                        className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors ${language === lang.code ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold' : 'text-jual-text-main hover:bg-jual-bg'}`}
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
                                className="text-jual-text-muted hover:text-emerald-400 transition-colors p-2 hover:bg-jual-card rounded-lg"
                                title={theme === 'dark' ? t('light_mode') : t('dark_mode')}
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>

                            <Link
                                href="/dashboard"
                                className="bg-jual-green hover:bg-jual-green-hover text-white text-sm font-semibold py-2 px-3 md:px-5 rounded-md transition-all shadow-[0_0_15px_rgba(0,181,122,0.3)] hover:shadow-[0_0_20px_rgba(0,181,122,0.5)]"
                            >
                                {t('get_started')}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
