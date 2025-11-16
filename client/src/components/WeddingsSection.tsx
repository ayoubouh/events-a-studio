import React from 'react';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const WeddingsSection: React.FC = () => {
  const { language } = useLanguageContext();

  const handleScroll = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="weddings"
      className="py-20 bg-gradient-to-br from-amber-50 via-white to-amber-50 relative overflow-hidden"
    >
      {/* Decorative elements for Traditional Luxury theme */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-amber-700 font-semibold text-lg mb-4 tracking-wide">
            {t('brand.tagline', language)}
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-amber-900 mb-6 font-serif">
            {t('nav.weddings', language)}
          </h2>
          <p className="text-xl text-amber-800/80 leading-relaxed">
            {t('services.weddings.description', language)}
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Wedding Details */}
          <div>
            <Card className="p-8 bg-white/80 backdrop-blur border-amber-200 shadow-lg">
              <h3 className="text-3xl font-bold text-amber-900 mb-6 font-serif">
                {t('services.weddings.title', language)}
              </h3>
              <div className="space-y-4 text-amber-900/80">
                <p>
                  Celebrate your love with the timeless elegance of Moroccan traditions combined with modern luxury. From the intimate Henna ceremony to the grand Zaffa procession, we orchestrate every moment with precision and artistry.
                </p>
                <p>
                  Our team specializes in creating unforgettable experiences in Marrakech's most stunning venues—from traditional riads to luxury palaces, each celebration is uniquely yours.
                </p>
              </div>
            </Card>
          </div>

          {/* Right: Engagement Details */}
          <div>
            <Card className="p-8 bg-white/80 backdrop-blur border-amber-200 shadow-lg">
              <h3 className="text-3xl font-bold text-amber-900 mb-6 font-serif">
                {t('services.engagements.title', language)}
              </h3>
              <div className="space-y-4 text-amber-900/80">
                <p>
                  Mark the beginning of your journey with a memorable engagement celebration (خطوبة). We create intimate gatherings that honor tradition while reflecting your personal style.
                </p>
                <p>
                  From venue selection to décor, catering to entertainment, every detail is carefully curated to make your engagement ceremony a cherished memory.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              title: language === 'en' ? 'Traditional Ceremonies' : language === 'fr' ? 'Cérémonies Traditionnelles' : 'الحفلات التقليدية',
              desc: language === 'en' ? 'Henna, Zaffa, Fatiha, and more' : language === 'fr' ? 'Henné, Zaffa, Fatiha, et plus' : 'الحناء والزفة والفاتحة وغيرها',
            },
            {
              title: language === 'en' ? 'Luxury Venues' : language === 'fr' ? 'Lieux de Luxe' : 'أماكن فاخرة',
              desc: language === 'en' ? 'Riads, palaces, and gardens' : language === 'fr' ? 'Riads, palais et jardins' : 'الرياضات والقصور والحدائق',
            },
            {
              title: language === 'en' ? 'Full Production' : language === 'fr' ? 'Production Complète' : 'الإنتاج الكامل',
              desc: language === 'en' ? 'Photography, videography, and design' : language === 'fr' ? 'Photographie, vidéographie et conception' : 'التصوير والفيديو والتصميم',
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="p-6 bg-white/60 backdrop-blur border-amber-200 text-center hover:shadow-lg transition-shadow"
            >
              <h4 className="text-lg font-bold text-amber-900 mb-2 font-serif">{item.title}</h4>
              <p className="text-amber-800/70 text-sm">{item.desc}</p>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-amber-700 text-white hover:bg-amber-800 px-8 py-6 text-base font-semibold"
            onClick={() => handleScroll('#contact')}
          >
            {t('cta.planWedding', language)}
          </Button>
        </div>
      </div>
    </section>
  );
};
