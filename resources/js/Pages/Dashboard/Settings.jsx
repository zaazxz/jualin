import React, { useState, useEffect } from 'react';
import { Head, usePage, useForm } from '@inertiajs/react';
import { Settings as SettingsIcon, User, Lock, Bell, Palette, Shield, ChevronRight, Save, Loader2, CheckCircle, Sun, Moon, Camera, Upload, AlertCircle, Clock, Sparkles, RefreshCw } from 'lucide-react';
import Layout from '@/Layouts/Dashboard/Layout';
import { useAppStore } from '@/store/useAppStore';

export default function Settings({ salesCount = 0 }) {
    const { auth } = usePage().props;
    const [activeSection, setActiveSection] = useState('profile');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { t } = useAppStore();

    const [apiStatus, setApiStatus] = useState({ loading: false, status: 'unknown', message: 'Not checked', details: '' });

    const checkApiStatus = async () => {
        setApiStatus(prev => ({ ...prev, loading: true }));
        try {
            const response = await window.axios.get(route('api.check-status'));
            setApiStatus({
                loading: false,
                status: response.data.status,
                message: response.data.message,
                details: response.data.details
            });
        } catch (error) {
            setApiStatus({
                loading: false,
                status: 'error',
                message: 'Check failed',
                details: error.message
            });
        }
    };

    useEffect(() => {
        if (activeSection === 'billing' && apiStatus.status === 'unknown') {
            checkApiStatus();
        }
    }, [activeSection]);

    const MAX_FREE_PAGES = 5;
    const usagePercentage = (salesCount / MAX_FREE_PAGES) * 100;

    const [avatarPreview, setAvatarPreview] = useState(auth.user.avatar ? (auth.user.avatar.startsWith('http') ? auth.user.avatar : `/storage/${auth.user.avatar}`) : null);

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        name: auth.user.name,
        email: auth.user.email,
        avatar: null,
        _method: 'patch',
    });

    const {
        data: deleteData,
        setData: setDeleteData,
        delete: destroyAccount,
        processing: deleting,
        reset: resetDelete
    } = useForm({
        password: '',
    });

    const {
        data: passwordData,
        setData: setPasswordData,
        put: updatePassword,
        processing: passwordProcessing,
        errors: passwordErrors,
        reset: resetPassword,
        recentlySuccessful: passwordRecentlySuccessful
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const { theme, toggleTheme } = useAppStore();

    const sections = [
        { id: 'profile', label: t('my_profile'), icon: User, desc: t('my_profile_desc') },
        { id: 'billing', label: 'Subscription & Usage', icon: Shield, desc: 'Manage your AI credits and limits' },
        { id: 'security', label: t('security'), icon: Lock, desc: t('security_desc') },
        { id: 'appearance', label: t('appearance'), icon: Palette, desc: t('appearance_desc') },
    ];

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        post(route('profile.update'), {
            preserveScroll: true,
        });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('avatar', file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleDeleteAccount = (e) => {
        e.preventDefault();
        destroyAccount(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => setShowDeleteModal(false),
            onError: () => document.getElementById('password_input').focus(),
            onFinish: () => resetDelete(),
        });
    };

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        updatePassword(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => resetPassword(),
            onError: (err) => {
                if (err.password) resetPassword('password', 'password_confirmation');
                if (err.current_password) resetPassword('current_password');
            },
        });
    };

    return (
        <Layout>
            <Head title={t('system_settings')} />

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                        <SettingsIcon className="w-5 h-5 text-emerald-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-jual-text-main">{t('system_settings')}</h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Navigation Sidebar */}
                    <div className="w-full lg:w-1/3 space-y-2">
                        {sections.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => setActiveSection(s.id)}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left border ${activeSection === s.id
                                    ? 'bg-emerald-500/5 border-emerald-500/20 ring-1 ring-emerald-500/10'
                                    : 'hover:bg-jual-card border-transparent hover:border-jual-border group'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${activeSection === s.id ? 'bg-emerald-500 text-slate-900' : 'bg-jual-input text-jual-text-muted group-hover:text-emerald-400'
                                    }`}>
                                    <s.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h3 className={`text-sm font-bold ${activeSection === s.id ? 'text-jual-text-main' : 'text-jual-text-muted group-hover:text-jual-text-main'}`}>{s.label}</h3>
                                    <p className="text-[10px] text-jual-text-muted font-medium">{s.desc}</p>
                                </div>
                                <ChevronRight className={`w-4 h-4 ${activeSection === s.id ? 'text-emerald-500' : 'text-jual-text-muted opacity-0 group-hover:opacity-100'}`} />
                            </button>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="w-full lg:w-2/3">
                        {activeSection === 'profile' ? (
                            <>
                                <form onSubmit={handleUpdateProfile} className="bg-jual-card border border-jual-border rounded-3xl p-8 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

                                    <h2 className="text-xl font-bold text-jual-text-main mb-8 pb-4 border-b border-jual-border flex items-center justify-between">
                                        {t('profile_info')}
                                        {recentlySuccessful && (
                                            <span className="bg-emerald-500/10 text-emerald-500 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                                                <CheckCircle className="w-3 h-3" /> {t('saved')}
                                            </span>
                                        )}
                                    </h2>

                                    <div className="space-y-8 relative z-10">
                                        {/* Avatar Upload */}
                                        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-jual-border/50">
                                            <div className="relative group/avatar">
                                                <div className="w-24 h-24 rounded-2xl bg-jual-input border-2 border-jual-border overflow-hidden flex items-center justify-center group-hover/avatar:border-emerald-500/50 transition-all duration-300 shadow-xl">
                                                    {avatarPreview ? (
                                                        <img 
                                                            src={avatarPreview} 
                                                            alt="Avatar" 
                                                            className="w-full h-full object-cover" 
                                                            onError={(e) => {
                                                                e.target.onerror = null; 
                                                                e.target.src = null; // or a fallback image
                                                            }}
                                                        />
                                                    ) : (
                                                        <User className="w-10 h-10 text-jual-text-muted" />
                                                    )}
                                                </div>
                                                <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-lg flex items-center justify-center cursor-pointer shadow-lg transition-all hover:scale-110 active:scale-95 border-2 border-jual-card">
                                                    <Camera className="w-4 h-4" />
                                                    <input 
                                                        type="file" 
                                                        className="hidden" 
                                                        accept="image/*"
                                                        onChange={handleAvatarChange}
                                                    />
                                                </label>
                                            </div>
                                            <div className="text-center sm:text-left">
                                                <h3 className="text-sm font-bold text-jual-text-main">{t('profile_photo')}</h3>
                                                <p className="text-[10px] text-jual-text-muted mt-1">{t('profile_photo_desc')}</p>
                                                {errors.avatar && <p className="text-[10px] text-red-500 mt-2 font-bold">{errors.avatar}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">{t('full_name')}</label>
                                                <input
                                                    type="text"
                                                    value={data.name}
                                                    onChange={e => setData('name', e.target.value)}
                                                    className="w-full bg-jual-input border border-jual-border rounded-xl px-4 py-3 text-sm text-jual-text-main focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
                                                />
                                                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">{t('email_address')}</label>
                                                <input
                                                    type="email"
                                                    value={data.email}
                                                    onChange={e => setData('email', e.target.value)}
                                                    className="w-full bg-jual-input border border-jual-border rounded-xl px-4 py-3 text-sm text-jual-text-main focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
                                                />
                                                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-jual-border flex justify-end gap-3">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-900 font-bold px-8 py-3 rounded-xl text-sm flex items-center gap-2 transition-all shadow-[0_4px_15px_rgba(16,185,129,0.2)]"
                                            >
                                                {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                                {t('save_changes')}
                                            </button>
                                        </div>
                                    </div>
                                </form>

                                {/* Danger Zone */}
                                <div className="mt-8 bg-red-500/5 border border-red-500/10 rounded-3xl p-8 group">
                                    <h3 className="text-sm font-bold text-red-500 mb-2 flex items-center gap-2">
                                        <Shield className="w-4 h-4" /> {t('delete_account')}
                                    </h3>
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <p className="text-xs text-jual-text-muted max-w-sm">{t('delete_account_desc')}</p>
                                        <button
                                            onClick={() => setShowDeleteModal(true)}
                                            className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all border border-red-500/20"
                                        >
                                            {t('close_account_btn')}
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : activeSection === 'billing' ? (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="bg-jual-card border border-jual-border rounded-3xl p-8 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                                    
                                    <h2 className="text-xl font-bold text-jual-text-main mb-8 pb-4 border-b border-jual-border flex items-center justify-between">
                                        Subscription & Usage
                                        <span className="bg-emerald-500/10 text-emerald-500 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest">
                                            Free Plan
                                        </span>
                                    </h2>

                                    <div className="space-y-10 relative z-10">
                                        <div className="p-6 bg-jual-input border border-jual-border rounded-2xl">
                                            <div className="flex justify-between items-end mb-4">
                                                <div>
                                                    <h3 className="text-sm font-bold text-jual-text-main">AI Page Generation</h3>
                                                    <p className="text-[10px] text-jual-text-muted">Total pages created with AI</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-lg font-black text-jual-text-main">{salesCount}</span>
                                                    <span className="text-xs text-jual-text-muted ml-1">/ {MAX_FREE_PAGES} Pages</span>
                                                </div>
                                            </div>
                                            
                                            <div className="h-3 bg-jual-bg rounded-full overflow-hidden border border-jual-border p-0.5">
                                                <div 
                                                    className={`h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(16,185,129,0.2)] ${
                                                        usagePercentage >= 90 ? 'bg-red-500 shadow-red-500/20' : 
                                                        usagePercentage >= 70 ? 'bg-amber-500 shadow-amber-500/20' : 'bg-emerald-500'
                                                    }`}
                                                    style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                                                ></div>
                                            </div>
                                            
                                            <div className="mt-4 flex items-center gap-2 text-[10px] text-jual-text-muted">
                                                <AlertCircle className="w-3 h-3 text-amber-500" />
                                                <span>Anda dapat menghapus proyek lama untuk mengosongkan kuota AI Anda.</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="p-5 border border-jual-border rounded-2xl bg-jual-bg-alt/50">
                                                <div className="flex justify-between items-start mb-2">
                                                    <p className="text-[10px] font-bold text-jual-text-muted uppercase tracking-widest">Gemini API Health</p>
                                                    <button 
                                                        onClick={checkApiStatus}
                                                        disabled={apiStatus.loading}
                                                        className="text-emerald-500 hover:text-emerald-400 disabled:opacity-50 transition-all"
                                                    >
                                                        <RefreshCw className={`w-3 h-3 ${apiStatus.loading ? 'animate-spin' : ''}`} />
                                                    </button>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${
                                                        apiStatus.status === 'active' ? 'bg-emerald-500 animate-pulse' : 
                                                        apiStatus.status === 'limit_reached' ? 'bg-amber-500' :
                                                        apiStatus.status === 'error' || apiStatus.status === 'invalid' ? 'bg-red-500' : 'bg-slate-500'
                                                    }`}></div>
                                                    <span className={`text-sm font-bold ${
                                                        apiStatus.status === 'active' ? 'text-emerald-500' : 
                                                        apiStatus.status === 'limit_reached' ? 'text-amber-500' :
                                                        apiStatus.status === 'error' || apiStatus.status === 'invalid' ? 'text-red-500' : 'text-jual-text-muted'
                                                    }`}>
                                                        {apiStatus.loading ? 'Checking...' : apiStatus.message}
                                                    </span>
                                                </div>
                                                {apiStatus.details && (
                                                    <p className="text-[9px] text-jual-text-muted mt-2 leading-tight">
                                                        {apiStatus.details}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="p-5 border border-jual-border rounded-2xl bg-jual-bg-alt/50">
                                                <p className="text-[10px] font-bold text-jual-text-muted uppercase tracking-widest mb-1">Model Info</p>
                                                <div className="flex items-center gap-2 text-sm font-bold text-jual-text-main">
                                                    <Sparkles className="w-4 h-4 text-emerald-500" />
                                                    <span>Gemini 1.5 Flash</span>
                                                </div>
                                                <p className="text-[9px] text-jual-text-muted mt-2 leading-tight">
                                                    Gratis 15 RPM / 1M TPM / 1.5K RPD
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-2xl">
                                            <h4 className="text-sm font-bold text-emerald-500 mb-2 flex items-center gap-2">
                                                <Sparkles className="w-4 h-4" /> Butuh Lebih Banyak Kuota?
                                            </h4>
                                            <p className="text-xs text-jual-text-muted leading-relaxed mb-4">
                                                Paket gratis terbatas pada 5 halaman. Hubungi admin untuk meningkatkan kapasitas atau integrasi kustom lainnya.
                                            </p>
                                            <button className="bg-emerald-500 text-slate-900 text-xs font-black px-6 py-2 rounded-lg hover:bg-emerald-400 transition-all">
                                                UPGRADE NOW
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : activeSection === 'security' ? (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <form onSubmit={handleUpdatePassword} className="bg-jual-card border border-jual-border rounded-3xl p-8 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

                                    <h2 className="text-xl font-bold text-jual-text-main mb-8 pb-4 border-b border-jual-border flex items-center justify-between">
                                        {t('update_password')}
                                        {passwordRecentlySuccessful && (
                                            <span className="bg-emerald-500/10 text-emerald-500 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                                                <CheckCircle className="w-3 h-3" /> {t('saved')}
                                            </span>
                                        )}
                                    </h2>

                                    <div className="space-y-6 relative z-10">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">{t('current_password')}</label>
                                            <input
                                                type="password"
                                                value={passwordData.current_password}
                                                onChange={e => setPasswordData('current_password', e.target.value)}
                                                className="w-full bg-jual-input border border-jual-border rounded-xl px-4 py-3 text-sm text-jual-text-main focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
                                                placeholder="••••••••"
                                            />
                                            {passwordErrors.current_password && <p className="text-xs text-red-500 mt-1">{passwordErrors.current_password}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">{t('new_password')}</label>
                                                <input
                                                    type="password"
                                                    value={passwordData.password}
                                                    onChange={e => setPasswordData('password', e.target.value)}
                                                    className="w-full bg-jual-input border border-jual-border rounded-xl px-4 py-3 text-sm text-jual-text-main focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
                                                    placeholder="••••••••"
                                                />
                                                {passwordErrors.password && <p className="text-xs text-red-500 mt-1">{passwordErrors.password}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">{t('confirm_password')}</label>
                                                <input
                                                    type="password"
                                                    value={passwordData.password_confirmation}
                                                    onChange={e => setPasswordData('password_confirmation', e.target.value)}
                                                    className="w-full bg-jual-input border border-jual-border rounded-xl px-4 py-3 text-sm text-jual-text-main focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
                                                    placeholder="••••••••"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-jual-border flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={passwordProcessing}
                                                className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-900 font-bold px-8 py-3 rounded-xl text-sm flex items-center gap-2 transition-all shadow-[0_4px_15px_rgba(16,185,129,0.2)]"
                                            >
                                                {passwordProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                                {t('update_password')}
                                            </button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        ) : activeSection === 'appearance' ? (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="bg-jual-card border border-jual-border rounded-3xl p-8 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

                                    <h2 className="text-xl font-bold text-jual-text-main mb-8 pb-4 border-b border-jual-border">
                                        {t('theme_settings')}
                                    </h2>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                                        <button
                                            onClick={() => theme !== 'light' && toggleTheme()}
                                            className={`p-6 rounded-2xl border transition-all duration-300 text-left flex items-center gap-4 ${theme === 'light' ? 'bg-emerald-500/5 border-emerald-500/30 ring-1 ring-emerald-500/20' : 'bg-jual-input border-jual-border hover:border-emerald-500/30'}`}
                                        >
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${theme === 'light' ? 'bg-emerald-500 text-white' : 'bg-jual-bg text-jual-text-muted'}`}>
                                                <Sun className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-jual-text-main">{t('light_mode')}</p>
                                                <p className="text-[10px] text-jual-text-muted">{t('light_mode_desc')}</p>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => theme !== 'dark' && toggleTheme()}
                                            className={`p-6 rounded-2xl border transition-all duration-300 text-left flex items-center gap-4 ${theme === 'dark' ? 'bg-emerald-500/5 border-emerald-500/30 ring-1 ring-emerald-500/20' : 'bg-jual-input border-jual-border hover:border-emerald-500/30'}`}
                                        >
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${theme === 'dark' ? 'bg-emerald-500 text-white' : 'bg-jual-bg text-jual-text-muted'}`}>
                                                <Moon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-jual-text-main">{t('dark_mode')}</p>
                                                <p className="text-[10px] text-jual-text-muted">{t('dark_mode_desc')}</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-jual-card border border-jual-border border-dashed rounded-3xl p-12 text-center animate-in fade-in duration-500">
                                <SettingsIcon className="w-12 h-12 text-jual-text-muted mx-auto mb-4 animate-spin-slow" />
                                <h3 className="text-lg font-bold text-jual-text-main mb-2">{t('coming_soon')}</h3>
                                <p className="text-sm text-jual-text-muted">{t('coming_soon_desc')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal Hapus Akun */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)}></div>
                    <div className="bg-jual-card border border-jual-border rounded-3xl p-8 shadow-2xl relative z-10 w-full max-w-md animate-in zoom-in-95 duration-200">
                        <h2 className="text-xl font-bold text-jual-text-main flex items-center gap-2">
                            <Shield className="w-5 h-5 text-red-500" />
                            {t('confirm_delete_account')}
                        </h2>
                        <p className="mt-4 text-sm text-jual-text-muted leading-relaxed">
                            {t('confirm_delete_account_desc')}
                        </p>

                        <div className="mt-6">
                            <input
                                type="password"
                                id="password_input"
                                value={deleteData.password}
                                onChange={(e) => setDeleteData('password', e.target.value)}
                                className="w-full bg-jual-input border border-jual-border rounded-xl px-4 py-3 text-sm text-jual-text-main focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                                placeholder={t('your_password')}
                            />
                            {errors.password && <p className="text-xs text-red-500 mt-2 font-medium">{errors.password}</p>}
                        </div>

                        <div className="mt-8 flex justify-end gap-3">
                            <button onClick={() => setShowDeleteModal(false)} className="px-5 py-2.5 text-sm font-bold text-jual-text-muted hover:text-jual-text-main transition-colors">
                                {t('cancel')}
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                disabled={deleting}
                                className="bg-red-500 hover:bg-red-400 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all shadow-[0_4px_15px_rgba(239,68,68,0.2)] flex items-center gap-2"
                            >
                                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                {deleting ? t('deleting') : t('delete_permanently')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
