import React, { useState } from 'react';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export const ContactSection: React.FC = () => {
  const { language } = useLanguageContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success(
        language === 'en'
          ? 'Message sent successfully! We will contact you soon.'
          : language === 'fr'
          ? 'Message envoyé avec succès! Nous vous contacterons bientôt.'
          : 'تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.'
      );
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-white">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {t('contact.title', language)}
          </h2>
          <p className="text-lg text-foreground/70">
            {t('contact.subtitle', language)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <Card className="p-8 border border-border hover:border-accent transition-colors">
            <div className="flex items-start gap-4">
              <Mail className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-primary mb-2">{t('contact.email', language)}</h3>
                <a href="mailto:studio.a.events27@gmail.com" className="text-accent hover:underline">
                  studio.a.events27@gmail.com
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-8 border border-border hover:border-accent transition-colors">
            <div className="flex items-start gap-4">
              <Phone className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-primary mb-2">{t('contact.phone', language)}</h3>
                <a href="tel:+212621695312" className="text-accent hover:underline">
                  +212 6 21 69 53 12
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-8 border border-border hover:border-accent transition-colors">
            <div className="flex items-start gap-4">
              <MapPin className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-primary mb-2">{t('contact.location', language)}</h3>
                <p className="text-accent">{t('contact.marrakech', language)}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="max-w-2xl mx-auto p-8 border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  {t('contact.form.name', language)}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                  placeholder={t('contact.form.name', language)}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  {t('contact.form.email', language)}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                  placeholder={t('contact.form.email', language)}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  {t('contact.form.phone', language)}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                  placeholder={t('contact.form.phone', language)}
                />
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  {t('contact.form.eventType', language)}
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                >
                  <option value="">{t('contact.form.eventType', language)}</option>
                  <option value="wedding">{t('services.weddings.title', language)}</option>\n                  <option value="corporate">{t('services.corporate.title', language)}</option>
                  <option value="gala">{t('services.gala.title', language)}</option>
                  <option value="private">{t('services.private.title', language)}</option>
                  <option value="photography">{t('services.photography.title', language)}</option>
                </select>
              </div>

              {/* Event Date */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-primary mb-2">
                  {t('contact.form.eventDate', language)}
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                {t('contact.form.message', language)}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                placeholder={t('contact.form.message', language)}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-semibold"
            >
              {isSubmitting
                ? language === 'en'
                  ? 'Sending...'
                  : language === 'fr'
                  ? 'Envoi...'
                  : 'جاري الإرسال...'
                : t('contact.form.submit', language)}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};
