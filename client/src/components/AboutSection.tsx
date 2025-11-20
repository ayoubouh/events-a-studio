import React from 'react';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { Card } from '@/components/ui/card';
import { Award, Users, Zap } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { language } = useLanguageContext();

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Story */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              {t('about.headline', language)}
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed mb-6">
              {t('about.bio', language)}
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed">
              {t('about.expertise', language)}
            </p>
          </div>

          {/* Right: Stats/Highlights */}
          <div className="space-y-6">
            <Card className="p-8 border border-border hover:border-accent transition-colors">
              <div className="flex items-start gap-4">
                <Award className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {language === 'en' ? 'Tourism Management Diploma' : language === 'fr' ? 'Diplôme en Gestion du Tourisme' : 'دبلوم إدارة السياحة'}
                  </h3>
                  <p className="text-foreground/70">
                    {language === 'en'
                      ? 'Specialized in Event Organization with expertise in Marrakech tourism market'
                      : language === 'fr'
                      ? 'Spécialisé en Organisation d\'Événements avec expertise du marché touristique de Marrakech'
                      : 'متخصص في تنظيم الفعاليات مع خبرة في سوق السياحة في مراكش'}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border border-border hover:border-accent transition-colors">
              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {language === 'en'
                      ? 'Weddings & Ceremonies'
                      : language === 'fr'
                      ? 'Mariages & Cérémonies'
                      : 'الزفاف والحفلات'}
                  </h3>
                  <p className="text-foreground/70">
                    {language === 'en'
                      ? 'Expert in Moroccan weddings, engagements, and cultural ceremonies'
                      : language === 'fr'
                      ? 'Expert en mariages marocains, fiançailles et cérémonies culturelles'
                      : 'خبير في الزفاف المغربي والخطوبة والحفلات الثقافية'}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border border-border hover:border-accent transition-colors">
              <div className="flex items-start gap-4">
                <Zap className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {language === 'en'
                      ? 'Creative Excellence'
                      : language === 'fr'
                      ? 'Excellence Créative'
                      : 'التميز الإبداعي'}
                  </h3>
                  <p className="text-foreground/70">
                    {language === 'en'
                      ? 'Blending artistic vision with flawless execution'
                      : language === 'fr'
                      ? 'Fusion de la vision artistique avec une exécution impeccable'
                      : 'دمج الرؤية الفنية مع التنفيذ الخالي من العيوب'}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
