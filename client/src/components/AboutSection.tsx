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
                    {language === 'en' ? 'PMP Certified' : language === 'fr' ? 'Certifié PMP' : 'معتمد من PMP'}
                  </h3>
                  <p className="text-foreground/70">
                    {language === 'en'
                      ? 'Professional project management standards applied to every event'
                      : language === 'fr'
                      ? 'Normes de gestion de projet professionnelles appliquées à chaque événement'
                      : 'معايير إدارة المشاريع المهنية المطبقة على كل حدث'}
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
                      ? '100+ Events Delivered'
                      : language === 'fr'
                      ? '100+ Événements Livrés'
                      : '100+ حدث تم تسليمه'}
                  </h3>
                  <p className="text-foreground/70">
                    {language === 'en'
                      ? 'From intimate ceremonies to grand celebrations across Marrakech'
                      : language === 'fr'
                      ? 'Des cérémonies intimes aux grandes célébrations à travers Marrakech'
                      : 'من الحفلات الحميمة إلى الاحتفالات الكبرى في جميع أنحاء مراكش'}
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
