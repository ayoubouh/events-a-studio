import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Chat conversations table
export const chatConversations = mysqlTable("chatConversations", {
  id: int("id").autoincrement().primaryKey(),
  visitorId: varchar("visitorId", { length: 64 }).notNull(),
  messages: text("messages").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ChatConversation = typeof chatConversations.$inferSelect;
export type InsertChatConversation = typeof chatConversations.$inferInsert;

// Portfolio Projects table
export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  longDescription: text("longDescription"),
  category: varchar("category", { length: 100 }).notNull(), // e.g., "wedding", "corporate", "private"
  imageUrl: text("imageUrl"),
  galleryImages: text("galleryImages"), // JSON array of image URLs
  location: varchar("location", { length: 255 }),
  date: timestamp("date"),
  client: varchar("client", { length: 255 }),
  featured: int("featured").default(0).notNull(), // 0 = false, 1 = true
  published: int("published").default(1).notNull(), // 0 = draft, 1 = published
  order: int("order").default(0).notNull(), // for custom ordering
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

// Services table
export const services = mysqlTable("services", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  titleFr: varchar("titleFr", { length: 255 }),
  titleAr: varchar("titleAr", { length: 255 }),
  description: text("description").notNull(),
  descriptionFr: text("descriptionFr"),
  descriptionAr: text("descriptionAr"),
  icon: varchar("icon", { length: 100 }), // icon name or URL
  category: varchar("category", { length: 100 }).notNull(),
  features: text("features"), // JSON array of features
  price: varchar("price", { length: 100 }),
  published: int("published").default(1).notNull(),
  order: int("order").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Service = typeof services.$inferSelect;
export type InsertService = typeof services.$inferInsert;

// Testimonials table
export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }),
  company: varchar("company", { length: 255 }),
  content: text("content").notNull(),
  contentFr: text("contentFr"),
  contentAr: text("contentAr"),
  rating: int("rating").default(5).notNull(),
  imageUrl: text("imageUrl"),
  projectId: int("projectId"), // optional link to project
  published: int("published").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

// Contact submissions table
export const contactSubmissions = mysqlTable("contactSubmissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  eventType: varchar("eventType", { length: 100 }), // wedding, corporate, etc.
  eventDate: timestamp("eventDate"),
  status: mysqlEnum("status", ["new", "contacted", "quoted", "closed"]).default("new").notNull(),
  notes: text("notes"), // internal notes
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

// Blog posts table (for news, tips, behind-the-scenes content)
export const blogPosts = mysqlTable("blogPosts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  titleFr: varchar("titleFr", { length: 255 }),
  titleAr: varchar("titleAr", { length: 255 }),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  contentFr: text("contentFr"),
  contentAr: text("contentAr"),
  featuredImage: text("featuredImage"),
  category: varchar("category", { length: 100 }),
  tags: text("tags"), // JSON array of tags
  authorId: int("authorId"), // link to users table
  published: int("published").default(0).notNull(),
  publishedAt: timestamp("publishedAt"),
  viewCount: int("viewCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;