import React, { useState } from 'react';
import { Head, usePage, useForm } from '@inertiajs/react';
import { Settings as SettingsIcon, User, Lock, Bell, Palette, Shield, ChevronRight, Save, Loader2, CheckCircle } from 'lucide-react';
import Layout from '@/Layouts/Dashboard/Layout';

export default function Settings() {
    const { auth } = usePage().props;
    const [activeSection, setActiveSection] = useState('profile');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { data, setData, patch, processing, errors, recentlySuccessful } = useForm({
        name: auth.user.name,
        email: auth.user.email,
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

    const sections = [
        { id: 'profile', label: 'Profil Saya', icon: User, desc: 'Kelola informasi pribadi dan publik Anda' },
        { id: 'security', label: 'Keamanan', icon: Lock, desc: 'Amankan akun dengan 2FA dan kata sandi' },
        { id: 'notifications', label: 'Notifikasi', icon: Bell, desc: 'Atur cara kami menghubungi Anda' },
        { id: 'appearance', label: 'Tampilan', icon: Palette, desc: 'Kustomisasi tema dan layout dashboard' },
    ];

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
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

    return (
        <Layout>
            <Head title="Pengaturan Sistem" />

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
                                onClick={() => setActiveSection(s.id)}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left border ${
                                    activeSection === s.id 
                                    ? 'bg-emerald-500/5 border-emerald-500/20 ring-1 ring-emerald-500/10' 
                                    : 'hover:bg-jual-card border-transparent hover:border-jual-border group'
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                                    activeSection === s.id ? 'bg-emerald-500 text-slate-900' : 'bg-slate-500/10 text-slate-500 group-hover:text-emerald-400'
                                }`}>
                                    <s.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h3 className={`text-sm font-bold ${activeSection === s.id ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>{s.label}</h3>
                                    <p className="text-[10px] text-slate-600 font-medium">{s.desc}</p>
                                </div>
                                <ChevronRight className={`w-4 h-4 ${activeSection === s.id ? 'text-emerald-500' : 'text-slate-700 opacity-0 group-hover:opacity-100'}`} />
                            </button>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="w-full lg:w-2/3">
                        {activeSection === 'profile' ? (
                            <>
                                <form onSubmit={handleUpdateProfile} className="bg-jual-card border border-jual-border rounded-3xl p-8 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                                    
                                    <h2 className="text-xl font-bold text-white mb-8 pb-4 border-b border-jual-border flex items-center justify-between">
                                        Informasi Profil
                                        {recentlySuccessful && (
                                            <span className="bg-emerald-500/10 text-emerald-500 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                                                <CheckCircle className="w-3 h-3" /> Tersimpan
                                            </span>
                                        )}
                                    </h2>

                                    <div className="space-y-8 relative z-10">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">Nama Lengkap</label>
                                                <input 
                                                    type="text" 
                                                    value={data.name}
                                                    onChange={e => setData('name', e.target.value)}
                                                    className="w-full bg-[#131d23] border border-[#1f2e36] rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
                                                />
                                                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest ml-1">Alamat Email</label>
                                                <input 
                                                    type="email" 
                                                    value={data.email}
                                                    onChange={e => setData('email', e.target.value)}
                                                    className="w-full bg-[#131d23] border border-[#1f2e36] rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
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
                                                Simpan Perubahan
                                            </button>
                                        </div>
                                    </div>
                                </form>

                                {/* Danger Zone */}
                                <div className="mt-8 bg-red-500/5 border border-red-500/10 rounded-3xl p-8 group">
                                    <h3 className="text-sm font-bold text-red-500 mb-2 flex items-center gap-2">
                                        <Shield className="w-4 h-4" /> Hapus Akun
                                    </h3>
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <p className="text-xs text-slate-500 max-w-sm">Tindakan ini permanen. Seluruh data, halaman, dan analitik Anda akan dihapus selamanya.</p>
                                        <button 
                                            onClick={() => setShowDeleteModal(true)}
                                            className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all border border-red-500/20"
                                        >
                                            Tutup Akun
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="bg-jual-card border border-jual-border border-dashed rounded-3xl p-12 text-center animate-in fade-in duration-500">
                                <SettingsIcon className="w-12 h-12 text-slate-600 mx-auto mb-4 animate-spin-slow" />
                                <h3 className="text-lg font-bold text-white mb-2">Segera Hadir</h3>
                                <p className="text-sm text-slate-500">Fitur pengaturan ini sedang dalam tahap pengembangan dan akan segera tersedia.</p>
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
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Shield className="w-5 h-5 text-red-500" />
                            Konfirmasi Hapus Akun
                        </h2>
                        <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                            Setelah akun Anda dihapus, semua sumber daya dan datanya akan dihapus secara permanen. Masukkan kata sandi Anda untuk mengonfirmasi.
                        </p>

                        <div className="mt-6">
                            <input
                                type="password"
                                id="password_input"
                                value={deleteData.password}
                                onChange={(e) => setDeleteData('password', e.target.value)}
                                className="w-full bg-[#131d23] border border-[#1f2e36] rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                                placeholder="Kata Sandi Anda"
                            />
                            {errors.password && <p className="text-xs text-red-500 mt-2 font-medium">{errors.password}</p>}
                        </div>

                        <div className="mt-8 flex justify-end gap-3">
                            <button onClick={() => setShowDeleteModal(false)} className="px-5 py-2.5 text-sm font-bold text-slate-400 hover:text-white transition-colors">
                                Batal
                            </button>
                            <button 
                                onClick={handleDeleteAccount} 
                                disabled={deleting}
                                className="bg-red-500 hover:bg-red-400 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all shadow-[0_4px_15px_rgba(239,68,68,0.2)] flex items-center gap-2"
                            >
                                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                {deleting ? 'Menghapus...' : 'Hapus Permanen'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
