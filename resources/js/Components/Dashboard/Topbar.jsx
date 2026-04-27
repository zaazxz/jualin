import React from 'react'
import { Link } from '@inertiajs/react'
import { Moon, Bell, User, Menu } from 'lucide-react'

export default function Topbar({ toggleSidebar }) {
    return (
        <>
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
        </>
    )
}
