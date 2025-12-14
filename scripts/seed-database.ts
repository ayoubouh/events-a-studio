#!/usr/bin/env tsx

/**
 * Database Seed Script
 * 
 * This script populates the database with sample data for the Events A Studio portfolio.
 * Run with: tsx scripts/seed-database.ts
 */

import { drizzle } from "drizzle-orm/mysql2";
import { projects, services, testimonials, blogPosts } from "../drizzle/schema";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("❌ DATABASE_URL is not set in environment variables");
  process.exit(1);
}

console.log("🌱 Starting database seeding...\n");

const db = drizzle(databaseUrl);

async function seedProjects() {
  console.log("📁 Seeding projects...");
  
  const sampleProjects = [
    {
      title: "Royal Moroccan Wedding at La Mamounia",
      description: "A luxurious traditional Moroccan wedding featuring stunning zellige patterns and opulent décor.",
      longDescription: "This breathtaking wedding combined centuries-old Moroccan traditions with contemporary elegance at the prestigious La Mamounia hotel. Over 300 guests experienced an unforgettable celebration featuring traditional Moroccan music, exquisite cuisine, and meticulously crafted décor that honored the couple's heritage.",
      category: "wedding",
      imageUrl: "/images/projects/wedding-mamounia.jpg",
      galleryImages: JSON.stringify([
        "/images/projects/wedding-mamounia-1.jpg",
        "/images/projects/wedding-mamounia-2.jpg",
        "/images/projects/wedding-mamounia-3.jpg"
      ]),
      location: "La Mamounia, Marrakech",
      date: new Date("2024-06-15"),
      client: "Private Client",
      featured: 1,
      published: 1,
      order: 100
    },
    {
      title: "International Corporate Gala - Tech Summit 2024",
      description: "A sophisticated corporate event bringing together industry leaders for networking and innovation.",
      longDescription: "We orchestrated a seamless three-day technology summit featuring keynote presentations, breakout sessions, and evening galas. The event showcased cutting-edge production values with integrated AV systems, stage design, and comprehensive event management.",
      category: "corporate",
      imageUrl: "/images/projects/tech-summit.jpg",
      galleryImages: JSON.stringify([
        "/images/projects/tech-summit-1.jpg",
        "/images/projects/tech-summit-2.jpg"
      ]),
      location: "Palais des Congrès, Marrakech",
      date: new Date("2024-03-20"),
      client: "TechCorp International",
      featured: 1,
      published: 1,
      order: 90
    },
    {
      title: "Intimate Garden Engagement Party",
      description: "A charming traditional Khotouba celebration in a private riad garden.",
      longDescription: "This intimate engagement ceremony (خطوبة) honored Moroccan customs in an enchanting garden setting. We curated every detail from traditional Moroccan tea service to contemporary floral arrangements, creating a perfect blend of old and new.",
      category: "wedding",
      imageUrl: "/images/projects/engagement-garden.jpg",
      galleryImages: JSON.stringify([
        "/images/projects/engagement-1.jpg",
        "/images/projects/engagement-2.jpg"
      ]),
      location: "Private Riad, Medina",
      date: new Date("2024-05-10"),
      featured: 0,
      published: 1,
      order: 80
    },
    {
      title: "Luxury Brand Product Launch",
      description: "An exclusive product launch event for a high-end fashion brand.",
      longDescription: "We transformed a historic palace into a contemporary showcase for luxury brand positioning. The event featured runway presentations, immersive brand experiences, and curated hospitality for VIP guests and press.",
      category: "corporate",
      imageUrl: "/images/projects/brand-launch.jpg",
      location: "El Badi Palace, Marrakech",
      date: new Date("2024-04-05"),
      client: "Luxury Fashion House",
      featured: 0,
      published: 1,
      order: 70
    },
    {
      title: "Milestone Birthday Celebration",
      description: "A spectacular 50th birthday party with Moroccan elegance and modern flair.",
      longDescription: "This milestone celebration brought together family and friends from around the world for an unforgettable weekend. We designed a sophisticated atmosphere featuring live entertainment, gourmet dining, and personalized touches throughout.",
      category: "private",
      imageUrl: "/images/projects/birthday-celebration.jpg",
      location: "Private Villa, Palmeraie",
      date: new Date("2024-02-14"),
      featured: 0,
      published: 1,
      order: 60
    }
  ];

  for (const project of sampleProjects) {
    await db.insert(projects).values(project);
  }
  
  console.log(`✅ Created ${sampleProjects.length} sample projects\n`);
}

async function seedServices() {
  console.log("🎯 Seeding services...");
  
  const sampleServices = [
    {
      title: "Moroccan Weddings",
      titleFr: "Mariages Marocains",
      titleAr: "حفلات الزفاف المغربية",
      description: "Traditional Moroccan weddings and engagement ceremonies with authentic cultural elements and modern elegance.",
      descriptionFr: "Mariages marocains traditionnels et cérémonies de fiançailles avec des éléments culturels authentiques et une élégance moderne.",
      descriptionAr: "حفلات الزفاف المغربية التقليدية وحفلات الخطوبة مع عناصر ثقافية أصيلة وأناقة عصرية.",
      icon: "wedding",
      category: "wedding",
      features: JSON.stringify([
        "Traditional Henna ceremonies",
        "Complete day-of coordination",
        "Authentic Moroccan décor",
        "Cultural music & entertainment",
        "Multilingual coordination"
      ]),
      price: "Starting from 15,000 EUR",
      published: 1,
      order: 100
    },
    {
      title: "Corporate Events & Galas",
      titleFr: "Événements d'Entreprise & Galas",
      titleAr: "فعاليات الشركات والحفلات الرسمية",
      description: "Professional event management for corporate conferences, product launches, and gala dinners.",
      descriptionFr: "Gestion d'événements professionnels pour conférences d'entreprise, lancements de produits et dîners de gala.",
      descriptionAr: "إدارة احترافية للفعاليات للمؤتمرات الشركاتية وإطلاق المنتجات وحفلات العشاء الرسمية.",
      icon: "briefcase",
      category: "corporate",
      features: JSON.stringify([
        "PMP-certified project management",
        "AV & production coordination",
        "Venue sourcing & negotiation",
        "Budget management",
        "Risk mitigation strategies"
      ]),
      price: "Custom pricing",
      published: 1,
      order: 90
    },
    {
      title: "Photography & Creative Direction",
      titleFr: "Photographie & Direction Créative",
      titleAr: "التصوير الفوتوغرافي والتوجيه الإبداعي",
      description: "Professional event photography, couple shoots, and full creative direction services.",
      descriptionFr: "Photographie d'événements professionnels, séances photo de couple et services complets de direction créative.",
      descriptionAr: "تصوير احترافي للفعاليات، جلسات تصوير الأزواج، وخدمات التوجيه الإبداعي الشاملة.",
      icon: "camera",
      category: "studio",
      features: JSON.stringify([
        "Full-day event coverage",
        "Couple & engagement shoots",
        "Professional editing",
        "High-resolution delivery",
        "Creative mood boarding"
      ]),
      price: "Starting from 2,500 EUR",
      published: 1,
      order: 80
    },
    {
      title: "Private Celebrations",
      titleFr: "Fêtes Privées",
      titleAr: "الحفلات الخاصة",
      description: "Intimate gatherings, milestone birthdays, and private parties with personalized planning.",
      descriptionFr: "Rassemblements intimes, anniversaires importants et fêtes privées avec planification personnalisée.",
      descriptionAr: "التجمعات الحميمة، أعياد الميلاد المهمة، والحفلات الخاصة مع التخطيط الشخصي.",
      icon: "party",
      category: "private",
      features: JSON.stringify([
        "Customized theme development",
        "Vendor coordination",
        "Guest experience design",
        "Entertainment booking",
        "Complete setup & breakdown"
      ]),
      price: "Starting from 5,000 EUR",
      published: 1,
      order: 70
    }
  ];

  for (const service of sampleServices) {
    await db.insert(services).values(service);
  }
  
  console.log(`✅ Created ${sampleServices.length} services\n`);
}

async function seedTestimonials() {
  console.log("💬 Seeding testimonials...");
  
  const sampleTestimonials = [
    {
      name: "Sarah & Mohammed",
      role: "Wedding Clients",
      company: "",
      content: "Ayoub transformed our wedding into a magical experience that perfectly honored our Moroccan heritage while feeling fresh and modern. Every detail was flawlessly executed.",
      contentFr: "Ayoub a transformé notre mariage en une expérience magique qui a parfaitement honoré notre patrimoine marocain tout en restant frais et moderne.",
      contentAr: "حول أيوب حفل زفافنا إلى تجربة سحرية احترمت تراثنا المغربي بشكل مثالي مع الحفاظ على الطابع العصري.",
      rating: 5,
      published: 1
    },
    {
      name: "David Chen",
      role: "CEO",
      company: "TechCorp International",
      content: "The professionalism and attention to detail was outstanding. Ayoub's PMP background showed in every aspect of our corporate summit. Highly recommended!",
      contentFr: "Le professionnalisme et l'attention aux détails étaient exceptionnels. L'expérience PMP d'Ayoub s'est manifestée dans chaque aspect de notre sommet d'entreprise.",
      contentAr: "كان الاحتراف والاهتمام بالتفاصيل متميزًا. ظهرت خبرة أيوب في إدارة المشاريع في كل جانب من جوانب قمتنا الشركاتية.",
      rating: 5,
      published: 1
    },
    {
      name: "Laila Benjelloun",
      role: "Private Client",
      company: "",
      content: "For my mother's 60th birthday, Ayoub created an intimate yet spectacular celebration. The photography was breathtaking and captured every precious moment.",
      contentFr: "Pour les 60 ans de ma mère, Ayoub a créé une célébration intime mais spectaculaire. La photographie était à couper le souffle.",
      contentAr: "لعيد ميلاد والدتي الستين، أنشأ أيوب احتفالًا حميميًا ومذهلاً. كان التصوير الفوتوغرافي خلابًا.",
      rating: 5,
      published: 1
    },
    {
      name: "Emily Roberts",
      role: "Destination Wedding",
      company: "",
      content: "As foreigners planning a wedding in Marrakech, we were nervous. Ayoub made everything seamless and helped us navigate the cultural aspects beautifully.",
      contentFr: "En tant qu'étrangers organisant un mariage à Marrakech, nous étions nerveux. Ayoub a tout rendu fluide et nous a aidés à naviguer magnifiquement les aspects culturels.",
      contentAr: "كأجانب نخطط لحفل زفاف في مراكش، كنا قلقين. جعل أيوب كل شيء سلسًا وساعدنا في فهم الجوانب الثقافية بشكل جميل.",
      rating: 5,
      published: 1
    }
  ];

  for (const testimonial of sampleTestimonials) {
    await db.insert(testimonials).values(testimonial);
  }
  
  console.log(`✅ Created ${sampleTestimonials.length} testimonials\n`);
}

async function seedBlogPosts() {
  console.log("📝 Seeding blog posts...");
  
  const samplePosts = [
    {
      title: "Planning Your Dream Moroccan Wedding: A Complete Guide",
      titleFr: "Planifier votre mariage marocain de rêve : un guide complet",
      titleAr: "تخطيط حفل زفافك المغربي المثالي: دليل شامل",
      slug: "planning-dream-moroccan-wedding",
      excerpt: "Everything you need to know about planning an authentic Moroccan wedding in Marrakech, from traditional ceremonies to modern touches.",
      content: "Planning a Moroccan wedding involves understanding rich cultural traditions while incorporating your personal style...",
      contentFr: "Planifier un mariage marocain implique de comprendre les riches traditions culturelles tout en incorporant votre style personnel...",
      contentAr: "يتضمن التخطيط لحفل زفاف مغربي فهم التقاليد الثقافية الغنية مع دمج أسلوبك الشخصي...",
      featuredImage: "/images/blog/moroccan-wedding-guide.jpg",
      category: "Wedding Planning",
      tags: JSON.stringify(["weddings", "moroccan-culture", "planning-tips"]),
      published: 1,
      publishedAt: new Date("2024-01-15"),
      viewCount: 0
    },
    {
      title: "5 Must-Have Elements for a Successful Corporate Event",
      titleFr: "5 éléments essentiels pour un événement d'entreprise réussi",
      titleAr: "5 عناصر أساسية لفعالية شركاتية ناجحة",
      slug: "corporate-event-success-elements",
      excerpt: "Learn the key components that make corporate events memorable and effective, from PMP principles to creative execution.",
      content: "Successful corporate events require careful planning and execution. Here are the five essential elements...",
      contentFr: "Les événements d'entreprise réussis nécessitent une planification et une exécution minutieuses...",
      contentAr: "تتطلب الفعاليات الشركاتية الناجحة تخطيطًا وتنفيذًا دقيقين...",
      featuredImage: "/images/blog/corporate-events.jpg",
      category: "Corporate Events",
      tags: JSON.stringify(["corporate", "event-management", "business"]),
      published: 1,
      publishedAt: new Date("2024-02-20"),
      viewCount: 0
    },
    {
      title: "Behind the Lens: Capturing Marrakech's Magic",
      titleFr: "Derrière l'objectif : capturer la magie de Marrakech",
      titleAr: "وراء العدسة: التقاط سحر مراكش",
      slug: "capturing-marrakech-magic",
      excerpt: "A photographer's guide to the most stunning locations and lighting in Marrakech for unforgettable event photography.",
      content: "Marrakech offers endless photographic opportunities. From the golden hour in the Palmeraie to the dramatic architecture of riads...",
      contentFr: "Marrakech offre des opportunités photographiques infinies. De l'heure dorée dans la Palmeraie à l'architecture dramatique des riads...",
      contentAr: "تقدم مراكش فرصًا تصويرية لا نهائية. من الساعة الذهبية في النخيل إلى العمارة الدرامية للرياضات...",
      featuredImage: "/images/blog/marrakech-photography.jpg",
      category: "Photography",
      tags: JSON.stringify(["photography", "marrakech", "creative"]),
      published: 1,
      publishedAt: new Date("2024-03-10"),
      viewCount: 0
    }
  ];

  for (const post of samplePosts) {
    await db.insert(blogPosts).values(post);
  }
  
  console.log(`✅ Created ${samplePosts.length} blog posts\n`);
}

async function main() {
  try {
    await seedProjects();
    await seedServices();
    await seedTestimonials();
    await seedBlogPosts();
    
    console.log("✨ Database seeding completed successfully!");
    console.log("\nYou can now:");
    console.log("  • View projects at /projects");
    console.log("  • Browse services at /services");
    console.log("  • Read testimonials on the homepage");
    console.log("  • Check the blog at /blog");
    
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
  
  process.exit(0);
}

main();
