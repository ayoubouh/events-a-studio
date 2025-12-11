# Events A Studio - Database Documentation

## 🎉 Database Successfully Added!

Your portfolio now has a complete database system with all the tables needed for a professional event management website.

## What's Been Added?

### 📊 New Database Tables

1. **projects** - Portfolio showcase
   - Store wedding, corporate, and private event projects
   - Support for image galleries
   - Featured/published flags for content control
   - Custom ordering

2. **services** - Service offerings
   - Multilingual support (English, French, Arabic)
   - Categorization (wedding, corporate, studio, private)
   - Features as JSON array
   - Pricing information

3. **testimonials** - Client reviews
   - Multilingual testimonials
   - 5-star rating system
   - Optional project linking
   - Client details (name, role, company)

4. **contactSubmissions** - Lead management
   - Contact form data capture
   - Event type and date tracking
   - Status workflow (new → contacted → quoted → closed)
   - Internal notes field

5. **blogPosts** - Content management
   - Multilingual blog content
   - SEO-friendly slugs
   - Categories and tags
   - View counter
   - Draft/published workflow

### 🔧 Database Helper Functions

All tables have corresponding helper functions in `server/db.ts`:

```typescript
// Projects
getProjects({ featured, category, published })
getProjectById(id)
createProject(project)
updateProject(id, updates)

// Services
getServices(published)
createService(service)

// Testimonials
getTestimonials(published)
createTestimonial(testimonial)

// Contact Submissions
createContactSubmission(submission)
getContactSubmissions(status)
updateContactSubmission(id, updates)

// Blog Posts
getBlogPosts(published)
getBlogPostBySlug(slug)
createBlogPost(post)
```

### 📁 New Files Created

1. **DATABASE_SETUP.md** - Complete setup guide with troubleshooting
2. **DATABASE_QUICK_START.md** - 5-minute quick start guide
3. **.env.example** - Environment variable template
4. **scripts/seed-database.ts** - Sample data seeder
5. **drizzle/schema.ts** - Extended with new tables

### 📦 Updated Files

1. **package.json** - Added database management scripts:
   - `npm run db:generate` - Generate migrations
   - `npm run db:migrate` - Apply migrations
   - `npm run db:push` - Generate & apply (combined)
   - `npm run db:studio` - Open Drizzle Studio UI
   - `npm run db:seed` - Populate sample data

2. **server/db.ts** - Added CRUD functions for all tables

## 🚀 Getting Started

### Step 1: Set Up Your Database

Choose one of these options:

**Option A: PlanetScale (Recommended)**
1. Sign up at https://planetscale.com
2. Create a new database
3. Copy the connection string

**Option B: Local MySQL**
```bash
# Install MySQL
sudo apt install mysql-server

# Create database
mysql -u root -p
CREATE DATABASE events_studio;
```

### Step 2: Configure Environment

```bash
# Copy the example file
cp .env.example .env

# Edit and add your DATABASE_URL
nano .env
```

Add this to `.env`:
```env
DATABASE_URL="mysql://username:password@host:port/events_studio"
```

### Step 3: Run Migrations

```bash
# Install dependencies (if not done)
npm install

# Apply database schema
npm run db:push
```

### Step 4: Add Sample Data (Optional)

```bash
npm run db:seed
```

This creates:
- 5 example projects (weddings, corporate events, parties)
- 4 services (multilingual)
- 4 client testimonials
- 3 blog posts

### Step 5: Verify

```bash
# Open database browser
npm run db:studio
```

Visit http://localhost:4983 to see your data!

## 💡 Example Usage

### Display Projects on Homepage

```typescript
import { getProjects } from './server/db';

// In your API route or server component
export async function GET(request: Request) {
  const featuredProjects = await getProjects({ 
    featured: true, 
    published: true 
  });
  
  return Response.json(featuredProjects);
}
```

### Handle Contact Form

```typescript
import { createContactSubmission } from './server/db';

export async function POST(request: Request) {
  const data = await request.json();
  
  await createContactSubmission({
    name: data.name,
    email: data.email,
    phone: data.phone,
    subject: data.subject,
    message: data.message,
    eventType: data.eventType,
    eventDate: data.eventDate ? new Date(data.eventDate) : null,
    status: "new"
  });
  
  return Response.json({ success: true });
}
```

### Display Services Page

```typescript
import { getServices } from './server/db';

export async function loader() {
  const services = await getServices(true); // published only
  return { services };
}
```

## 🌐 Multilingual Support

The database supports three languages for content:

```typescript
{
  title: "Corporate Events",
  titleFr: "Événements d'Entreprise", 
  titleAr: "فعاليات الشركات",
  description: "Professional event management services...",
  descriptionFr: "Services de gestion d'événements professionnels...",
  descriptionAr: "خدمات إدارة الفعاليات المهنية..."
}
```

Use language detection in your frontend to display the appropriate version.

## 📈 Database Schema Overview

```
┌─────────────────┐
│     users       │  ← Authentication
├─────────────────┤
│ id              │
│ openId          │
│ name            │
│ email           │
│ role            │
└─────────────────┘

┌─────────────────┐
│   projects      │  ← Portfolio items
├─────────────────┤
│ id              │
│ title           │
│ description     │
│ category        │
│ imageUrl        │
│ galleryImages   │  (JSON)
│ featured        │
│ published       │
└─────────────────┘

┌─────────────────┐
│   services      │  ← Service offerings
├─────────────────┤
│ id              │
│ title/Fr/Ar     │  (Multilingual)
│ description...  │
│ category        │
│ features        │  (JSON)
│ price           │
└─────────────────┘

┌─────────────────┐
│ testimonials    │  ← Client reviews
├─────────────────┤
│ id              │
│ name            │
│ content/Fr/Ar   │  (Multilingual)
│ rating          │
│ projectId       │
└─────────────────┘

┌─────────────────┐
│contactSubmissio │  ← Lead management
├─────────────────┤
│ id              │
│ name, email     │
│ message         │
│ eventType       │
│ status          │
│ notes           │
└─────────────────┘

┌─────────────────┐
│  blogPosts      │  ← Content/Blog
├─────────────────┤
│ id              │
│ title/Fr/Ar     │  (Multilingual)
│ slug            │
│ content...      │
│ published       │
│ viewCount       │
└─────────────────┘
```

## 🔐 Security Best Practices

1. ✅ Never commit `.env` file (already in `.gitignore`)
2. ✅ Use strong passwords for DATABASE_URL
3. ✅ Limit database user permissions in production
4. ✅ Enable SSL for remote connections
5. ✅ Regular backups (automatic with PlanetScale)
6. ✅ Validate all user inputs before database operations

## 🛠️ Development vs Production

### Development
- Use local MySQL or SQLite
- Enable query logging
- Use sample data from seed script
- Run `npm run db:studio` for easy browsing

### Production
- Use managed service (PlanetScale recommended)
- Enable SSL connections
- Set up automated backups
- Monitor query performance
- Use connection pooling

## 📝 Next Steps

1. ✅ Database schema is ready
2. 🔌 Connect your frontend components
3. 🎨 Customize the sample data
4. 📱 Build API routes for CRUD operations
5. 🚀 Deploy to production

## 🆘 Need Help?

- 📖 **Quick Start**: See `DATABASE_QUICK_START.md`
- 📚 **Full Documentation**: See `DATABASE_SETUP.md`
- 🐛 **Troubleshooting**: Check the troubleshooting sections in setup guides
- 🔍 **Drizzle Docs**: https://orm.drizzle.team/

## ✨ Summary

Your portfolio database is now complete with:
- ✅ 7 tables covering all portfolio needs
- ✅ Multilingual support (EN/FR/AR)
- ✅ Helper functions for easy database operations
- ✅ Sample data seeder
- ✅ Complete documentation
- ✅ Development tools (Drizzle Studio)

**Ready to build an amazing portfolio!** 🎉
