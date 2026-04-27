import React, { useEffect } from 'react';
import { X, Sparkles, Construction } from 'lucide-react';

export default function DevelopmentModal({ isOpen, onClose }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-[#070b0a]/80 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-[#0f171c] border border-[#1a272e] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 fade-in duration-300">
                {/* Top Glow Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8 text-center">
                    {/* Icon Container */}
                    <div className="mb-6 relative inline-block">
                        <div className="w-20 h-20 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 relative z-10 mx-auto">
                            <Construction className="w-10 h-10 text-emerald-500" />
                        </div>
                        {/* Pulse effect */}
                        <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full -z-10 animate-pulse"></div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">Mohon Maaf!</h3>
                    <div className="inline-flex items-center space-x-2 bg-jual-card border border-jual-border rounded-full px-3 py-1 mb-4">
                        <Sparkles className="w-3 h-3 text-[#FDE047]" />
                        <span className="text-[10px] font-bold tracking-wider text-[#FDE047] uppercase">Dalam Pengembangan</span>
                    </div>
                    
                    <p className="text-slate-400 text-sm leading-relaxed mb-8">
                        Fitur <span className="text-emerald-400 font-medium italic">Masuk dengan Google</span> saat ini sedang dalam tahap pengembangan intensif untuk memastikan keamanan dan kenyamanan Anda.
                    </p>

                    <button 
                        onClick={onClose}
                        className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-900 font-bold py-3.5 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_8px_25px_rgba(16,185,129,0.3)]"
                    >
                        Saya Mengerti
                    </button>
                </div>
            </div>
        </div>
    );
}
