import { useState, useEffect } from 'react';
import { Language } from '@/lib/translations';

// Hook to manage language state
export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get language from localStorage
    const saved = localStorage.getItem('language');
    if (saved === 'en' || saved === 'fr' || saved === 'ar') {
      return saved;
    }
    // Default to English
    return 'en';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = language;
    // Update text direction for Arabic
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [language]);

  return { language, setLanguage };
};
