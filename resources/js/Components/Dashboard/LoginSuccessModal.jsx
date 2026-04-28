import React, { useEffect } from 'react';
import { X, CheckCircle2, PartyPopper, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export default function LoginSuccessModal({ isOpen, onClose, userName }) {
    const { t } = useAppStore();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Auto close after 5 seconds
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-500"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-sm bg-jual-card border border-jual-border rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
                {/* Top Glow Decor */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-jual-text-muted hover:text-jual-text-main transition-colors p-1"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="p-8 text-center">
                    {/* Icon Container */}
                    <div className="mb-6 relative inline-block">
                        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 relative z-10 mx-auto">
                            <PartyPopper className="w-10 h-10 text-emerald-500" />
                        </div>
                        {/* Animated background circles */}
                        <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full -z-10 animate-pulse"></div>
                    </div>

                    <h3 className="text-2xl font-bold text-jual-text-main mb-2">{t('login_success_title')}</h3>
                    <p className="text-jual-text-muted text-sm leading-relaxed mb-8">
                        {t('welcome')}, <span className="text-emerald-500 font-bold">{userName}</span>. {t('happy_to_see_you')}
                    </p>

                    <button 
                        onClick={onClose}
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3.5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_4px_20px_rgba(16,185,129,0.2)]"
                    >
                        {t('enter_dashboard')}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    {/* Auto-close progress bar */}
                    <div className="absolute bottom-0 left-0 h-1 bg-emerald-500/20 w-full overflow-hidden">
                        <div className="h-full bg-emerald-500 animate-progress-shrink origin-left"></div>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                @keyframes progress-shrink {
                    from { transform: scaleX(1); }
                    to { transform: scaleX(0); }
                }
                .animate-progress-shrink {
                    animation: progress-shrink 5s linear forwards;
                }
            `}</style>
        </div>
    );
}
