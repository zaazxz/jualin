import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Sparkles, BarChart3, Settings, HelpCircle, LogOut, Moon, Bell, User, Menu, X, FolderOpen, Zap, Lightbulb, TrendingUp, Loader2 } from 'lucide-react';
import Sidebar from '@/Components/Dashboard/Sidebar';
import Topbar from '@/Components/Dashboard/Topbar';
import { useAppStore } from '@/store/useAppStore';
import axios from 'axios';

export default function Layout({ children }) {
    const { url } = usePage();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showDailyInsight, setShowDailyInsight] = useState(false);
    const [insightData, setInsightData] = useState(null);
    const [isLoadingInsight, setIsLoadingInsight] = useState(false);
    const { auth } = usePage().props;
    
    const { t, theme, language } = useAppStore();

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const navItems = [
        { name: t('dashboard'), href: route('dashboard'), icon: LayoutDashboard },
        { name: t('ai_generator'), href: route('dashboard.ai-generator'), icon: Sparkles },
        { name: t('my_projects'), href: route('dashboard.projects'), icon: FolderOpen },
        { name: t('analytics'), href: route('dashboard.analytics'), icon: BarChart3 },
        { name: t('settings'), href: route('profile.edit'), icon: Settings },
    ];

    const fetchInsight = async () => {
        setShowDailyInsight(true);
        const today = new Date().toISOString().split('T')[0];
        const cached = localStorage.getItem(`ai_insight_${today}_${language}`);
        
        if (cached) {
            try {
                setInsightData(JSON.parse(cached));
                return;
            } catch (e) {}
        }

        setIsLoadingInsight(true);
        try {
            const res = await axios.post(route('sales.insight'), { language });
            setInsightData(res.data);
            localStorage.setItem(`ai_insight_${today}_${language}`, JSON.stringify(res.data));
        } catch (error) {
            console.error('Failed to fetch insight:', error);
            setInsightData({
                trend_title: "Gagal memuat insight",
                trend_desc: "Mohon maaf, kami tidak dapat menghubungi AI saat ini.",
                tip_title: "Silakan coba lagi nanti",
                tip_desc: "Pastikan koneksi internet Anda stabil."
            });
        } finally {
            setIsLoadingInsight(false);
        }
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <>
            <div className="min-h-screen bg-jual-bg text-jual-text-main flex font-sans selection:bg-jual-green selection:text-white bg-grid-pattern relative">

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                navItems={navItems}
            />

            {/* Main Content Area */}
            <main className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full">

                {/* Topbar */}
                <Topbar toggleSidebar={toggleSidebar} />

                {/* Page Content */}
                <div className="flex-1 p-4 lg:p-8 overflow-x-hidden">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>

        </div>

            {/* Floating Action Button for Daily AI Info */}
            <button
                onClick={fetchInsight}
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:scale-110 transition-transform duration-300 z-40 group"
            >
                <Lightbulb className="w-6 h-6 text-slate-900 group-hover:animate-pulse" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
            </button>

            {/* Daily Insight Modal */}
            {showDailyInsight && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDailyInsight(false)}></div>
                    <div className="bg-jual-bg border border-jual-border rounded-3xl w-full max-w-lg relative z-10 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
                        <div className="p-6 sm:p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                        <Zap className="w-6 h-6 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-jual-text-main">Info AI Harian</h3>
                                        <p className="text-xs text-jual-text-muted">Rekomendasi khusus untuk {auth?.user?.name || 'Anda'}</p>
                                    </div>
                                </div>
                                <button onClick={() => setShowDailyInsight(false)} className="text-jual-text-muted hover:text-jual-text-main p-1">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {isLoadingInsight ? (
                                <div className="py-12 flex flex-col items-center justify-center space-y-4">
                                    <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                                    <p className="text-sm text-jual-text-muted font-bold animate-pulse">AI sedang menganalisis pasar hari ini...</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="p-4 rounded-2xl bg-jual-card border border-jual-border">
                                        <h4 className="text-sm font-bold text-emerald-500 mb-2 flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4" /> {insightData?.trend_title || "Sedang Tren"}
                                        </h4>
                                        <p className="text-sm text-jual-text-muted leading-relaxed">
                                            {insightData?.trend_desc || "Memuat..."}
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-jual-card border border-jual-border">
                                        <h4 className="text-sm font-bold text-amber-500 mb-2 flex items-center gap-2">
                                            <Sparkles className="w-4 h-4" /> {insightData?.tip_title || "Tips Hari Ini"}
                                        </h4>
                                        <p className="text-sm text-jual-text-muted leading-relaxed">
                                            {insightData?.tip_desc || "Memuat..."}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="mt-8 flex justify-end">
                                <button onClick={() => setShowDailyInsight(false)} className="px-5 py-2.5 bg-jual-input hover:bg-jual-card border border-jual-border rounded-xl text-sm font-bold text-jual-text-main transition-colors">
                                    Tutup Insight
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
