import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { translations } from '../locales/translations';

export const useAppStore = create(
    persist(
        (set, get) => ({
            theme: 'dark', // 'light' or 'dark'
            language: 'id', // 'id', 'en', 'ms'
            
            setTheme: (theme) => {
                set({ theme });
                if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            },
            
            toggleTheme: () => {
                const newTheme = get().theme === 'dark' ? 'light' : 'dark';
                get().setTheme(newTheme);
            },
            
            setLanguage: (language) => set({ language }),
            
            t: (key) => {
                const lang = get().language;
                return translations[lang]?.[key] || translations['id']?.[key] || key;
            }
        }),
        {
            name: 'jualin-storage',
            partialize: (state) => ({ theme: state.theme, language: state.language }),
        }
    )
);
