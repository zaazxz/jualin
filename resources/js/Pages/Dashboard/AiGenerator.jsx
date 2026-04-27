import React, { useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import { Sparkles, Wand2, MessageSquare, Globe, Zap, Target, PenTool, Loader2, LayoutTemplate, Eye, ExternalLink, CheckCircle2, Palette, ArrowRight, ArrowLeft, Download } from 'lucide-react';
import Layout from '@/Layouts/Dashboard/Layout';
import axios from 'axios';

export default function AiGenerator({ edit_sales }) {
    const [step, setStep] = useState('input'); // input, identity, template, preview
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [progressText, setProgressText] = useState('');
    const [previewContent, setPreviewContent] = useState(null);
    const [templateOptions, setTemplateOptions] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const simulateProgress = () => {
        setProgress(0);
        const intervals = [
            { threshold: 30, text: 'Menganalisis produk...', speed: 200 },
            { threshold: 60, text: 'Menyusun layout kreatif...', speed: 300 },
            { threshold: 85, text: 'Memilih palet warna...', speed: 400 },
            { threshold: 95, text: 'Finalisasi desain...', speed: 500 },
        ];

        let currentIdx = 0;
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 98) {
                    return 98;
                }
                if (prev >= intervals[currentIdx].threshold && currentIdx < intervals.length - 1) {
                    currentIdx++;
                }
                setProgressText(intervals[currentIdx].text);
                return prev + 0.2;
            });
        }, 100);
        return timer;
    };

    const { data, setData, reset, processing } = useForm({
        product_name: edit_sales?.product_name || '',
        description: edit_sales?.product_info?.description || '',
        audience: edit_sales?.product_info?.audience || '',
        tone: edit_sales?.product_info?.tone || 'Profesional',
        web_name: edit_sales?.product_info?.web_name || '',
        brand_color: edit_sales?.product_info?.brand_color || '#10b981',
        features: edit_sales?.product_info?.features || '',
        price: edit_sales?.product_info?.price || '',
    });

    const handleStartGeneration = async (e) => {
        if (e) e.preventDefault();
        setIsGenerating(true);
        const progressTimer = simulateProgress();

        try {
            const response = await axios.post(route('sales.generate'), {
                product_name: data.product_name,
                description: data.description,
                audience: data.audience,
                tone: data.tone,
                web_name: data.web_name,
                brand_color: data.brand_color,
                features: data.features,
                price: data.price
            });

            const result = response.data;
            setPreviewContent(result);
            setTemplateOptions(result.templates || []);

            if (result.templates && result.templates.length > 0) {
                let initTemplate = result.templates[0];
                if (edit_sales?.template) {
                    try {
                        const parsed = JSON.parse(edit_sales.template);
                        const matched = result.templates.find(t => t.id === parsed.id || t.id === parsed.ID);
                        if (matched) initTemplate = matched;
                    } catch (e) {}
                }
                setSelectedTemplate(initTemplate);
            }

            setProgress(100);
            setTimeout(() => setStep('template'), 500);
        } catch (error) {
            console.error('Generation failed:', error);
            const errorMsg = error.response?.data?.error || error.message;
            alert(`Gagal Generate: ${errorMsg}`);
        } finally {
            setIsGenerating(false);
            clearInterval(progressTimer);
        }
    };

    const handleSave = () => {
        const payload = {
            product_name: data.product_name,
            product_info: {
                description: data.description,
                audience: data.audience,
                tone: data.tone,
                web_name: data.web_name || previewContent?.copy?.web_name,
                brand_color: data.brand_color,
                features: data.features,
                price: data.price
            },
            generated_content: previewContent?.copy,
            html_content: previewContent?.html_content,
            template: JSON.stringify(selectedTemplate)
        };

        if (edit_sales?.id) {
            router.put(route('sales.update', edit_sales.id), payload);
        } else {
            router.post(route('sales.store'), payload);
        }
    };

    const steps = [
        { id: 'input', label: 'Info Produk' },
        { id: 'identity', label: 'Identitas Web' },
        { id: 'template', label: 'Pilih Template' },
        { id: 'preview', label: 'Download' }
    ];

    const currentStepIndex = steps.findIndex(s => s.id === step);

    return (
        <Layout>
            <Head title="AI Generator" />

            <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Stepper Header */}
                <div className="flex items-center justify-center gap-4 mb-10 overflow-x-auto py-4 scrollbar-none">
                    {steps.map((s, i) => (
                        <React.Fragment key={s.id}>
                            <div className="flex flex-col items-center gap-2 min-w-fit">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-500 ${step === s.id ? 'bg-emerald-500 text-slate-900 scale-110 shadow-[0_0_20px_rgba(16,185,129,0.3)]' :
                                        (i < currentStepIndex ? 'bg-emerald-500/20 text-emerald-500' : 'bg-jual-card border border-jual-border text-slate-500')
                                    }`}>
                                    {i < currentStepIndex ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${step === s.id ? 'text-white' : 'text-slate-600'}`}>{s.label}</span>
                            </div>
                            {i < steps.length - 1 && <div className={`w-8 md:w-12 h-[1px] mb-6 ${i < currentStepIndex ? 'bg-emerald-500/50' : 'bg-jual-border'}`}></div>}
                        </React.Fragment>
                    ))}
                </div>

                {step === 'input' && (
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-2/3 space-y-6">
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
                                        <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">Deskripsi Singkat</label>
                                        <textarea
                                            rows="2"
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            placeholder="Ceritakan detail produk Anda..."
                                            className="w-full bg-[#131d23] border border-[#1f2e36] rounded-xl px-5 py-4 text-sm text-slate-200 resize-none focus:outline-none focus:border-emerald-500/50 transition-all"
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">Fitur Utama & USP (Pisahkan Koma)</label>
                                        <textarea
                                            rows="2"
                                            value={data.features}
                                            onChange={e => setData('features', e.target.value)}
                                            placeholder="Contoh: Anti air, Garansi 1 Tahun, Desain Eksklusif"
                                            className="w-full bg-[#131d23] border border-[#1f2e36] rounded-xl px-5 py-4 text-sm text-slate-200 resize-none focus:outline-none focus:border-emerald-500/50 transition-all"
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">Harga</label>
                                            <input
                                                type="text"
                                                value={data.price}
                                                onChange={e => setData('price', e.target.value)}
                                                placeholder="Contoh: Rp 99.000"
                                                className="w-full bg-[#131d23] border border-[#1f2e36] rounded-xl px-5 py-4 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">Target Pembeli</label>
                                            <input
                                                type="text"
                                                value={data.audience}
                                                onChange={e => setData('audience', e.target.value)}
                                                placeholder="Contoh: Anak Muda"
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
                                        onClick={() => setStep('identity')}
                                        disabled={!data.product_name || !data.description}
                                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-4 px-12 rounded-2xl transition-all flex items-center gap-3 shadow-lg disabled:opacity-50"
                                    >
                                        Lanjut <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:block w-1/3">
                            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-8 sticky top-8">
                                <Zap className="w-8 h-8 text-emerald-500 mb-4" />
                                <h3 className="text-white font-bold mb-2">Langkah 1</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">Berikan detail produk Anda sespesifik mungkin agar AI dapat membuat penawaran yang sangat relevan.</p>
                            </div>
                        </div>
                    </div>
                )}

                {step === 'identity' && (
                    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="w-full lg:w-2/3 space-y-6">
                            <div className="bg-jual-card border border-jual-border rounded-3xl p-8 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
                                <h1 className="text-2xl font-bold text-white mb-2">Identitas Landing Page</h1>
                                <p className="text-slate-500 text-sm mb-8">Tentukan bagaimana brand Anda ingin dilihat.</p>

                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">Nama Website / Brand</label>
                                            <span className="text-[10px] text-slate-500">Opsional (AI akan buatkan jika kosong)</span>
                                        </div>
                                        <input
                                            type="text"
                                            value={data.web_name}
                                            onChange={e => setData('web_name', e.target.value)}
                                            placeholder="Contoh: Madep Store / OrganicBag"
                                            className="w-full bg-[#131d23] border border-[#1f2e36] rounded-xl px-5 py-4 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 transition-all"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">Warna Brand Utama</label>
                                        <div className="flex flex-wrap gap-3">
                                            {['#10b981', '#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899'].map(color => (
                                                <button
                                                    key={color}
                                                    onClick={() => setData('brand_color', color)}
                                                    className={`w-12 h-12 rounded-2xl border-2 transition-all ${data.brand_color === color ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                                    style={{ backgroundColor: color }}
                                                />
                                            ))}
                                            <div className="relative">
                                                <input
                                                    type="color"
                                                    value={data.brand_color}
                                                    onChange={e => setData('brand_color', e.target.value)}
                                                    className="w-12 h-12 rounded-2xl cursor-pointer bg-transparent border-none"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                    <Palette className="w-5 h-5 text-white/50" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 flex justify-between items-center">
                                    <button onClick={() => setStep('input')} className="flex items-center gap-2 text-slate-500 hover:text-white transition-all font-bold text-sm">
                                        <ArrowLeft className="w-4 h-4" /> Kembali
                                    </button>
                                    <button
                                        onClick={handleStartGeneration}
                                        disabled={isGenerating}
                                        className={`relative overflow-hidden h-[56px] w-[240px] transition-all duration-300 ${isGenerating ? 'bg-slate-800' : 'bg-emerald-500 hover:bg-emerald-400'} text-slate-900 font-bold rounded-xl flex items-center justify-center gap-3 shadow-lg disabled:opacity-100`}
                                    >
                                        {isGenerating ? (
                                            <div className="w-full px-6 flex flex-col items-center gap-1">
                                                <div className="w-full flex justify-between items-center text-emerald-500 text-[9px] font-black uppercase tracking-tighter">
                                                    <span className="truncate">{progressText}</span>
                                                    <span>{Math.round(progress)}%</span>
                                                </div>
                                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-emerald-500 transition-all duration-300 ease-out"
                                                        style={{ width: `${progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ) : (
                                            <>Generate Sekarang <Sparkles className="w-4 h-4" /></>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 'template' && (
                    <div className="space-y-10 animate-in fade-in duration-500">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-white mb-2">Pilih Gaya Desain</h2>
                            <p className="text-slate-500">Gemini telah menyusun 3 konsep desain terbaik untuk {data.web_name || previewContent?.copy?.web_name}.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {templateOptions.map((t) => (
                                <div
                                    key={t.id}
                                    onClick={() => setSelectedTemplate(t)}
                                    className={`cursor-pointer rounded-3xl p-6 border-2 transition-all duration-300 relative overflow-hidden group ${selectedTemplate?.id === t.id ? 'border-emerald-500 bg-emerald-500/5' : 'border-jual-border bg-jual-card hover:border-emerald-500/30'
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
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center pt-8 border-t border-jual-border">
                            <button onClick={() => setStep('identity')} className="text-slate-400 hover:text-white font-bold text-sm">Kembali</button>
                            <button onClick={() => setStep('preview')} className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-4 px-12 rounded-2xl transition-all shadow-lg">Lanjut ke Preview</button>
                        </div>
                    </div>
                )}

                {step === 'preview' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Review Hasil AI</h2>
                                <p className="text-sm text-slate-500 italic">Website: {previewContent?.copy?.web_name} | Desain: {selectedTemplate?.name}</p>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => setStep('template')} className="px-6 py-3 border border-jual-border rounded-xl text-white font-bold text-sm hover:bg-white/5 transition-all">Ganti Desain</button>
                                <button
                                    onClick={handleSave}
                                    disabled={processing}
                                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition-all disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Hasil'} <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Browser Window Mockup */}
                        <div className="rounded-3xl overflow-hidden border-[12px] border-jual-card shadow-2xl relative transition-colors duration-500" style={{ backgroundColor: selectedTemplate?.bg_color || '#ffffff' }}>
                            <div className="bg-slate-100 px-6 py-3 flex items-center justify-between border-b border-black/5">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                                </div>
                                <div className="bg-white px-4 py-1 rounded-md text-[10px] text-slate-400 font-medium w-64 truncate text-center shadow-sm">
                                    {data.product_name.toLowerCase().replace(/ /g, '-')}.html
                                </div>
                                <div className="w-10"></div>
                            </div>

                            <div 
                                className="h-[700px] overflow-y-auto scrollbar-thin transition-colors duration-500"
                                style={{ color: selectedTemplate?.text_color || '#1e293b' }}
                            >
                                {previewContent?.html_content ? (
                                    <div dangerouslySetInnerHTML={{ __html: previewContent.html_content }} />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-slate-400">
                                        Gagal merender preview. Silakan coba generate ulang.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
