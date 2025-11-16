import React from 'react';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { language } = useLanguageContext();

  const handleScroll = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-white to-accent/5 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Tagline */}
          <p className="text-accent font-semibold text-lg mb-4 tracking-wide">
            {t('brand.tagline', language)}
          </p>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight">
            {t('brand.heroHeadline', language)}
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed">
            {t('brand.heroSubheadline', language)}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-semibold flex items-center gap-2"
              onClick={() => handleScroll('#contact')}
            >
              {t('cta.startProject', language)}
              <ArrowRight size={20} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary/5 px-8 py-6 text-base font-semibold"
              onClick={() => handleScroll('#services')}
            >
              {t('cta.learnMore', language)}
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 animate-bounce">
            <svg
              className="w-6 h-6 mx-auto text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
