import React, { useState, useEffect } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import { Sparkles, Wand2, MessageSquare, Globe, Zap, Target, PenTool, Loader2, LayoutTemplate, Eye, ExternalLink, CheckCircle2, Palette, ArrowRight, ArrowLeft, Download, Star, AlertCircle } from 'lucide-react';
import Layout from '@/Layouts/Dashboard/Layout';
import axios from 'axios';
import { useAppStore } from '@/store/useAppStore';
import DOMPurify from 'dompurify';

export default function AiGenerator({ edit_sales, sales_count = 0 }) {
    const { t, language } = useAppStore();
    const [step, setStep] = useState('input'); // input, identity, template, preview
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [progressText, setProgressText] = useState('');
    const [previewContent, setPreviewContent] = useState(null);
    const [templateOptions, setTemplateOptions] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);

    const MAX_GENERATION = 5;
    const isLimitReached = !edit_sales && sales_count >= MAX_GENERATION;
    const remainingLimit = Math.max(0, MAX_GENERATION - sales_count);
    const resetDate = new Date();
    resetDate.setMonth(resetDate.getMonth() + 1);
    resetDate.setDate(1);
    const resetStr = resetDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long' });

    const simulateProgress = () => {
        setProgress(0);
        const intervals = [
            { threshold: 30, text: t('analyzing_product'), speed: 200 },
            { threshold: 60, text: t('designing_layout'), speed: 300 },
            { threshold: 85, text: t('choosing_colors'), speed: 400 },
            { threshold: 95, text: t('finalizing_design'), speed: 500 },
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

    const cleanText = (text) => {
        if (!text || typeof text !== 'string') return text || '';
        return text.replace(/\n\nSaran AI untuk Perbaikan:[\s\S]*$/, '').replace(/\[Saran AI\]:.*$/gm, '').trim();
    };

    const { data, setData, reset, processing } = useForm({
        product_name: edit_sales?.product_name || '',
        description: cleanText(edit_sales?.product_info?.description),
        audience: cleanText(edit_sales?.product_info?.audience),
        tone: cleanText(edit_sales?.product_info?.tone) || t('tone_pro'),
        web_name: edit_sales?.product_info?.web_name || '',
        brand_color: edit_sales?.product_info?.brand_color || '#10b981',
        features: cleanText(edit_sales?.product_info?.features),
        price: cleanText(edit_sales?.product_info?.price),
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('apply_suggestions') === 'true' && edit_sales?.generated_content?.analysis) {
                const improved = edit_sales.generated_content.analysis.improved_inputs;
                
                if (improved) {
                    const newData = { ...data };
                    let changed = false;
                    
                    const updateField = (field, text) => {
                        if (text && text !== newData[field]) {
                            newData[field] = text;
                            changed = true;
                        }
                    };

                    updateField('description', improved.description);
                    updateField('features', improved.features);
                    updateField('price', improved.price);
                    updateField('audience', improved.audience);
                    updateField('tone', improved.tone);

                    if (changed) {
                        setData(newData);
                    }
                } else if (edit_sales.generated_content.analysis.suggestions) {
                    // Fallback for legacy projects
                    setAlertMessage("Proyek ini adalah versi lama. Untuk menggunakan fitur Penulisan Ulang Otomatis, silakan klik 'Generate' satu kali terlebih dahulu untuk memperbarui data AI-nya.");
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
            }
        }
    }, [edit_sales]);

    const handleStartGeneration = async (e) => {
        if (e) e.preventDefault();
        setIsGenerating(true);
        const progressTimer = simulateProgress();

        try {
            const response = await axios.post(route('sales.generate'), {
                sales_id: edit_sales?.id,
                product_name: data.product_name,
                description: data.description,
                audience: data.audience,
                tone: data.tone,
                web_name: data.web_name,
                brand_color: data.brand_color,
                features: data.features,
                price: data.price,
                language: language
            }, { timeout: 60000 });

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
            clearInterval(progressTimer);
            setTimeout(() => {
                setIsGenerating(false);
                setStep('template');
            }, 800);
        } catch (error) {
            console.error('Generation failed:', error);
            const errorMsg = error.response?.data?.error || error.message;
            alert(`Gagal Generate: ${errorMsg}`);
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
            generated_content: previewContent?.copy ? { ...previewContent.copy, analysis: previewContent.analysis } : null,
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
        { id: 'input', label: t('product_info') },
        { id: 'identity', label: t('web_identity') },
        { id: 'template', label: t('choose_template') },
        { id: 'preview', label: t('download') }
    ];

    const currentStepIndex = steps.findIndex(s => s.id === step);

    const createPreviewIframeHtml = () => {
        if (!previewContent?.html_content) return '';
        const cleanHtml = DOMPurify.sanitize(previewContent.html_content);
        return `<!DOCTYPE html>
<html lang="${language || 'id'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;700;900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; scroll-behavior: smooth; }
        .font-serif { font-family: 'Playfair Display', serif; }
    </style>
</head>
<body style="background-color: ${selectedTemplate?.bg_color || '#ffffff'}; color: ${selectedTemplate?.text_color || '#1e293b'}; margin: 0; padding: 0; transition: all 0.5s;">
    ${cleanHtml}
</body>
</html>`;
    };

    return (
        <Layout>
            <Head title={t('ai_generator')} />

            <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                {!edit_sales && (
                    <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 border ${isLimitReached ? 'bg-red-500/10 border-red-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
                        <AlertCircle className={`w-5 h-5 flex-shrink-0 ${isLimitReached ? 'text-red-500' : 'text-emerald-500'}`} />
                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <p className="text-sm font-medium text-jual-text-main">
                                Sisa token AI Anda: <strong className={isLimitReached ? 'text-red-500' : 'text-emerald-500'}>{remainingLimit} / {MAX_GENERATION}</strong>
                            </p>
                            <p className="text-xs text-jual-text-muted">
                                Limit akan di-reset pada <strong className="text-jual-text-main">{resetStr}</strong>
                            </p>
                        </div>
                    </div>
                )}

                {/* Stepper Header */}
                <div className="flex items-center justify-center gap-4 mb-10 overflow-x-auto py-4 scrollbar-none">
                    {steps.map((s, i) => (
                        <React.Fragment key={s.id}>
                            <div className="flex flex-col items-center gap-2 min-w-fit">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-500 ${step === s.id ? 'bg-emerald-500 text-slate-900 scale-110 shadow-[0_0_20px_rgba(16,185,129,0.3)]' :
                                        (i < currentStepIndex ? 'bg-emerald-500/20 text-emerald-500' : 'bg-jual-card border border-jual-border text-jual-text-muted')
                                    }`}>
                                    {i < currentStepIndex ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${step === s.id ? 'text-jual-text-main' : 'text-jual-text-muted'}`}>{s.label}</span>
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
                                <h1 className="text-2xl font-bold text-jual-text-main mb-8">{t('what_to_sell')}</h1>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">{t('product_name')}</label>
                                        <input
                                            type="text"
                                            value={data.product_name}
                                            onChange={e => setData('product_name', e.target.value)}
                                            placeholder={t('product_name_placeholder')}
                                            className="w-full bg-jual-input border border-jual-border rounded-xl px-5 py-4 text-sm text-jual-text-main placeholder-jual-text-muted focus:outline-none focus:border-emerald-500/50 transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">{t('short_desc')}</label>
                                        <textarea
                                            rows="2"
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            placeholder={t('short_desc_placeholder')}
                                            className="w-full bg-jual-input border border-jual-border rounded-xl px-5 py-4 text-sm text-jual-text-main placeholder-jual-text-muted resize-none focus:outline-none focus:border-emerald-500/50 transition-all"
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">{t('features_usp')}</label>
                                        <textarea
                                            rows="2"
                                            value={data.features}
                                            onChange={e => setData('features', e.target.value)}
                                            placeholder={t('features_placeholder')}
                                            className="w-full bg-jual-input border border-jual-border rounded-xl px-5 py-4 text-sm text-jual-text-main placeholder-jual-text-muted resize-none focus:outline-none focus:border-emerald-500/50 transition-all"
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">{t('price')}</label>
                                            <input
                                                type="text"
                                                value={data.price}
                                                onChange={e => setData('price', e.target.value)}
                                                placeholder={t('price_placeholder')}
                                                className="w-full bg-jual-input border border-jual-border rounded-xl px-5 py-4 text-sm text-jual-text-main placeholder-jual-text-muted focus:outline-none focus:border-emerald-500/50 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">{t('target_buyer')}</label>
                                            <input
                                                type="text"
                                                value={data.audience}
                                                onChange={e => setData('audience', e.target.value)}
                                                placeholder={t('audience_placeholder')}
                                                className="w-full bg-jual-input border border-jual-border rounded-xl px-5 py-4 text-sm text-jual-text-main placeholder-jual-text-muted focus:outline-none focus:border-emerald-500/50 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">{t('copywriting_tone')}</label>
                                            <select
                                                value={data.tone}
                                                onChange={e => setData('tone', e.target.value)}
                                                className="w-full bg-jual-input border border-jual-border rounded-xl px-5 py-4 text-sm text-jual-text-main focus:outline-none focus:border-emerald-500/50 transition-all appearance-none"
                                            >
                                                <option>{t('tone_pro')}</option>
                                                <option>{t('tone_friendly')}</option>
                                                <option>{t('tone_urgency')}</option>
                                                <option>{t('tone_luxury')}</option>
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
                                        {t('next')} <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:block w-1/3">
                            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-8 sticky top-8">
                                <Zap className="w-8 h-8 text-emerald-500 mb-4" />
                                <h3 className="text-jual-text-main font-bold mb-2">{t('step_1')}</h3>
                                <p className="text-xs text-jual-text-muted leading-relaxed">{t('step_1_desc')}</p>
                            </div>
                        </div>
                    </div>
                )}

                {step === 'identity' && (
                    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="w-full lg:w-2/3 space-y-6">
                            <div className="bg-jual-card border border-jual-border rounded-3xl p-8 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
                                <h1 className="text-2xl font-bold text-jual-text-main mb-2">{t('web_identity')}</h1>
                                <p className="text-jual-text-muted text-sm mb-8">{t('web_identity_desc')}</p>

                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">Nama Website / Brand</label>
                                            <span className="text-[10px] text-jual-text-muted">{t('web_name_optional')}</span>
                                        </div>
                                        <input
                                            type="text"
                                            value={data.web_name}
                                            onChange={e => setData('web_name', e.target.value)}
                                            placeholder={t('web_name_placeholder')}
                                            className="w-full bg-jual-input border border-jual-border rounded-xl px-5 py-4 text-sm text-jual-text-main placeholder-jual-text-muted focus:outline-none focus:border-emerald-500/50 transition-all"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">{t('brand_color_label')}</label>
                                        <div className="flex flex-wrap gap-3">
                                            {['#10b981', '#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899'].map(color => (
                                                <button
                                                    key={color}
                                                    onClick={() => setData('brand_color', color)}
                                                    className={`w-12 h-12 rounded-2xl border-2 transition-all ${data.brand_color === color ? 'border-jual-text-main scale-110 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'}`}
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
                                    <button onClick={() => setStep('input')} className="flex items-center gap-2 text-jual-text-muted hover:text-jual-text-main transition-all font-bold text-sm">
                                        <ArrowLeft className="w-4 h-4" /> {t('back')}
                                    </button>
                                    <button
                                        type="submit"
                                        onClick={handleStartGeneration}
                                        disabled={isGenerating || isLimitReached}
                                        className={`flex items-center justify-center gap-2 font-bold px-8 py-3 rounded-xl transition-all ${
                                            isLimitReached ? 'bg-jual-border text-jual-text-muted cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-900 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]'
                                        }`}
                                    >
                                        {isGenerating ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>{progressText} ({Math.round(progress)}%)</span>
                                            </>
                                        ) : (
                                            <>{edit_sales ? 'Simpan & Generate Ulang' : isLimitReached ? 'Limit Habis' : t('generate_now')} {!isLimitReached && <Sparkles className="w-4 h-4" />}</>
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
                            <h2 className="text-3xl font-bold text-jual-text-main mb-2">{t('choose_design_style')}</h2>
                            <p className="text-jual-text-muted">{t('design_concepts_desc')}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {templateOptions.map((t_opt) => (
                                <div
                                    key={t_opt.id}
                                    onClick={() => setSelectedTemplate(t_opt)}
                                    className={`cursor-pointer rounded-3xl p-6 border-2 transition-all duration-300 relative overflow-hidden group ${selectedTemplate?.id === t_opt.id ? 'border-emerald-500 bg-emerald-500/5' : 'border-jual-border bg-jual-card hover:border-emerald-500/30'
                                        }`}
                                >
                                    <div
                                        className="aspect-video rounded-2xl mb-6 flex flex-col items-center justify-center relative z-10"
                                        style={{ backgroundColor: t_opt.bg_color, color: t_opt.text_color }}
                                    >
                                        <Palette className="w-10 h-10 mb-2 opacity-40" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">{t_opt.font_family}</span>
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="text-jual-text-main font-bold mb-1">{t_opt.name}</h3>
                                        <p className="text-xs text-jual-text-muted leading-relaxed">{t_opt.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center pt-8 border-t border-jual-border">
                            <button onClick={() => setStep('identity')} className="text-jual-text-muted hover:text-jual-text-main font-bold text-sm">{t('back')}</button>
                            <button onClick={() => setStep('preview')} className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-4 px-12 rounded-2xl transition-all shadow-lg">{t('next_to_preview')}</button>
                        </div>
                    </div>
                )}

                {step === 'preview' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-jual-text-main">{t('review_ai_result')}</h2>
                                <p className="text-sm text-jual-text-muted italic">Website: {previewContent?.copy?.web_name} | Desain: {selectedTemplate?.name}</p>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => setStep('template')} className="px-6 py-3 border border-jual-border rounded-xl text-jual-text-main font-bold text-sm hover:bg-jual-card transition-all">{t('change_design')}</button>
                                <button
                                    onClick={handleSave}
                                    disabled={processing}
                                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition-all disabled:opacity-50"
                                >
                                    {processing ? t('saving') : t('save_result')} <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8 items-start mt-6">
                            {/* Browser Window Mockup */}
                            <div className="flex-1 w-full rounded-3xl overflow-hidden border-[8px] sm:border-[12px] border-jual-card shadow-2xl relative transition-colors duration-500" style={{ backgroundColor: selectedTemplate?.bg_color || '#ffffff' }}>
                                <div className="bg-jual-bg px-3 md:px-6 py-3 flex items-center justify-between border-b border-jual-border">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-400"></div>
                                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-400"></div>
                                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-400"></div>
                                    </div>
                                    <div className="bg-jual-input px-3 md:px-4 py-1.5 rounded-lg text-[9px] md:text-[10px] text-jual-text-muted font-bold w-32 md:w-64 truncate text-center border border-jual-border flex-shrink-0 mx-2">
                                        {data.product_name.toLowerCase().replace(/ /g, '-')}.html
                                    </div>
                                    <div className="w-6 md:w-10"></div>
                                </div>

                                <div className="h-[500px] md:h-[700px] bg-white transition-colors duration-500">
                                    {previewContent?.html_content ? (
                                        <iframe 
                                            srcDoc={createPreviewIframeHtml()} 
                                            className="w-full h-full border-none bg-white"
                                            sandbox="allow-scripts allow-same-origin"
                                            title="AI Result Preview"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-jual-text-muted">
                                            {t('render_failed')}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Analysis Sidebar */}
                            {previewContent?.analysis && (
                                <div className="w-full lg:w-[350px] flex-shrink-0 bg-jual-card border border-jual-border rounded-3xl p-6 shadow-xl space-y-6">
                                    <div className="flex items-center justify-between bg-jual-input p-4 rounded-2xl border border-jual-border">
                                        <div className="flex items-center gap-2 text-amber-500 font-bold text-sm">
                                            <Star className="w-5 h-5 fill-amber-500" /> Skor AI
                                        </div>
                                        <div className="text-2xl font-black text-jual-text-main">{previewContent.analysis.score}<span className="text-xs text-jual-text-muted">/100</span></div>
                                    </div>
                                    
                                    <div>
                                        <h3 className="font-bold text-lg text-jual-text-main flex items-center gap-2 mb-4"><Sparkles className="w-5 h-5 text-amber-500" /> Saran Peningkatan AI</h3>
                                        <div className="space-y-4">
                                            {previewContent.analysis.suggestions.map((sug, idx) => (
                                                <div key={idx} className="bg-jual-bg border border-jual-border p-4 rounded-2xl flex items-start gap-3 transition-colors hover:border-emerald-500/30">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                                                    <p className="text-sm text-jual-text-muted leading-relaxed">{sug}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-emerald-500/5 border border-emerald-500/20 p-5 rounded-2xl mt-6 relative overflow-hidden group">
                                        <div className="absolute -right-4 -top-4 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all"></div>
                                        <h4 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2">Status Optimasi</h4>
                                        <p className="text-xs text-jual-text-muted leading-relaxed">Terapkan saran AI ini pada copywriting dan struktur halaman untuk meningkatkan rasio konversi Anda secara signifikan.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Alert Modal */}
            {alertMessage && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setAlertMessage(null)}></div>
                    <div className="bg-jual-bg border border-jual-border rounded-3xl w-full max-w-sm relative z-10 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-6 text-center">
                            <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20 mb-4 mx-auto">
                                <AlertCircle className="w-6 h-6 text-amber-500" />
                            </div>
                            <h3 className="text-xl font-bold text-jual-text-main mb-2">Pemberitahuan</h3>
                            <p className="text-sm text-jual-text-muted mb-6 leading-relaxed">
                                {alertMessage}
                            </p>
                            <button
                                onClick={() => setAlertMessage(null)}
                                className="w-full py-2.5 bg-jual-input hover:bg-jual-card border border-jual-border rounded-xl text-sm font-bold text-jual-text-main transition-colors"
                            >
                                Mengerti
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
