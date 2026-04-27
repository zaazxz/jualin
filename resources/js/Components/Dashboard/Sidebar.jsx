import React, { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { X } from 'lucide-react'
import { LayoutDashboard, Sparkles, LayoutTemplate, BarChart3, Settings, HelpCircle, LogOut } from 'lucide-react'
import DevelopmentModal from '@/Components/DevelopmentModal'


export default function Sidebar({ isSidebarOpen, toggleSidebar, navItems }) {
    const { url } = usePage();
    const [showDevModal, setShowDevModal] = useState(false);
    return (
        <>
            <aside className={`w-64 bg-jual-bg border-r border-jual-border flex flex-col fixed h-full z-40 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}>

                {/* Logo Area */}
                <div className="h-16 lg:h-20 flex items-center justify-between px-6 border-b border-jual-border">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex flex-col">
                            <span className="text-xl font-bold tracking-tight leading-none">
                                <span className="text-jual-green">Jual</span>
                                <span className="text-white">.in</span>
                            </span>
                            <span className="text-[9px] text-jual-text-muted mt-1 uppercase tracking-wider leading-none">One Stop Selling Solution</span>
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
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group relative ${isActive
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
                    <button 
                        onClick={() => setShowDevModal(true)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-jual-text-muted hover:bg-jual-card hover:text-white transition-colors text-left"
                    >
                        <HelpCircle className="w-5 h-5" />
                        Help Center
                    </button>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-jual-text-muted hover:bg-red-500/10 hover:text-red-400 transition-colors cursor-pointer"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </Link>
                </div>
            </aside>
            
            <DevelopmentModal 
                isOpen={showDevModal} 
                onClose={() => setShowDevModal(false)} 
            />
        </>
    )
}
