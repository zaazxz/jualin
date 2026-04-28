import React from 'react'

export default function Footer() {
    return (
        <>
            <footer className="border-t border-jual-border py-8 bg-jual-bg-alt">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-jual-text-muted">
                    <div>
                        <span className="font-bold italic tracking-tight text-lg mb-1 block">
                            <span className="text-jual-green">Jual</span>
                            <span className="text-jual-text-main">.In</span>
                        </span>
                        <p>© 2026 Jual.In. Made with Love by Zaazxz</p>
                    </div>
                    <div className="flex gap-6 uppercase tracking-wider">
                        <a href="https://github.com/zaazxz" className="hover:text-jual-green transition-colors">About Me</a>
                        <a href="https://mirza-portfolio-v1.netlify.app" className="hover:text-jual-green transition-colors">Portfolio</a>
                        <a href="mailto:mirzaqamaruzzaman18@gmail.com" className="hover:text-jual-green transition-colors">Contact Support</a>
                    </div>
                </div>
            </footer>
        </>
    )
}
