import React, { useState } from 'react';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { t, Language } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { APP_LOGO, APP_TITLE } from '@/const';

export const Header: React.FC = () => {
  const { language, setLanguage } = useLanguageContext();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.weddings', href: '#weddings' },
    { key: 'nav.studio', href: '#studio' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.contact', href: '#contact' },
  ];

  const languages: Language[] = ['en', 'fr', 'ar'];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={APP_LOGO} alt={APP_TITLE} className="h-12 w-12 object-contain" />
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-primary">{t('brand.name', language)}</h1>
            <p className="text-xs text-muted-foreground">{t('brand.tagline', language)}</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.href)}
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              {t(item.key, language)}
            </button>
          ))}
        </nav>

        {/* Language Switcher & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="flex items-center gap-2 border border-border rounded-lg p-1">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  language === lang
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Dark/Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-border bg-white">
          <div className="container py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.href)}
                className="text-left text-sm font-medium text-foreground hover:text-accent transition-colors py-2"
              >
                {t(item.key, language)}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
