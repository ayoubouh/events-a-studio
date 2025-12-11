import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  chatConversations,
  projects,
  services,
  testimonials,
  contactSubmissions,
  blogPosts,
  InsertProject,
  InsertService,
  InsertTestimonial,
  InsertContactSubmission,
  InsertBlogPost
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function saveChatConversation(visitorId: string, messages: any[]) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot save chat: database not available");
    return;
  }

  try {
    await db.insert(chatConversations).values({
      visitorId,
      messages: JSON.stringify(messages),
    }).onDuplicateKeyUpdate({
      set: {
        messages: JSON.stringify(messages),
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("[Database] Failed to save chat conversation:", error);
  }
}

export async function getChatConversation(visitorId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get chat: database not available");
    return null;
  }

  try {
    const result = await db.select().from(chatConversations).where(eq(chatConversations.visitorId, visitorId)).limit(1);
    if (result.length > 0) {
      return {
        ...result[0],
        messages: JSON.parse(result[0].messages),
      };
    }
    return null;
  } catch (error) {
    console.error("[Database] Failed to get chat conversation:", error);
    return null;
  }
}

// ===== PROJECTS QUERIES =====

export async function getProjects(options?: { featured?: boolean; category?: string; published?: boolean }) {
  const db = await getDb();
  if (!db) return [];

  try {
    let query = db.select().from(projects);
    
    const conditions = [];
    if (options?.featured) conditions.push(eq(projects.featured, 1));
    if (options?.category) conditions.push(eq(projects.category, options.category));
    if (options?.published !== false) conditions.push(eq(projects.published, 1));
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }
    
    const result = await query.orderBy(desc(projects.order), desc(projects.createdAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get projects:", error);
    return [];
  }
}

export async function getProjectById(id: number) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get project:", error);
    return null;
  }
}

export async function createProject(project: InsertProject) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.insert(projects).values(project);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create project:", error);
    return null;
  }
}

export async function updateProject(id: number, project: Partial<InsertProject>) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.update(projects).set(project).where(eq(projects.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to update project:", error);
    return null;
  }
}

// ===== SERVICES QUERIES =====

export async function getServices(published = true) {
  const db = await getDb();
  if (!db) return [];

  try {
    let query = db.select().from(services);
    if (published) {
      query = query.where(eq(services.published, 1)) as any;
    }
    const result = await query.orderBy(desc(services.order));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get services:", error);
    return [];
  }
}

export async function createService(service: InsertService) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.insert(services).values(service);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create service:", error);
    return null;
  }
}

// ===== TESTIMONIALS QUERIES =====

export async function getTestimonials(published = true) {
  const db = await getDb();
  if (!db) return [];

  try {
    let query = db.select().from(testimonials);
    if (published) {
      query = query.where(eq(testimonials.published, 1)) as any;
    }
    const result = await query.orderBy(desc(testimonials.createdAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get testimonials:", error);
    return [];
  }
}

export async function createTestimonial(testimonial: InsertTestimonial) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.insert(testimonials).values(testimonial);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create testimonial:", error);
    return null;
  }
}

// ===== CONTACT SUBMISSIONS QUERIES =====

export async function createContactSubmission(submission: InsertContactSubmission) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.insert(contactSubmissions).values(submission);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create contact submission:", error);
    return null;
  }
}

export async function getContactSubmissions(status?: string) {
  const db = await getDb();
  if (!db) return [];

  try {
    let query = db.select().from(contactSubmissions);
    if (status) {
      query = query.where(eq(contactSubmissions.status, status as any)) as any;
    }
    const result = await query.orderBy(desc(contactSubmissions.createdAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get contact submissions:", error);
    return [];
  }
}

export async function updateContactSubmission(id: number, updates: Partial<InsertContactSubmission>) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.update(contactSubmissions).set(updates).where(eq(contactSubmissions.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to update contact submission:", error);
    return null;
  }
}

// ===== BLOG POSTS QUERIES =====

export async function getBlogPosts(published = true) {
  const db = await getDb();
  if (!db) return [];

  try {
    let query = db.select().from(blogPosts);
    if (published) {
      query = query.where(eq(blogPosts.published, 1)) as any;
    }
    const result = await query.orderBy(desc(blogPosts.publishedAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get blog posts:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get blog post:", error);
    return null;
  }
}

export async function createBlogPost(post: InsertBlogPost) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.insert(blogPosts).values(post);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create blog post:", error);
    return null;
  }
}
