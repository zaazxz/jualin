import React, { useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import { Sparkles, Wand2, MessageSquare, Globe, Zap, Target, PenTool, Loader2, LayoutTemplate, Eye, ExternalLink, CheckCircle2, Palette } from 'lucide-react';
import Layout from '@/Layouts/Dashboard/Layout';
import axios from 'axios';

export default function AiGenerator() {
    const [step, setStep] = useState('input'); // input, template, preview
    const [isGenerating, setIsGenerating] = useState(false);
    const [previewContent, setPreviewContent] = useState(null);
    const [templateOptions, setTemplateOptions] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const { data, setData, reset, processing } = useForm({
        product_name: '',
        description: '',
        audience: '',
        tone: 'Profesional & Percaya Diri',
        features: '',
        price: '',
    });

    const handleStartGeneration = async (e) => {
        e.preventDefault();
        setIsGenerating(true);

        try {
            const response = await axios.post(route('sales.generate'), {
                product_name: data.product_name,
                description: data.description,
                audience: data.audience,
                tone: data.tone
            });

            const { copy, templates } = response.data;
            setPreviewContent(copy);
            setTemplateOptions(templates);
            
            // Auto-select first template
            if (templates.length > 0) {
                setSelectedTemplate(templates[0]);
            }

            setStep('template');
        } catch (error) {
            console.error('Generation failed:', error);
            alert('Maaf, terjadi kesalahan saat menghubungi AI. Silakan coba lagi.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSaveAndPublish = () => {
        router.post(route('sales.store'), {
            product_name: data.product_name,
            product_info: {
                description: data.description,
                audience: data.audience,
                tone: data.tone,
                features: data.features,
                price: data.price
            },
            generated_content: previewContent,
            template: JSON.stringify(selectedTemplate)
        });
    };

    return (
        <Layout>
            <Head title="AI Generator" />

            <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Stepper Header */}
                <div className="flex items-center justify-center gap-4 mb-10">
                    {[
                        { id: 'input', label: 'Info Produk' },
                        { id: 'template', label: 'Pilih Template' },
                        { id: 'preview', label: 'Preview & Simpan' }
                    ].map((s, i) => (
                        <React.Fragment key={s.id}>
                            <div className="flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-500 ${
                                    step === s.id ? 'bg-emerald-500 text-slate-900 scale-110 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 
                                    (i < (step === 'input' ? 0 : step === 'template' ? 1 : 2) ? 'bg-emerald-500/20 text-emerald-500' : 'bg-jual-card border border-jual-border text-slate-500')
                                }`}>
                                    {i < (step === 'input' ? 0 : step === 'template' ? 1 : 2) ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${step === s.id ? 'text-white' : 'text-slate-600'}`}>{s.label}</span>
                            </div>
                            {i < 2 && <div className="w-12 h-[1px] bg-jual-border mb-6"></div>}
                        </React.Fragment>
                    ))}
                </div>

                {step === 'input' && (
                    <div className="flex flex-col lg:flex-row gap-8">
                        <form onSubmit={handleStartGeneration} className="w-full lg:w-2/3 space-y-6">
                            <div className="bg-jual-card border border-jual-border rounded-3xl p-8 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
                                <h1 className="text-2xl font-bold text-white mb-8">Apa yang ingin Anda jual?</h1>
                                
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">Nama Produk</label>
                                        <input 
                                            type="text" 
                                            value={data.product_name}
                                            onChange={e => setData('product_name', e.target.value)}
                                            placeholder="Contoh: Kantong Kresek Organik"
                                            className="w-full bg-[#131d23] border border-[#1f2e36] rounded-xl px-5 py-4 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">Deskripsi & Keunggulan</label>
                                        <textarea 
                                            rows="4"
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            placeholder="Ceritakan detail produk Anda..."
                                            className="w-full bg-[#131d23] border border-[#1f2e36] rounded-xl px-5 py-4 text-sm text-slate-200 resize-none focus:outline-none focus:border-emerald-500/50 transition-all"
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">Target Pembeli</label>
                                            <input 
                                                type="text" 
                                                value={data.audience}
                                                onChange={e => setData('audience', e.target.value)}
                                                placeholder="Contoh: Ibu Rumah Tangga"
                                                className="w-full bg-[#131d23] border border-[#1f2e36] rounded-xl px-5 py-4 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">Tone Copywriting</label>
                                            <select 
                                                value={data.tone}
                                                onChange={e => setData('tone', e.target.value)}
                                                className="w-full bg-[#131d23] border border-[#1f2e36] rounded-xl px-5 py-4 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 transition-all appearance-none"
                                            >
                                                <option>Profesional</option>
                                                <option>Ramah & Santai</option>
                                                <option>Urgensi (FOMO)</option>
                                                <option>Mewah & Eksklusif</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 flex justify-end">
                                    <button 
                                        disabled={isGenerating}
                                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-4 px-12 rounded-2xl transition-all flex items-center gap-3 shadow-lg disabled:opacity-50"
                                    >
                                        {isGenerating ? <>Memanggil Gemini... <Loader2 className="animate-spin w-4 h-4" /></> : <>Bikin Copywriting AI <Sparkles className="w-4 h-4" /></>}
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="hidden lg:block w-1/3">
                            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-8 sticky top-8">
                                <Zap className="w-8 h-8 text-emerald-500 mb-4" />
                                <h3 className="text-white font-bold mb-2">Gemini 1.5 Flash</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">Kami menggunakan model AI terbaru untuk memastikan copywriting dan pilihan desain Anda benar-benar unik dan persuasif.</p>
                            </div>
                        </div>
                    </div>
                )}

                {step === 'template' && (
                    <div className="space-y-10 animate-in fade-in duration-500">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-white mb-2">Pilihan Template Khusus</h2>
                            <p className="text-slate-500">Gemini telah merekomendasikan gaya desain berikut untuk {data.product_name}.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {templateOptions.map((t) => (
                                <div 
                                    key={t.id}
                                    onClick={() => setSelectedTemplate(t)}
                                    className={`cursor-pointer rounded-3xl p-6 border-2 transition-all duration-300 relative overflow-hidden group ${
                                        selectedTemplate?.id === t.id ? 'border-emerald-500 bg-emerald-500/5' : 'border-jual-border bg-jual-card hover:border-emerald-500/30'
                                    }`}
                                >
                                    <div 
                                        className="aspect-video rounded-2xl mb-6 flex flex-col items-center justify-center relative z-10"
                                        style={{ backgroundColor: t.bg_color, color: t.text_color }}
                                    >
                                        <Palette className="w-10 h-10 mb-2 opacity-40" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">{t.font_family}</span>
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="text-white font-bold mb-1">{t.name}</h3>
                                        <p className="text-xs text-slate-500 leading-relaxed">{t.desc}</p>
                                    </div>
                                    
                                    {/* Color Indicator Dots */}
                                    <div className="mt-4 flex gap-2">
                                        <div className="w-3 h-3 rounded-full border border-white/10" style={{ backgroundColor: t.bg_color }}></div>
                                        <div className="w-3 h-3 rounded-full border border-white/10" style={{ backgroundColor: t.accent_color }}></div>
                                        <div className="w-3 h-3 rounded-full border border-white/10" style={{ backgroundColor: t.text_color }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center pt-8 border-t border-jual-border">
                            <button onClick={() => setStep('input')} className="text-slate-400 hover:text-white font-bold text-sm">Kembali</button>
                            <button onClick={() => setStep('preview')} className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-4 px-12 rounded-2xl transition-all shadow-lg">Lanjut ke Preview</button>
                        </div>
                    </div>
                )}

                {step === 'preview' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Review Hasil AI</h2>
                                <p className="text-sm text-slate-500 italic">Desain: {selectedTemplate?.name}</p>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => setStep('template')} className="px-6 py-3 border border-jual-border rounded-xl text-white font-bold text-sm hover:bg-white/5 transition-all">Ganti Desain</button>
                                <button 
                                    onClick={handleSaveAndPublish} 
                                    disabled={processing}
                                    className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan & Publish'} <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Iframe-like Preview Window */}
                        <div 
                            className="rounded-3xl overflow-hidden border-[12px] border-jual-card shadow-2xl relative group"
                            style={{ backgroundColor: selectedTemplate?.bg_color || '#ffffff' }}
                        >
                            <div className="bg-slate-100/10 backdrop-blur-md px-6 py-3 flex items-center justify-between border-b border-black/5">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-400/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-emerald-400/50"></div>
                                </div>
                                <div className="bg-white/20 backdrop-blur-xl px-4 py-1 rounded-md text-[10px] text-white/40 font-medium w-64 truncate text-center">
                                    preview.jual.in/{data.product_name.toLowerCase().replace(/ /g, '-')}
                                </div>
                                <div className="w-10"></div>
                            </div>
                            
                            <div className="h-[600px] overflow-y-auto scrollbar-thin">
                                <div className="p-12 text-center" style={{ color: selectedTemplate?.text_color || '#1e293b' }}>
                                    <div className="max-w-2xl mx-auto space-y-6">
                                        <h1 className="text-4xl font-black leading-tight" style={{ fontFamily: selectedTemplate?.font_family }}>
                                            {previewContent?.headline}
                                        </h1>
                                        <p className="text-lg opacity-80 leading-relaxed">{previewContent?.subheadline}</p>
                                        <div className="pt-6">
                                            <button 
                                                className="font-bold py-4 px-10 rounded-2xl shadow-xl transition-transform hover:scale-105"
                                                style={{ backgroundColor: selectedTemplate?.accent_color, color: selectedTemplate?.bg_color }}
                                            >
                                                {previewContent?.cta}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-20 grid grid-cols-3 gap-6">
                                        {previewContent?.benefits.map((b, i) => (
                                            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left">
                                                <CheckCircle2 className="w-6 h-6 mb-4" style={{ color: selectedTemplate?.accent_color }} />
                                                <h4 className="font-bold text-sm mb-2">{b}</h4>
                                                <p className="text-[10px] opacity-60 leading-relaxed">Analisis AI memastikan poin ini sangat persuasif untuk pembeli Anda.</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
