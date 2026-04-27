import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Settings as SettingsIcon, User, Lock, Bell, Palette, Globe, Shield, CreditCard, ChevronRight, Save } from 'lucide-react';
import Layout from '@/Layouts/Dashboard/Layout';

export default function Settings() {
    const { auth } = usePage().props;

    const sections = [
        { id: 'profile', label: 'Profil Saya', icon: User, desc: 'Kelola informasi pribadi dan publik Anda' },
        { id: 'security', label: 'Keamanan', icon: Lock, desc: 'Amankan akun dengan 2FA dan kata sandi' },
        { id: 'billing', label: 'Langganan', icon: CreditCard, desc: 'Kelola paket Pro dan metode pembayaran' },
        { id: 'notifications', label: 'Notifikasi', icon: Bell, desc: 'Atur cara kami menghubungi Anda' },
        { id: 'appearance', label: 'Tampilan', icon: Palette, desc: 'Kustomisasi tema dan layout dashboard' },
    ];

    return (
        <Layout>
            <Head title="Settings" />

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                        <SettingsIcon className="w-5 h-5 text-emerald-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Pengaturan Sistem</h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Navigation Sidebar */}
                    <div className="w-full lg:w-1/3 space-y-2">
                        {sections.map((s) => (
                            <button
                                key={s.id}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left border ${
                                    s.id === 'profile' 
                                    ? 'bg-emerald-500/5 border-emerald-500/20 ring-1 ring-emerald-500/10' 
                                    : 'hover:bg-jual-card border-transparent hover:border-jual-border group'
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                                    s.id === 'profile' ? 'bg-emerald-500 text-slate-900' : 'bg-slate-500/10 text-slate-500 group-hover:text-emerald-400'
                                }`}>
                                    <s.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h3 className={`text-sm font-bold ${s.id === 'profile' ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>{s.label}</h3>
                                    <p className="text-[10px] text-slate-600 font-medium">{s.desc}</p>
                                </div>
                                <ChevronRight className={`w-4 h-4 ${s.id === 'profile' ? 'text-emerald-500' : 'text-slate-700 opacity-0 group-hover:opacity-100'}`} />
                            </button>
                        ))}
                    </div>

                    {/* Main Content Form */}
                    <div className="w-full lg:w-2/3">
                        <div className="bg-jual-card border border-jual-border rounded-3xl p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                            
                            <h2 className="text-xl font-bold text-white mb-8 pb-4 border-b border-jual-border flex items-center justify-between">
                                Informasi Profil
                                <span className="bg-emerald-500/10 text-emerald-500 text-[10px] px-2 py-0.5 rounded-full">Akun Terverifikasi</span>
                            </h2>

                            <div className="space-y-8 relative z-10">
                                {/* Avatar Section */}
                                <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-[#131d23]/50 border border-[#1f2e36] rounded-2xl">
                                    <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center relative group">
                                        <User className="w-10 h-10 text-emerald-500" />
                                        <button className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-bold text-white">Ganti Foto</button>
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <h4 className="text-sm font-bold text-white mb-1">Foto Profil Anda</h4>
                                        <p className="text-[11px] text-slate-500 mb-4">PNG, JPG atau GIF (Maks. 2MB)</p>
                                        <div className="flex gap-2">
                                            <button className="text-xs font-bold text-emerald-500 hover:text-emerald-400 transition-colors">Upload</button>
                                            <span className="text-slate-800">|</span>
                                            <button className="text-xs font-bold text-red-500 hover:text-red-400 transition-colors">Hapus</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">Nama Lengkap</label>
                                        <input 
                                            type="text" 
                                            defaultValue={auth.user.name}
                                            className="w-full bg-[#131d23] border border-[#1f2e36] rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">Alamat Email</label>
                                        <input 
                                            type="email" 
                                            defaultValue={auth.user.email}
                                            disabled
                                            className="w-full bg-[#0a0f12] border border-[#1f2e36] rounded-xl px-4 py-3 text-sm text-slate-500 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">Bio Singkat</label>
                                    <textarea 
                                        rows="3"
                                        placeholder="Tuliskan sesuatu tentang diri Anda..."
                                        className="w-full bg-[#131d23] border border-[#1f2e36] rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 resize-none"
                                    ></textarea>
                                </div>

                                <div className="pt-6 border-t border-jual-border flex justify-end gap-3">
                                    <button className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-white transition-colors">Batalkan</button>
                                    <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-8 py-3 rounded-xl text-sm flex items-center gap-2 transition-all shadow-[0_4px_15px_rgba(16,185,129,0.2)] hover:-translate-y-0.5 active:translate-y-0">
                                        <Save className="w-4 h-4" /> Simpan Perubahan
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="mt-8 bg-red-500/5 border border-red-500/10 rounded-3xl p-8 group">
                            <h3 className="text-sm font-bold text-red-500 mb-2 flex items-center gap-2">
                                <Shield className="w-4 h-4" /> Hapus Akun
                            </h3>
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                <p className="text-xs text-slate-500 max-w-sm">Tindakan ini permanen. Seluruh data, halaman, dan analitik Anda akan dihapus selamanya.</p>
                                <button className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all border border-red-500/20">
                                    Tutup Akun
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
