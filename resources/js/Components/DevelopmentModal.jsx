import React, { useEffect } from 'react';
import { X, Sparkles, Construction } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export default function DevelopmentModal({ isOpen, onClose }) {
    const { t } = useAppStore();

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
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-jual-card border border-jual-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
                {/* Top Glow Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-jual-text-muted hover:text-jual-text-main transition-colors"
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
                        <div className="absolute inset-0 bg-emerald-500/10 blur-2xl rounded-full -z-10 animate-pulse"></div>
                    </div>

                    <h3 className="text-xl font-bold text-jual-text-main mb-3">{t('feature_under_development_title')}</h3>
                    <div className="inline-flex items-center space-x-2 bg-jual-input border border-jual-border rounded-full px-3 py-1 mb-4">
                        <Sparkles className="w-3 h-3 text-emerald-500" />
                        <span className="text-[10px] font-bold tracking-wider text-emerald-500 uppercase">{t('coming_soon')}</span>
                    </div>
                    
                    <p className="text-jual-text-muted text-sm leading-relaxed mb-8">
                        {t('feature_dev_desc').split(t('intensive_development')).map((part, i, arr) => (
                            <React.Fragment key={i}>
                                {part}
                                {i < arr.length - 1 && <span className="text-emerald-500 font-medium italic">{t('intensive_development')}</span>}
                            </React.Fragment>
                        ))}
                    </p>

                    <button 
                        onClick={onClose}
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3.5 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(16,185,129,0.2)]"
                    >
                        {t('i_understand')}
                    </button>
                </div>
            </div>
        </div>
    );
}
