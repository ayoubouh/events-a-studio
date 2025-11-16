import React from 'react';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const { language } = useLanguageContext();

  const steps = [
    { key: 'step1' },
    { key: 'step2' },
    { key: 'step3' },
    { key: 'step4' },
    { key: 'step5' },
    { key: 'step6' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-background">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {t('process.title', language)}
          </h2>
          <p className="text-lg text-foreground/70">
            {t('process.subtitle', language)}
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-8 mb-12 relative">
              {/* Timeline Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-20 w-1 h-24 bg-gradient-to-b from-accent to-accent/20" />
              )}

              {/* Step Number Circle */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
              </div>

              {/* Step Content */}
              <Card className="flex-1 p-6 border border-border hover:border-accent hover:shadow-md transition-all">
                <h3 className="text-xl font-bold text-primary mb-2">
                  {t(`process.${step.key}.title`, language)}
                </h3>
                <p className="text-foreground/70">
                  {t(`process.${step.key}.description`, language)}
                </p>
              </Card>
            </div>
          ))}
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-border">
          {[
            {
              title: language === 'en' ? 'Professional Standards' : language === 'fr' ? 'Normes Professionnelles' : 'معايير احترافية',
              desc: language === 'en' ? 'PMP-certified project management' : language === 'fr' ? 'Gestion de projet certifiée PMP' : 'إدارة مشروع معتمدة من PMP',
            },
            {
              title: language === 'en' ? 'Risk Mitigation' : language === 'fr' ? 'Atténuation des Risques' : 'تخفيف المخاطر',
              desc: language === 'en' ? 'Proactive planning and contingencies' : language === 'fr' ? 'Planification proactive et plans d\'urgence' : 'التخطيط الاستباقي والخطط البديلة',
            },
            {
              title: language === 'en' ? 'Creative Excellence' : language === 'fr' ? 'Excellence Créative' : 'التميز الإبداعي',
              desc: language === 'en' ? 'Artistic vision meets execution' : language === 'fr' ? 'La vision artistique rencontre l\'exécution' : 'الرؤية الفنية تلتقي بالتنفيذ',
            },
          ].map((benefit, index) => (
            <div key={index} className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-primary mb-1">{benefit.title}</h4>
                <p className="text-sm text-foreground/70">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
