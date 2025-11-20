import React from 'react';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language } = useLanguageContext();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('contact.title', language)}</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail size={20} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{t('contact.email', language)}</p>
              <a href="mailto:studio.a.events27@gmail.com" className="text-accent hover:underline">
                studio.a.events27@gmail.com
              </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={20} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{t('contact.phone', language)}</p>
              <a href="tel:+212621695312" className="text-accent hover:underline">
                +212 6 21 69 53 12
              </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{t('contact.location', language)}</p>
                  <p className="text-accent">{t('contact.marrakech', language)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('nav.services', language)}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#weddings" className="hover:text-accent transition-colors">{t('services.weddings.title', language)}</a></li>
              <li><a href="#services" className="hover:text-accent transition-colors">{t('services.corporate.title', language)}</a></li>
              <li><a href="#studio" className="hover:text-accent transition-colors">{t('services.photography.title', language)}</a></li>
              <li><a href="#services" className="hover:text-accent transition-colors">{t('services.private.title', language)}</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.followUs', language)}</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/eventsastudio"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-accent text-accent-foreground rounded-lg hover:opacity-80 transition-opacity"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com/eventsastudio"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-accent text-accent-foreground rounded-lg hover:opacity-80 transition-opacity"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://linkedin.com/in/ayoub-ouhaddou"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-accent text-accent-foreground rounded-lg hover:opacity-80 transition-opacity"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>
            &copy; {currentYear} Events, A studio. {t('footer.allRights', language)}.
          </p>
          <p className="text-accent">{t('footer.designedBy', language)}</p>
        </div>
      </div>
    </footer>
  );
};
