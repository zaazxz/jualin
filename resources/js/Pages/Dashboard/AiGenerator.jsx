import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Sparkles, Send, Wand2, MessageSquare, Image, Globe, ChevronRight, Zap, Target, PenTool } from 'lucide-react';
import Layout from '@/Layouts/Dashboard/Layout';

export default function AiGenerator() {
    const [step, setStep] = useState(1);

    return (
        <Layout>
            <Head title="AI Generator" />

            <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Left Side: Input Form */}
                <div className="w-full lg:w-2/3 space-y-6">
                    <div className="bg-jual-card border border-jual-border rounded-2xl p-6 sm:p-8 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
                        
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                                <Sparkles className="w-6 h-6 text-emerald-500" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">AI Sales Page Generator</h1>
                                <p className="text-sm text-jual-text-muted">Jelaskan produk Anda, biarkan AI kami bekerja.</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Step Indicator */}
                            <div className="flex items-center gap-2 mb-8">
                                {[1, 2, 3].map((s) => (
                                    <div 
                                        key={s}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'w-12 bg-emerald-500' : 'w-4 bg-jual-border'}`}
                                    ></div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">Nama Produk / Layanan</label>
                                    <input 
                                        type="text" 
                                        placeholder="Contoh: Premium Oud Fragrance"
                                        className="w-full bg-[#131d23] border border-[#1f2e36] rounded-xl px-5 py-3.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">Deskripsi Singkat & Manfaat Utama</label>
                                    <textarea 
                                        rows="4"
                                        placeholder="Ceritakan apa yang membuat produk Anda spesial..."
                                        className="w-full bg-[#131d23] border border-[#1f2e36] rounded-xl px-5 py-3.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 resize-none"
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">Target Audience</label>
                                        <div className="relative group">
                                            <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                            <input 
                                                type="text" 
                                                placeholder="Contoh: Pengusaha Muda"
                                                className="w-full bg-[#131d23] border border-[#1f2e36] rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">Tone of Voice</label>
                                        <div className="relative group">
                                            <PenTool className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                            <select className="w-full bg-[#131d23] border border-[#1f2e36] rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 appearance-none">
                                                <option>Profesional & Percaya Diri</option>
                                                <option>Ramah & Santai</option>
                                                <option>Mewah & Eksklusif</option>
                                                <option>Urgensi & Agresif</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-between items-center">
                                <button className="text-sm font-bold text-jual-text-muted hover:text-white transition-colors">
                                    Reset Form
                                </button>
                                <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3.5 px-10 rounded-xl transition-all duration-300 flex items-center gap-3 shadow-[0_4px_20px_rgba(16,185,129,0.2)]">
                                    Generate Copywriting
                                    <Wand2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* AI Capabilities Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-[#131d23]/50 border border-jual-border rounded-xl p-4 flex flex-col items-center text-center group hover:border-emerald-500/30 transition-colors">
                            <Zap className="w-6 h-6 text-yellow-500 mb-2" />
                            <h4 className="text-xs font-bold text-white uppercase tracking-tighter">Fast Generation</h4>
                            <p className="text-[10px] text-jual-text-muted mt-1">Selesai dalam &lt; 30 detik</p>
                        </div>
                        <div className="bg-[#131d23]/50 border border-jual-border rounded-xl p-4 flex flex-col items-center text-center group hover:border-emerald-500/30 transition-colors">
                            <Globe className="w-6 h-6 text-blue-500 mb-2" />
                            <h4 className="text-xs font-bold text-white uppercase tracking-tighter">SEO Optimized</h4>
                            <p className="text-[10px] text-jual-text-muted mt-1">Siap untuk Google</p>
                        </div>
                        <div className="bg-[#131d23]/50 border border-jual-border rounded-xl p-4 flex flex-col items-center text-center group hover:border-emerald-500/30 transition-colors">
                            <Image className="w-6 h-6 text-purple-500 mb-2" />
                            <h4 className="text-xs font-bold text-white uppercase tracking-tighter">Auto Graphics</h4>
                            <p className="text-[10px] text-jual-text-muted mt-1">Asset visual otomatis</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Preview / Info */}
                <div className="w-full lg:w-1/3 space-y-6">
                    <div className="bg-jual-card border border-jual-border rounded-2xl p-6 relative overflow-hidden group min-h-[300px] flex flex-col items-center justify-center text-center border-dashed border-2 border-emerald-500/20">
                        <div className="w-16 h-16 bg-[#131d23] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <MessageSquare className="w-6 h-6 text-slate-600" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Belum Ada Preview</h3>
                        <p className="text-xs text-jual-text-muted max-w-[200px]">Isi detail produk di samping untuk melihat preview copywriting.</p>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden">
                        <Sparkles className="absolute -top-4 -right-4 w-24 h-24 text-emerald-500/5 rotate-12" />
                        <h4 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
                            <Zap className="w-4 h-4" /> Tips Jitu
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex gap-3">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                                <p className="text-[11px] text-slate-300 leading-relaxed">Gunakan kata kerja yang kuat seperti "Transformasi", "Melejitkan", atau "Dominasi".</p>
                            </li>
                            <li className="flex gap-3">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                                <p className="text-[11px] text-slate-300 leading-relaxed">Sebutkan angka spesifik (Contoh: "Hemat 45 menit sehari") untuk meningkatkan trust.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
