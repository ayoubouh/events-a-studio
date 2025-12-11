# Database Quick Start Guide

Get your database up and running in 5 minutes!

## 🚀 Quick Setup

### 1. Choose Your Database

**Option A: PlanetScale (Easiest - Recommended)**
```bash
# Sign up at https://planetscale.com (free tier available)
# Create a new database
# Copy the connection string
```

**Option B: Local MySQL**
```bash
# Install MySQL
sudo apt install mysql-server  # Ubuntu/Debian
brew install mysql             # macOS

# Create database
mysql -u root -p
CREATE DATABASE events_studio;
EXIT;
```

### 2. Configure Environment

```bash
# Copy example environment file
cp .env.example .env

# Edit .env and add your DATABASE_URL
nano .env  # or use your favorite editor
```

Example `.env`:
```env
DATABASE_URL="mysql://user:pass@localhost:3306/events_studio"
JWT_SECRET="your-secret-key-here"
```

### 3. Run Migrations

```bash
# Install dependencies (if not done already)
pnpm install

# Generate and apply database migrations
pnpm db:push
```

This creates all the tables: users, projects, services, testimonials, contact submissions, blog posts, and chat conversations.

### 4. Seed Sample Data (Optional)

```bash
# Populate database with example content
pnpm db:seed
```

This adds:
- 5 sample projects (weddings, corporate events)
- 4 services (multilingual)
- 4 testimonials
- 3 blog posts

### 5. Verify Setup

```bash
# Open Drizzle Studio to view your data
pnpm db:studio
```

Opens a web interface at `http://localhost:4983` to browse your database.

## 📊 Database Tables

Your portfolio now includes:

| Table | Purpose | Key Features |
|-------|---------|--------------|
| **users** | Authentication | OAuth integration, roles |
| **projects** | Portfolio items | Categories, galleries, featured flag |
| **services** | Service offerings | Multilingual (EN/FR/AR) |
| **testimonials** | Client reviews | Ratings, multilingual |
| **contactSubmissions** | Lead management | Status tracking, event types |
| **blogPosts** | Content | Multilingual, SEO-friendly |
| **chatConversations** | AI chat history | Visitor tracking |

## 🎯 Common Tasks

### View Database Content
```bash
pnpm db:studio
```

### Add New Migration
```bash
# 1. Edit drizzle/schema.ts
# 2. Generate migration
pnpm db:generate

# 3. Apply migration
pnpm db:migrate
```

### Reset Database (Development Only!)
```bash
# Drop all tables and recreate
mysql -u root -p events_studio < reset.sql

# Or in MySQL:
DROP DATABASE events_studio;
CREATE DATABASE events_studio;

# Then re-run migrations
pnpm db:push
pnpm db:seed
```

## 🔧 Using the Database in Code

### Query Projects
```typescript
import { getProjects } from './server/db';

// Get all published projects
const projects = await getProjects();

// Get featured projects only
const featured = await getProjects({ featured: true });

// Get wedding projects
const weddings = await getProjects({ category: 'wedding' });
```

### Handle Contact Forms
```typescript
import { createContactSubmission } from './server/db';

await createContactSubmission({
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "+212 6 XX XX XX XX",
  subject: "Wedding Planning Inquiry",
  message: "I'd like to discuss planning my wedding...",
  eventType: "wedding",
  eventDate: new Date("2025-06-15"),
  status: "new"
});
```

### Display Services
```typescript
import { getServices } from './server/db';

const services = await getServices(true); // published only
```

### Show Testimonials
```typescript
import { getTestimonials } from './server/db';

const testimonials = await getTestimonials();
```

## 🌐 Multilingual Content

All content tables support English, French, and Arabic:

```typescript
// Service with multilingual content
const service = {
  title: "Corporate Events",
  titleFr: "Événements d'Entreprise",
  titleAr: "فعاليات الشركات",
  description: "Professional event management...",
  descriptionFr: "Gestion d'événements professionnels...",
  descriptionAr: "إدارة احترافية للفعاليات..."
};
```

## 🐛 Troubleshooting

### "DATABASE_URL is required"
✅ Check that `.env` file exists with `DATABASE_URL` set

### "Connection refused"
✅ Ensure MySQL is running: `sudo systemctl status mysql`
✅ Check credentials in DATABASE_URL

### "Table already exists"
✅ This is normal if you've run migrations before
✅ To start fresh, drop and recreate the database

### SSL connection error (PlanetScale)
✅ Use the full connection string from PlanetScale dashboard
✅ Ensure SSL parameters are included

## 📚 Next Steps

1. ✅ Database is set up and running
2. 🎨 Customize the sample data in `scripts/seed-database.ts`
3. 🔌 Connect your frontend components to the database
4. 📝 Add more tables as your portfolio grows
5. 🚀 Deploy with managed MySQL (PlanetScale recommended)

## 🆘 Need Help?

- 📖 Full documentation: `DATABASE_SETUP.md`
- 🔍 Check server logs for detailed errors
- 💬 Review Drizzle ORM docs: https://orm.drizzle.team/

---

**Your database is ready! Start building your amazing portfolio.** ✨
