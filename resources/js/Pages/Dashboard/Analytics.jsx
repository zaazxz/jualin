import React from 'react';
import { Head } from '@inertiajs/react';
import { BarChart3, TrendingUp, Users, ShoppingCart, ArrowUpRight, ArrowDownRight, Calendar, Download, MousePointerClick, Globe2 } from 'lucide-react';
import Layout from '@/Layouts/Dashboard/Layout';
import { useAppStore } from '@/store/useAppStore';

export default function Analytics() {
    const { t } = useAppStore();

    return (
        <Layout>
            <Head title={t('analytics')} />

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                                <BarChart3 className="w-5 h-5 text-emerald-500" />
                            </div>
                            <h1 className="text-2xl font-bold text-jual-text-main">{t('performance_analytics')}</h1>
                        </div>
                        <p className="text-sm text-jual-text-muted">{t('performance_desc')}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="bg-jual-input border border-jual-border px-4 py-2.5 rounded-xl text-sm font-medium text-jual-text-muted flex items-center gap-2 hover:border-emerald-500/30 transition-colors">
                            <Calendar className="w-4 h-4" /> {t('last_30_days')}
                        </button>
                        <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all shadow-[0_4px_15px_rgba(16,185,129,0.2)]">
                            <Download className="w-4 h-4" /> {t('export')}
                        </button>
                    </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {[
                        { label: t('total_revenue'), value: 'Rp 42.5M', growth: '+12.5%', up: true, icon: TrendingUp, color: 'text-emerald-500' },
                        { label: t('total_traffic'), value: '84.2k', growth: '+5.2%', up: true, icon: Users, color: 'text-blue-500' },
                        { label: t('conversion_rate'), value: '3.42%', growth: '-0.8%', up: false, icon: MousePointerClick, color: 'text-purple-500' },
                        { label: t('sales_order'), value: '1,240', growth: '+18.4%', up: true, icon: ShoppingCart, color: 'text-orange-500' },
                    ].map((m, i) => (
                        <div key={i} className="bg-jual-card border border-jual-border rounded-2xl p-6 relative overflow-hidden group">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-10 h-10 rounded-xl bg-jual-input border border-jual-border flex items-center justify-center ${m.color}`}>
                                    <m.icon className="w-5 h-5" />
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-bold ${m.up ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {m.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                    {m.growth}
                                </div>
                            </div>
                            <h4 className="text-xs font-bold text-jual-text-muted uppercase tracking-widest mb-1">{m.label}</h4>
                            <div className="text-2xl font-black text-jual-text-main">{m.value}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Traffic Chart Placeholder */}
                    <div className="lg:col-span-2 bg-jual-card border border-jual-border rounded-3xl p-8 relative overflow-hidden">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-lg font-bold text-jual-text-main">{t('sales_chart')}</h3>
                            <div className="flex gap-2">
                                <span className="flex items-center gap-1.5 text-xs text-jual-text-muted">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div> {t('sales')}
                                </span>
                                <span className="flex items-center gap-1.5 text-xs text-jual-text-muted">
                                    <div className="w-2 h-2 rounded-full bg-jual-border"></div> {t('target')}
                                </span>
                            </div>
                        </div>
                        
                        {/* Mock Chart Visualization */}
                        <div className="h-[300px] w-full flex items-end gap-3 px-2">
                            {[40, 65, 45, 90, 75, 55, 80, 60, 95, 70, 85, 100].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                    <div className="w-full relative">
                                        <div 
                                            className="w-full bg-emerald-500/10 group-hover:bg-emerald-500/20 rounded-t-lg transition-all duration-500 border-x border-t border-emerald-500/20" 
                                            style={{ height: `${h}%` }}
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-jual-card text-jual-text-main text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm border border-jual-border">
                                                {h} {t('million')}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-jual-text-muted font-bold">{i + 1} Apr</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Device / Source */}
                    <div className="bg-jual-card border border-jual-border rounded-3xl p-8">
                        <h3 className="text-lg font-bold text-jual-text-main mb-6">{t('traffic_source')}</h3>
                        <div className="space-y-6">
                            {[
                                { name: t('google_search'), icon: Globe2, value: '45%', color: 'bg-blue-500' },
                                { name: t('direct_traffic'), icon: MousePointerClick, value: '30%', color: 'bg-emerald-500' },
                                { name: t('social_media'), icon: Users, value: '25%', color: 'bg-purple-500' },
                            ].map((s, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-3 text-jual-text-muted">
                                            <s.icon className="w-4 h-4" /> {s.name}
                                        </div>
                                        <span className="font-bold text-jual-text-main">{s.value}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-jual-bg-alt rounded-full overflow-hidden border border-jual-border/50">
                                        <div className={`h-full ${s.color}`} style={{ width: s.value }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                            <p className="text-[11px] text-emerald-400 font-bold uppercase tracking-widest mb-1">{t('ai_recommendation')}</p>
                            <p className="text-xs text-jual-text-muted leading-relaxed italic">
                                "{t('ai_rec_desc')}"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
