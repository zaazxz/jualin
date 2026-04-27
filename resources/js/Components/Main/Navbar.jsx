import React from 'react'
import { Link } from '@inertiajs/react'

export default function Navbar() {
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
                            <a href="/#features" className="hover:text-jual-green transition-colors">Features</a>
                            <a href="/#showcase" className="hover:text-jual-green transition-colors">Showcase</a>
                            <a href="/#get-started" className="hover:text-jual-green transition-colors">Get Started</a>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/dashboard"
                                className="bg-jual-green hover:bg-jual-green-hover text-white text-sm font-semibold py-2 px-5 rounded-md transition-all shadow-[0_0_15px_rgba(0,181,122,0.3)] hover:shadow-[0_0_20px_rgba(0,181,122,0.5)]"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
