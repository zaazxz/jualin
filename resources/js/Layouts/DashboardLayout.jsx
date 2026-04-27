import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Sparkles, LayoutTemplate, BarChart3, Settings, HelpCircle, LogOut, Moon, Bell, User, Menu, X } from 'lucide-react';

export default function DashboardLayout({ children }) {
    const { url } = usePage();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'AI Generator', href: '#', icon: Sparkles },
        { name: 'Templates', href: '#', icon: LayoutTemplate },
        { name: 'Analytics', href: '#', icon: BarChart3 },
        { name: 'Settings', href: '#', icon: Settings },
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
            <aside className={`w-64 bg-jual-bg border-r border-jual-border flex flex-col fixed h-full z-40 transition-transform duration-300 ease-in-out ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}>
                {/* Logo Area */}
                <div className="h-16 lg:h-20 flex items-center justify-between px-6 border-b border-jual-border">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex flex-col">
                            <span className="text-xl font-bold italic tracking-tight leading-none">
                                <span className="text-jual-green">Jual</span>
                                <span className="text-white">Machine</span>
                            </span>
                            <span className="text-[9px] text-jual-text-muted mt-1 uppercase tracking-wider leading-none">Premium AI Engine</span>
                        </div>
                    </Link>
                    {/* Close button for mobile */}
                    <button onClick={toggleSidebar} className="lg:hidden text-jual-text-muted hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 py-6 px-3 flex flex-col gap-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = url === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group relative ${
                                    isActive 
                                    ? 'bg-jual-green/10 text-jual-green font-medium' 
                                    : 'text-jual-text-muted hover:bg-jual-card hover:text-white'
                                }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-jual-green' : 'text-jual-text-muted group-hover:text-white'}`} />
                                {item.name}
                                {isActive && (
                                    <div className="absolute left-0 w-1 h-8 bg-jual-green rounded-r-full"></div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-jual-border flex flex-col gap-1">
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-jual-text-muted hover:bg-jual-card hover:text-white transition-colors">
                        <HelpCircle className="w-5 h-5" />
                        Help Center
                    </a>
                    <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-jual-text-muted hover:bg-red-500/10 hover:text-red-400 transition-colors">
                        <LogOut className="w-5 h-5" />
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full">
                {/* Topbar */}
                <header className="h-16 bg-jual-bg/80 backdrop-blur-md border-b border-jual-border flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={toggleSidebar}
                            className="lg:hidden text-jual-text-muted hover:text-white p-1"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="text-sm text-jual-text-muted hidden sm:block">
                            Assalamu'alaikum, Akhmad
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 lg:gap-5">
                        <button className="text-jual-text-muted hover:text-white transition-colors">
                            <Moon className="w-5 h-5" />
                        </button>
                        <button className="text-jual-text-muted hover:text-white transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-jual-green rounded-full border-2 border-jual-bg"></span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-jual-card border border-jual-border flex items-center justify-center overflow-hidden ml-1 lg:ml-2 cursor-pointer ring-2 ring-transparent hover:ring-jual-green transition-all">
                            <User className="w-5 h-5 text-jual-text-muted" />
                        </div>
                    </div>
                </header>

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
