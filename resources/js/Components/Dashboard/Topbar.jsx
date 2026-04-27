import React, { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { Moon, Bell, User, Menu, ChevronDown, Settings, LogOut, Shield } from 'lucide-react'
import DevelopmentModal from '@/Components/DevelopmentModal'

export default function Topbar({ toggleSidebar }) {
    const { auth } = usePage().props;
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [showDevModal, setShowDevModal] = useState(false);

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
                    <div className="text-sm font-medium text-slate-300 hidden sm:flex items-center gap-2">
                        <span className="text-jual-text-muted">Halo,</span>
                        <span className="text-white">{auth.user.name}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 lg:gap-5">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={() => setShowDevModal(true)}
                        className="text-jual-text-muted hover:text-emerald-400 transition-colors p-2 hover:bg-jual-card rounded-lg"
                    >
                        <Moon className="w-5 h-5" />
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
                                <p className="text-xs font-bold text-white leading-none">{auth.user.name}</p>
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
                                <div className="absolute right-0 mt-3 w-56 bg-[#0f171c] border border-jual-border rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="p-4 border-b border-jual-border">
                                        <p className="text-xs font-bold text-jual-text-muted uppercase tracking-widest">Akun Saya</p>
                                        <p className="text-sm text-white mt-1 truncate">{auth.user.email}</p>
                                    </div>
                                    <div className="p-2">
                                        <Link href={route('profile.edit')} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors group">
                                            <Settings className="w-4 h-4 text-slate-500 group-hover:text-emerald-400" />
                                            Pengaturan
                                        </Link>
                                        <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors group">
                                            <Shield className="w-4 h-4 text-slate-500 group-hover:text-emerald-400" />
                                            Keamanan
                                        </Link>
                                    </div>
                                    <div className="p-2 border-t border-jual-border">
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors group text-left"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Keluar
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
