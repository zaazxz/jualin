import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Check, ArrowRight, Zap, Mail, Globe, MessageSquare, Star, Award, TrendingUp, Sparkles } from 'lucide-react';

export default function Preview({ sales }) {
    const { product_name, generated_content, product_info } = sales;
    
    const content = generated_content || {};
    const template = sales.template ? (typeof sales.template === 'string' ? JSON.parse(sales.template) : sales.template) : {
        id: 't1',
        bg_color: '#ffffff',
        text_color: '#1e293b',
        accent_color: product_info.brand_color || '#10b981',
        font_family: 'Sans'
    };

    const webName = product_info.web_name || content.web_name || product_name.toUpperCase();
    const brandColor = product_info.brand_color || template.accent_color;
    const isDark = template.bg_color === '#1a1a2e' || template.bg_color.includes('1e') || template.bg_color.includes('111');

    // Jika ada HTML dinamis dari AI, gunakan itu sebagai layout utama
    if (sales.html_content) {
        return (
            <div 
                className="min-h-screen transition-colors duration-500" 
                style={{ backgroundColor: template.bg_color, color: template.text_color }}
            >
                <Head title={content.headline || product_name} />
                <div dangerouslySetInnerHTML={{ __html: sales.html_content }} />
            </div>
        );
    }

    // Custom CSS for Fonts
    const fontStyles = template.font_family === 'Serif' 
        ? { fontFamily: "'Playfair Display', serif" } 
        : { fontFamily: "'Inter', sans-serif" };

    // Common Components
    const Button = ({ children, className = "" }) => (
        <button 
            className={`font-black py-4 px-10 rounded-2xl transition-all shadow-xl hover:-translate-y-1 active:translate-y-0 ${className}`}
            style={{ backgroundColor: brandColor, color: template.bg_color }}
        >
            {children}
        </button>
    );

    // LAYOUT 1: MODERN EXECUTIVE (Split Layout)
    const LayoutModern = () => (
        <div className="min-h-screen">
            <section className="pt-40 pb-24 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest" style={{ backgroundColor: brandColor + '20', color: brandColor }}>
                        <Zap className="w-3.5 h-3.5 fill-current" /> Premium Quality
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95]" style={fontStyles}>
                        {content.headline}
                    </h1>
                    <p className="text-xl opacity-70 leading-relaxed max-w-xl">
                        {content.subheadline}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                        <Button>{content.cta}</Button>
                        <div className="flex items-center gap-3 opacity-60">
                            <TrendingUp className="w-5 h-5" />
                            <span className="text-sm font-bold">1.2k+ Terjual Bulan Ini</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 w-full relative animate-in fade-in zoom-in duration-1000">
                    <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 bg-slate-200">
                        <img src={content.hero_image} className="w-full h-full object-cover" alt="hero" />
                    </div>
                </div>
            </section>

            <section className="py-32 px-6 bg-black/5">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                    {content.benefits?.map((b, i) => (
                        <div key={i} className="space-y-6">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: brandColor }}>
                                <Check className="w-6 h-6" style={{ color: template.bg_color }} />
                            </div>
                            <h3 className="text-2xl font-bold">{b}</h3>
                            <p className="opacity-60 text-sm leading-relaxed">Analisis cerdas kami membuktikan keunggulan ini sangat krusial bagi kesuksesan Anda.</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );

    // LAYOUT 2: MINIMALIST (Centered Layout)
    const LayoutMinimalist = () => (
        <div className="min-h-screen">
            <section className="pt-48 pb-32 px-6 text-center max-w-4xl mx-auto space-y-10">
                <div className="mx-auto w-20 h-1 rounded-full" style={{ backgroundColor: brandColor }}></div>
                <h1 className="text-5xl md:text-7xl font-light tracking-tight" style={fontStyles}>
                    {content.headline}
                </h1>
                <p className="text-xl opacity-60 leading-relaxed max-w-2xl mx-auto font-light italic">
                    {content.subheadline}
                </p>
                <div className="pt-6">
                    <Button className="rounded-full px-16">{content.cta}</Button>
                </div>
                <div className="pt-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <img src={content.hero_image} className="w-full rounded-3xl shadow-lg border border-black/5" alt="hero" />
                </div>
            </section>

            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div className="space-y-12">
                        <h2 className="text-4xl font-bold tracking-tight">Kelebihan yang Nyata.</h2>
                        <div className="space-y-8">
                            {content.benefits?.map((b, i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <div className="mt-1 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ border: `2px solid ${brandColor}` }}>
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: brandColor }}></div>
                                    </div>
                                    <p className="text-lg opacity-80">{b}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-black/5 aspect-video rounded-3xl flex items-center justify-center p-12">
                         <blockquote className="text-2xl font-light italic opacity-60 text-center">
                            "Kualitas adalah satu-satunya standar yang tidak pernah kami tinggalkan."
                         </blockquote>
                    </div>
                </div>
            </section>
        </div>
    );

    // LAYOUT 3: CLASSIC PREMIUM (Elegant Serif)
    const LayoutClassic = () => (
        <div className="min-h-screen overflow-x-hidden">
            <section className="relative pt-40 pb-40 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-7 space-y-10 relative z-10">
                        <span className="text-sm font-bold uppercase tracking-[0.3em] opacity-40">ESTABLISHED 2026</span>
                        <h1 className="text-6xl md:text-[5.5rem] font-medium leading-[1.05]" style={fontStyles}>
                            {content.headline}
                        </h1>
                        <div className="w-32 h-px opacity-30 bg-current"></div>
                        <p className="text-2xl opacity-60 font-light leading-relaxed max-w-xl">
                            {content.subheadline}
                        </p>
                        <div className="pt-4">
                            <button className="border-b-2 border-current pb-2 font-bold hover:opacity-50 transition-opacity">
                                {content.cta} <ArrowRight className="inline ml-2 w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="lg:col-span-5 relative">
                        <div className="absolute -inset-10 bg-black/5 rounded-full blur-3xl opacity-50"></div>
                        <div className="relative aspect-[3/4] rounded-t-full overflow-hidden shadow-2xl border-8 border-white/10">
                            <img src={content.hero_image} className="w-full h-full object-cover" alt="hero" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-40 bg-white/5 backdrop-blur-md border-y border-black/5">
                <div className="max-w-5xl mx-auto text-center space-y-20">
                    <h2 className="text-4xl font-light italic" style={fontStyles}>The {webName} Standard</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {content.benefits?.map((b, i) => (
                            <div key={i} className="space-y-6">
                                <Award className="w-10 h-10 mx-auto opacity-30" />
                                <h3 className="text-xl font-bold tracking-tight uppercase">{b}</h3>
                                <p className="text-xs opacity-50 leading-loose px-4">Diciptakan dengan presisi tinggi menggunakan standar industri internasional terbaru.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );

    return (
        <div 
            className="min-h-screen selection:bg-opacity-30 transition-colors duration-1000" 
            style={{ 
                backgroundColor: template.bg_color, 
                color: template.text_color,
                '--brand-color': brandColor
            }}
        >
            <Head title={content.headline || product_name} />
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;700;900&display=swap" rel="stylesheet" />

            {/* Global Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 border-b border-black/5 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                    <span className="text-2xl font-black tracking-tighter" style={{ color: brandColor, ...fontStyles }}>
                        {webName}
                    </span>
                    <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] opacity-50">
                        <a href="#" className="hover:opacity-100 transition-opacity">Collection</a>
                        <a href="#" className="hover:opacity-100 transition-opacity">Concept</a>
                        <a href="#" className="hover:opacity-100 transition-opacity">Contact</a>
                    </div>
                    <button 
                        className="font-black py-2.5 px-8 rounded-full transition-all text-xs tracking-widest uppercase shadow-lg border-2"
                        style={{ borderColor: brandColor, color: isDark ? '#fff' : brandColor }}
                    >
                        {content.cta}
                    </button>
                </div>
            </nav>

            {/* Render Layout based on ID */}
            {template.id === 't1' && <LayoutModern />}
            {template.id === 't2' && <LayoutMinimalist />}
            {template.id === 't3' && <LayoutClassic />}
            {!['t1','t2','t3'].includes(template.id) && <LayoutModern />}

            {/* Footer */}
            <footer className="py-32 px-6 border-t border-black/5 opacity-80 text-center">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="flex justify-center gap-10">
                        <Globe className="w-5 h-5 hover:scale-110 cursor-pointer transition-all" />
                        <MessageSquare className="w-5 h-5 hover:scale-110 cursor-pointer transition-all" />
                        <Mail className="w-5 h-5 hover:scale-110 cursor-pointer transition-all" />
                    </div>
                    <div className="space-y-4">
                        <span className="text-xl font-black tracking-tighter" style={{ color: brandColor, ...fontStyles }}>{webName}</span>
                        <p className="text-[10px] opacity-40 uppercase tracking-[0.4em]">Handcrafted with precision • 2026</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
