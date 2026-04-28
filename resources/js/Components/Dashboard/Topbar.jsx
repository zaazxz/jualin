import React, { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { Moon, Sun, Bell, User, Menu, ChevronDown, Settings, LogOut, Shield, Globe } from 'lucide-react'
import DevelopmentModal from '@/Components/DevelopmentModal'
import { useAppStore } from '@/store/useAppStore'

export default function Topbar({ toggleSidebar }) {
    const { auth } = usePage().props;
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const [showDevModal, setShowDevModal] = useState(false);

    const { theme, toggleTheme, language, setLanguage, t } = useAppStore();

    const languages = [
        { code: 'id', label: 'Indonesia' },
        { code: 'en', label: 'English' },
        { code: 'ms', label: 'Malaysia' }
    ];

    return (
        <>
            <header className="h-16 bg-jual-bg/80 backdrop-blur-md border-b border-jual-border flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden text-jual-text-muted hover:text-white p-1 transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="text-sm font-medium text-jual-text-muted hidden sm:flex items-center gap-2">
                        <span className="text-jual-text-muted">Halo,</span>
                        <span className="text-jual-text-main">{auth.user.name}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 lg:gap-5">
                    {/* Language Selector */}
                    <div className="relative">
                        <button
                            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                            className="flex items-center gap-2 text-jual-text-muted hover:text-emerald-400 transition-colors px-3 py-2 hover:bg-jual-card rounded-lg"
                        >
                            <Globe className="w-5 h-5" />
                            <span className="text-xs font-bold uppercase hidden md:block">{language}</span>
                        </button>
                        
                        {isLangMenuOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsLangMenuOpen(false)}></div>
                                <div className="absolute right-0 mt-3 w-40 bg-jual-card border border-jual-border rounded-2xl shadow-xl overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="p-2">
                                        {languages.map(lang => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setLanguage(lang.code);
                                                    setIsLangMenuOpen(false);
                                                }}
                                                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors ${language === lang.code ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold' : 'text-jual-text-main hover:bg-jual-input'}`}
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

                    {/* Notifications */}
                    <button
                        onClick={() => setShowDevModal(true)}
                        className="text-jual-text-muted hover:text-emerald-400 transition-colors relative p-2 hover:bg-jual-card rounded-lg"
                    >
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#0a0f0d]"></span>
                    </button>

                    {/* User Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-xl hover:bg-jual-card border border-transparent hover:border-jual-border transition-all duration-300 group"
                        >
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center overflow-hidden group-hover:border-emerald-500/40 transition-colors">
                                <User className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div className="hidden md:block text-left mr-1">
                                <p className="text-xs font-bold text-jual-text-main leading-none">{auth.user.name}</p>
                                <p className="text-[10px] text-jual-text-muted mt-1 leading-none">Member</p>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-jual-text-muted transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isUserMenuOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setIsUserMenuOpen(false)}
                                ></div>
                                <div className="absolute right-0 mt-3 w-56 bg-jual-card border border-jual-border rounded-2xl shadow-xl overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="p-4 border-b border-jual-border bg-jual-bg/50">
                                        <p className="text-xs font-bold text-jual-text-muted uppercase tracking-widest">{t('my_account')}</p>
                                        <p className="text-sm text-jual-text-main mt-1 truncate font-medium">{auth.user.email}</p>
                                    </div>
                                    <div className="p-2">
                                        <Link href={route('profile.edit')} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-jual-text-muted hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group">
                                            <Settings className="w-4 h-4 text-jual-text-muted group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                                            {t('settings')}
                                        </Link>
                                    </div>
                                    <div className="p-2 border-t border-jual-border">
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-500/10 transition-colors group text-left font-medium"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            {t('logout')}
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <DevelopmentModal
                isOpen={showDevModal}
                onClose={() => setShowDevModal(false)}
            />
        </>
    )
}
