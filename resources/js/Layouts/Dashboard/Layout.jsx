import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Sparkles, BarChart3, Settings, HelpCircle, LogOut, Moon, Bell, User, Menu, X, FolderOpen } from 'lucide-react';
import Sidebar from '@/Components/Dashboard/Sidebar';
import Topbar from '@/Components/Dashboard/Topbar';
import { useAppStore } from '@/store/useAppStore';

export default function Layout({ children }) {
    const { url } = usePage();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const { t, theme } = useAppStore();

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
        { name: t('analytics'), href: '#', icon: BarChart3, isModal: true },
        { name: t('settings'), href: route('profile.edit'), icon: Settings },
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
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
    );
}
