// Trilingual translations for Events, A studio
// Languages: English (en), French (fr), Arabic (ar)

export type Language = 'en' | 'fr' | 'ar';

export const translations = {
  // Navigation & Header
  nav: {
    home: { en: 'Home', fr: 'Accueil', ar: 'الرئيسية' },
    services: { en: 'Services', fr: 'Services', ar: 'الخدمات' },
    weddings: { en: 'Weddings', fr: 'Mariages', ar: 'حفلات الزفاف' },
    studio: { en: 'The Studio', fr: 'Le Studio', ar: 'الاستوديو' },
    about: { en: 'About', fr: 'À Propos', ar: 'عننا' },
    contact: { en: 'Contact', fr: 'Contact', ar: 'اتصل بنا' },
  },

  // Brand & Hero
  brand: {
    name: { en: 'Events, A studio', fr: 'Events, A studio', ar: 'إيڤنتس، إيه ستوديو' },
    tagline: { en: 'Join Us', fr: 'Rejoignez-Nous', ar: 'انضم إلينا' },
    slogan: { en: 'Your moment, our creation', fr: 'Votre moment notre création', ar: 'لحظتك، إبداعنا' },
    heroHeadline: { en: 'Expert Event Management & Creative Direction in Marrakech', fr: 'Gestion d\'Événements Experte & Direction Créative à Marrakech', ar: 'إدارة فعاليات احترافية وتوجيه إبداعي في مراكش' },
    heroSubheadline: { en: 'We blend PMP precision with studio creativity to deliver unforgettable experiences', fr: 'Nous fusionnons la précision PMP avec la créativité d\'un studio pour des expériences inoubliables', ar: 'نمزج دقة إدارة المشاريع (PMP) بالإبداع الفني لتقديم تجارب لا تُنسى' },
  },

  // Services Section
  services: {
    title: { en: 'Our Services', fr: 'Nos Services', ar: 'خدماتنا' },
    subtitle: { en: 'From intimate gatherings to grand celebrations', fr: 'Des réunions intimes aux grandes célébrations', ar: 'من التجمعات الحميمة إلى الاحتفالات الكبرى' },
    
    weddings: {
      title: { en: 'Moroccan Weddings', fr: 'Mariages Marocains', ar: 'حفلات الزفاف المغربية' },
      description: { en: 'Celebrate your love with traditional Moroccan elegance and modern luxury', fr: 'Célébrez votre amour avec l\'élégance marocaine traditionnelle et le luxe moderne', ar: 'احتفل بحبك بأناقة مغربية تقليدية وفخامة حديثة' },
    },
    engagements: {
      title: { en: 'Engagement Ceremonies (خطوبة)', fr: 'Cérémonies de Fiançailles (خطوبة)', ar: 'حفلات الخطوبة' },
      description: { en: 'Mark the beginning of your journey with a memorable engagement celebration', fr: 'Marquez le début de votre voyage avec une célébration de fiançailles mémorable', ar: 'ابدأ رحلتك بحفل خطوبة لا يُنسى' },
    },
    corporate: {
      title: { en: 'Corporate Events', fr: 'Événements d\'Entreprise', ar: 'فعاليات الشركات' },
      description: { en: 'Professional execution for conferences, launches, and team-building experiences', fr: 'Exécution professionnelle pour les conférences, les lancements et les expériences de team-building', ar: 'تنفيذ احترافي للمؤتمرات والإطلاقات وتجارب بناء الفرق' },
    },
    gala: {
      title: { en: 'Gala Dinners', fr: 'Dîners de Gala', ar: 'حفلات العشاء الرسمية' },
      description: { en: 'Elegant evening events with refined dining and entertainment', fr: 'Événements en soirée élégants avec restauration raffinée et divertissement', ar: 'فعاليات مسائية أنيقة مع خدمات طعام راقية والترفيه' },
    },
    private: {
      title: { en: 'Private Parties & Birthdays', fr: 'Fêtes Privées & Anniversaires', ar: 'الحفلات الخاصة وأعياد الميلاد' },
      description: { en: 'Personalized celebrations tailored to your vision and style', fr: 'Célébrations personnalisées adaptées à votre vision et votre style', ar: 'احتفالات مخصصة تناسب رؤيتك وأسلوبك' },
    },
    photography: {
      title: { en: 'Photography & Videography', fr: 'Photographie & Vidéographie', ar: 'التصوير الفوتوغرافي والفيديو' },
      description: { en: 'Professional capture of your most precious moments with artistic direction', fr: 'Capture professionnelle de vos moments les plus précieux avec direction artistique', ar: 'التقاط احترافي لأغلى لحظاتك مع التوجيه الفني' },
    },
    tourism: {
      title: { en: 'Tourism Experiences', fr: 'Expériences Touristiques', ar: 'التجارب السياحية' },
      description: { en: 'Curated experiences that showcase the beauty and culture of Marrakech', fr: 'Expériences sélectionnées qui mettent en valeur la beauté et la culture de Marrakech', ar: 'تجارب منتقاة تعرض جمال وثقافة مراكش' },
    },
  },

  // Our Process Section
  process: {
    title: { en: 'Our PMP-Standard Process', fr: 'Notre Processus Norme PMP', ar: 'عمليتنا وفقاً لمعايير PMP' },
    subtitle: { en: 'Professional project management from concept to completion', fr: 'Gestion de projet professionnelle du concept à la réalisation', ar: 'إدارة مشروع احترافية من المفهوم إلى الإنجاز' },
    
    step1: {
      title: { en: 'Scoping & Discovery', fr: 'Définition & Découverte', ar: 'تحديد النطاق والاستكشاف' },
      description: { en: 'We listen, understand your vision, and define clear objectives and scope', fr: 'Nous écoutons, comprenons votre vision et définissons des objectifs et un périmètre clairs', ar: 'نستمع ونفهم رؤيتك ونحدد الأهداف والنطاق بوضوح' },
    },
    step2: {
      title: { en: 'Budgeting & Timeline', fr: 'Budgétisation & Calendrier', ar: 'الميزانية والجدول الزمني' },
      description: { en: 'Detailed financial planning and PMP-standard timeline creation for success', fr: 'Planification financière détaillée et création de calendrier selon les normes PMP', ar: 'التخطيط المالي المفصل وإنشاء جدول زمني وفقاً لمعايير PMP' },
    },
    step3: {
      title: { en: 'Creative Design', fr: 'Conception Créative', ar: 'التصميم الإبداعي' },
      description: { en: 'Developing the aesthetic, theme, and creative direction for your event', fr: 'Développement de l\'esthétique, du thème et de la direction créative de votre événement', ar: 'تطوير الجمالية والموضوع والتوجيه الإبداعي لحدثك' },
    },
    step4: {
      title: { en: 'Vendor Coordination', fr: 'Coordination des Fournisseurs', ar: 'تنسيق البائعين' },
      description: { en: 'Securing and managing suppliers with proactive risk mitigation', fr: 'Sécurisation et gestion des fournisseurs avec atténuation proactive des risques', ar: 'تأمين وإدارة البائعين مع تخفيف المخاطر بشكل استباقي' },
    },
    step5: {
      title: { en: 'Flawless Execution', fr: 'Exécution Impeccable', ar: 'التنفيذ الخالي من العيوب' },
      description: { en: 'On-site management and continuous communication for perfect delivery', fr: 'Gestion sur site et communication continue pour une livraison parfaite', ar: 'الإدارة الميدانية والتواصل المستمر للتسليم المثالي' },
    },
    step6: {
      title: { en: 'Follow-up & Delivery', fr: 'Suivi & Livraison', ar: 'المتابعة والتسليم' },
      description: { en: 'Final reporting, asset delivery, and lasting memories', fr: 'Rapport final, livraison des actifs et souvenirs durables', ar: 'التقرير النهائي وتسليم الأصول والذكريات الدائمة' },
    },
  },

  // About Section
  about: {
    title: { en: 'About Events, A studio', fr: 'À Propos d\'Events, A studio', ar: 'عن Events, A studio' },
    headline: { en: 'Meet Ayoub Ouhaddou', fr: 'Rencontrez Ayoub Ouhaddou', ar: 'تعرف على أيوب أوحدو' },
    bio: {
      en: 'With over a decade of experience in event management, creative direction, and project execution, Ayoub brings a unique blend of business acumen and artistic vision to every project. Based in Marrakech, we specialize in creating unforgettable experiences that honor tradition while embracing modern luxury.',
      fr: 'Avec plus d\'une décennie d\'expérience en gestion d\'événements, direction créative et exécution de projets, Ayoub apporte un mélange unique de perspicacité commerciale et de vision artistique à chaque projet. Basé à Marrakech, nous nous spécialisons dans la création d\'expériences inoubliables qui honorent la tradition tout en embrassant le luxe moderne.',
      ar: 'مع أكثر من عقد من الخبرة في إدارة الفعاليات والتوجيه الإبداعي وتنفيذ المشاريع، يجلب أيوب مزيجاً فريداً من الحنكة التجارية والرؤية الفنية لكل مشروع. بناءً في مراكش، نتخصص في إنشاء تجارب لا تُنسى تحترم التقاليد بينما تحتضن الفخامة الحديثة.',
    },
    expertise: {
      en: 'Mission: Votre Moment, Notre Creation. Specializing in Moroccan weddings, engagement ceremonies, corporate events, professional photography, and tourism experiences.',
      fr: 'Expertise dans les mariages marocains, les événements d\'entreprise, la direction créative, la photographie et les expériences touristiques',
      ar: 'الخبرة في حفلات الزفاف المغربية والفعاليات الشركاتية والتوجيه الإبداعي والتصوير الفوتوغرافي والتجارب السياحية',
    },
  },

  // CTAs
  cta: {
    startProject: { en: 'Start Your Project', fr: 'Démarrer Votre Projet', ar: 'ابدأ مشروعك' },
    requestQuote: { en: 'Request a Quote', fr: 'Demander un Devis', ar: 'طلب عرض سعر' },
    planWedding: { en: 'Plan Your Dream Moroccan Wedding', fr: 'Planifiez Votre Mariage Marocain de Rêve', ar: 'خطط لحفل زفافك المغربي المثالي' },
    getInTouch: { en: 'Get in Touch', fr: 'Contactez-Nous', ar: 'تواصل معنا' },
    learnMore: { en: 'Learn More', fr: 'En Savoir Plus', ar: 'تعرف على المزيد' },
    viewPortfolio: { en: 'View Portfolio', fr: 'Voir le Portefeuille', ar: 'عرض المحفظة' },
  },

  // Contact Section
  contact: {
    title: { en: 'Get in Touch', fr: 'Contactez-Nous', ar: 'تواصل معنا' },
    subtitle: { en: 'Let\'s create something extraordinary together', fr: 'Créons quelque chose d\'extraordinaire ensemble', ar: 'لننشئ معاً شيئاً استثنائياً' },
    email: { en: 'Email', fr: 'E-mail', ar: 'البريد الإلكتروني' },
    phone: { en: 'Phone', fr: 'Téléphone', ar: 'الهاتف' },
    location: { en: 'Location', fr: 'Localisation', ar: 'الموقع' },
    marrakech: { en: 'Marrakech, Morocco', fr: 'Marrakech, Maroc', ar: 'مراكش، المغرب' },
    form: {
      name: { en: 'Your Name', fr: 'Votre Nom', ar: 'اسمك' },
      email: { en: 'Your Email', fr: 'Votre E-mail', ar: 'بريدك الإلكتروني' },
      phone: { en: 'Your Phone', fr: 'Votre Téléphone', ar: 'هاتفك' },
      eventType: { en: 'Event Type', fr: 'Type d\'Événement', ar: 'نوع الحدث' },
      eventDate: { en: 'Event Date', fr: 'Date de l\'Événement', ar: 'تاريخ الحدث' },
      message: { en: 'Message', fr: 'Message', ar: 'الرسالة' },
      submit: { en: 'Send Message', fr: 'Envoyer le Message', ar: 'إرسال الرسالة' },
    },
  },

  // Footer
  footer: {
    followUs: { en: 'Follow Us', fr: 'Suivez-Nous', ar: 'تابعنا' },
    allRights: { en: 'All rights reserved', fr: 'Tous droits réservés', ar: 'جميع الحقوق محفوظة' },
    designedBy: { en: 'Designed with creativity and precision', fr: 'Conçu avec créativité et précision', ar: 'مصمم بالإبداع والدقة' },
  },

  // Language Selector
  language: {
    english: { en: 'English', fr: 'Anglais', ar: 'الإنجليزية' },
    french: { en: 'Français', fr: 'Français', ar: 'الفرنسية' },
    arabic: { en: 'العربية', fr: 'Arabe', ar: 'العربية' },
  },

  // Chat
  chat: {
    placeholder: { en: 'Ask about our services, pricing, or availability...', fr: 'Posez des questions sur nos services, nos tarifs ou notre disponibilité...', ar: 'اسأل عن خدماتنا أو الأسعار أو التوفر...' },
    send: { en: 'Send', fr: 'Envoyer', ar: 'إرسال' },
    language: { en: 'Language', fr: 'Langue', ar: 'اللغة' },
  },
};

// Helper function to get translation
export const t = (key: string, lang: Language): string => {
  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value?.[lang] || key;
};
