import { type User, type InsertUser, type ContactSubmission, type InsertContactSubmission, type NewsletterSubscription, type InsertNewsletterSubscription, users, contactSubmissions, newsletterSubscriptions } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./supabase";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsernameOrEmail(usernameOrEmail: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
  getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactSubmissions: Map<string, ContactSubmission>;
  private newsletterSubscriptions: Map<string, NewsletterSubscription>;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.newsletterSubscriptions = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async getUserByUsernameOrEmail(usernameOrEmail: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === usernameOrEmail || user.email === usernameOrEmail,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      emailVerified: "false",
      verificationToken: null,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = {
      ...insertSubmission,
      phone: insertSubmission.phone || null,
      companySize: insertSubmission.companySize || null,
      privacyConsent: insertSubmission.privacyConsent || "false",
      id,
      submittedAt: new Date(),
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }

  async createNewsletterSubscription(insertSubscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const id = randomUUID();
    const subscription: NewsletterSubscription = {
      ...insertSubscription,
      id,
      subscribedAt: new Date(),
    };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }

  async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return Array.from(this.newsletterSubscriptions.values());
  }

  async getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined> {
    return Array.from(this.newsletterSubscriptions.values()).find(
      (subscription) => subscription.email === email,
    );
  }
}

export class SupabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async getUserByUsernameOrEmail(usernameOrEmail: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(
      eq(users.username, usernameOrEmail)
    ).limit(1);
    
    if (result[0]) {
      return result[0];
    }
    
    // If not found by username, try by email
    const emailResult = await db.select().from(users).where(
      eq(users.email, usernameOrEmail)
    ).limit(1);
    
    return emailResult[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const result = await db.insert(contactSubmissions).values(insertSubmission).returning();
    return result[0];
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions);
  }

  async createNewsletterSubscription(insertSubscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const result = await db.insert(newsletterSubscriptions).values(insertSubscription).returning();
    return result[0];
  }

  async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return await db.select().from(newsletterSubscriptions);
  }

  async getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined> {
    const result = await db.select().from(newsletterSubscriptions).where(eq(newsletterSubscriptions.email, email)).limit(1);
    return result[0];
  }
}

// Use Supabase storage if credentials are available, otherwise fall back to memory storage
export const storage = process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY 
  ? new SupabaseStorage() 
  : new MemStorage();
