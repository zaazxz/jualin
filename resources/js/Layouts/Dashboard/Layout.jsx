import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Sparkles, LayoutTemplate, BarChart3, Settings, HelpCircle, LogOut, Moon, Bell, User, Menu, X } from 'lucide-react';
import Sidebar from '@/Components/Dashboard/Sidebar';
import Topbar from '@/Components/Dashboard/Topbar';

export default function Layout({ children }) {
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
