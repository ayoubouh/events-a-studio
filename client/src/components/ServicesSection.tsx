import React from 'react';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Briefcase, Camera, Users, Utensils, MapPin } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { language } = useLanguageContext();

  const services = [
    {
      icon: Heart,
      titleKey: 'services.weddings.title',
      descKey: 'services.weddings.description',
    },
    {
      icon: Briefcase,
      titleKey: 'services.corporate.title',
      descKey: 'services.corporate.description',
    },
    {
      icon: Camera,
      titleKey: 'services.photography.title',
      descKey: 'services.photography.description',
    },
    {
      icon: Utensils,
      titleKey: 'services.gala.title',
      descKey: 'services.gala.description',
    },
    {
      icon: Users,
      titleKey: 'services.private.title',
      descKey: 'services.private.description',
    },
    {
      icon: MapPin,
      titleKey: 'services.tourism.title',
      descKey: 'services.tourism.description',
    },
  ];

  const handleScroll = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {t('services.title', language)}
          </h2>
          <p className="text-lg text-foreground/70">
            {t('services.subtitle', language)}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="p-8 hover:shadow-lg transition-all duration-300 border border-border hover:border-accent group"
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Icon size={28} className="text-accent" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {t(service.titleKey, language)}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {t(service.descKey, language)}
                </p>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-semibold"
            onClick={() => handleScroll('#contact')}
          >
            {t('cta.requestQuote', language)}
          </Button>
        </div>
      </div>
    </section>
  );
};
