# Database Setup Guide

This guide will help you set up the database for the Events A Studio portfolio website.

## Overview

The application uses **Drizzle ORM** with **MySQL** as the database. The schema includes tables for:

- **Users** - Authentication and user management
- **Projects** - Portfolio projects (weddings, corporate events, etc.)
- **Services** - Service offerings with multilingual support
- **Testimonials** - Client testimonials with multilingual support
- **Contact Submissions** - Contact form submissions and inquiries
- **Blog Posts** - Content management with multilingual support
- **Chat Conversations** - AI chatbot conversation history

## Prerequisites

You need one of the following databases:

### Option 1: PlanetScale (Recommended for Production)
- Free tier available
- No connection limits
- Automatic backups
- Good for serverless deployments

### Option 2: Local MySQL Server
- Good for development
- Full control over data
- Requires MySQL 8.0+

### Option 3: Other MySQL Providers
- AWS RDS MySQL
- DigitalOcean Managed MySQL
- Google Cloud SQL for MySQL

## Setup Instructions

### Step 1: Create Database

#### For PlanetScale:
1. Create account at https://planetscale.com
2. Create new database
3. Copy the connection string

#### For Local MySQL:
```bash
# Install MySQL (Ubuntu/Debian)
sudo apt update
sudo apt install mysql-server

# Start MySQL service
sudo systemctl start mysql

# Create database
mysql -u root -p
CREATE DATABASE events_studio;
CREATE USER 'events_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON events_studio.* TO 'events_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 2: Configure Environment Variables

Create a `.env` file in the project root:

```env
# Database Configuration
DATABASE_URL="mysql://username:password@host:port/database"

# Example for PlanetScale:
# DATABASE_URL="mysql://xxxxxxxxxx:pscale_pw_xxxx@aws.connect.psdb.cloud/events_studio?ssl={"rejectUnauthorized":true}"

# Example for Local MySQL:
# DATABASE_URL="mysql://events_user:your_password@localhost:3306/events_studio"

# Other required environment variables
JWT_SECRET="your-secret-key-here"
VITE_APP_ID="your-app-id"
OAUTH_SERVER_URL="your-oauth-server"
OWNER_OPEN_ID="your-owner-openid"

# Optional: Manus API for AI features
BUILT_IN_FORGE_API_URL="https://api.example.com"
BUILT_IN_FORGE_API_KEY="your-api-key"
```

### Step 3: Install Dependencies

```bash
pnpm install
```

### Step 4: Generate and Run Migrations

```bash
# Generate migration files from schema
pnpm drizzle-kit generate

# Push changes to database
pnpm db:push
```

This will create all the necessary tables in your database.

### Step 5: Seed Database (Optional)

To populate your database with sample data:

```bash
# Run the seed script
node --env-file=.env scripts/seed-database.js
```

## Database Schema

### Projects Table
Stores portfolio projects with support for galleries and categorization.

**Key Fields:**
- `category`: "wedding", "corporate", "private", "tourism"
- `featured`: Flag for homepage display
- `published`: Draft/published status
- `galleryImages`: JSON array of image URLs

### Services Table
Multilingual service offerings.

**Key Fields:**
- `title`, `titleFr`, `titleAr`: Multilingual titles
- `description`, `descriptionFr`, `descriptionAr`: Descriptions
- `category`: Service category grouping
- `features`: JSON array of service features

### Testimonials Table
Client testimonials with ratings.

**Key Fields:**
- `content`, `contentFr`, `contentAr`: Multilingual content
- `rating`: 1-5 star rating
- `projectId`: Optional link to related project

### Contact Submissions Table
Form submissions and inquiry tracking.

**Key Fields:**
- `status`: "new", "contacted", "quoted", "closed"
- `eventType`: Type of event (wedding, corporate, etc.)
- `eventDate`: Preferred event date
- `notes`: Internal notes for follow-up

### Blog Posts Table
Content management with multilingual support.

**Key Fields:**
- `slug`: URL-friendly identifier
- `content`, `contentFr`, `contentAr`: Multilingual content
- `published`: Draft/published status
- `publishedAt`: Publication date
- `tags`: JSON array of tags

## Database Operations

### Common Queries

```typescript
import { 
  getProjects, 
  getServices, 
  createContactSubmission 
} from './server/db';

// Get featured projects
const featured = await getProjects({ featured: true });

// Get wedding projects
const weddings = await getProjects({ category: 'wedding' });

// Get all services
const services = await getServices();

// Create contact submission
await createContactSubmission({
  name: "John Doe",
  email: "john@example.com",
  message: "Interested in wedding planning",
  eventType: "wedding"
});
```

## Maintenance

### Backup Database

#### PlanetScale:
Automatic backups are included in all plans.

#### Local MySQL:
```bash
mysqldump -u events_user -p events_studio > backup.sql
```

### Restore Database

```bash
mysql -u events_user -p events_studio < backup.sql
```

### Update Schema

1. Modify `drizzle/schema.ts`
2. Generate new migration: `pnpm drizzle-kit generate`
3. Apply migration: `pnpm db:push`

## Troubleshooting

### Connection Issues

**Error: "DATABASE_URL is required"**
- Make sure `.env` file exists with `DATABASE_URL` set

**Error: "Connection refused"**
- Check if MySQL server is running
- Verify host, port, and credentials
- Check firewall settings

**Error: "SSL connection error" (PlanetScale)**
- Ensure connection string includes SSL parameters
- Use the full connection string from PlanetScale dashboard

### Migration Issues

**Error: "Table already exists"**
- Drop tables or create fresh database
- Review migration files in `drizzle/` directory

**Error: "Column not found"**
- Ensure migrations are applied in order
- Check for pending migrations

## Security Best Practices

1. **Never commit `.env` file** - Already in `.gitignore`
2. **Use strong database passwords** - Minimum 16 characters
3. **Limit database user permissions** - Grant only necessary privileges
4. **Enable SSL connections** - Especially for remote databases
5. **Regular backups** - Automate backup process
6. **Monitor access logs** - Track unusual activity

## Development vs Production

### Development
- Can use local MySQL or SQLite
- Enable query logging for debugging
- Smaller dataset for faster testing

### Production
- Use managed MySQL service (PlanetScale, AWS RDS)
- Enable SSL connections
- Set up automated backups
- Monitor performance metrics
- Use connection pooling

## Additional Resources

- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [PlanetScale Documentation](https://planetscale.com/docs)
- [MySQL Documentation](https://dev.mysql.com/doc/)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Drizzle ORM documentation
3. Check application logs for detailed error messages
