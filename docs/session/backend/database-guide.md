# Database Guide - PostgreSQL with Drizzle ORM

## Overview
Comprehensive database patterns for chat messages, form data handling, and PostgreSQL operations using Drizzle ORM for Session 2 requirements.

## 1. Chat Message Schema Design

### Core Chat Tables
```typescript
// shared/schema.ts additions for chat functionality
import { pgTable, text, varchar, timestamp, uuid, boolean, pgEnum } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Message status enum
export const messageStatusEnum = pgEnum("message_status", ["sent", "delivered", "read"]);

// Chat rooms table
export const chatRooms = pgTable("chat_rooms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  isPrivate: boolean("is_private").notNull().default(false),
  ownerId: varchar("owner_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  maxMembers: integer("max_members").default(100),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Chat messages table
export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  content: text("content").notNull(),
  roomId: varchar("room_id").notNull().references(() => chatRooms.id, { onDelete: 'cascade' }),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  parentId: varchar("parent_id").references(() => chatMessages.id), // For replies
  messageType: text("message_type").notNull().default("text"), // text, image, file, etc.
  status: messageStatusEnum("status").default("sent"),
  editedAt: timestamp("edited_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Room members table
export const roomMembers = pgTable("room_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  roomId: varchar("room_id").notNull().references(() => chatRooms.id, { onDelete: 'cascade' }),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: text("role").notNull().default("member"), // admin, moderator, member
  lastReadAt: timestamp("last_read_at"),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
}, (table) => [
  uniqueIndex("room_user_unique").on(table.roomId, table.userId)
]);

// Message reactions table
export const messageReactions = pgTable("message_reactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  messageId: varchar("message_id").notNull().references(() => chatMessages.id, { onDelete: 'cascade' }),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  emoji: text("emoji").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  uniqueIndex("message_user_emoji_unique").on(table.messageId, table.userId, table.emoji)
]);
```

### Enhanced Form Data Schema
```typescript
// Enhanced contact submissions with chat integration
export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(), 
  email: text("email").notNull(),
  company: text("company").notNull(),
  phone: text("phone"),
  companySize: text("company_size"),
  message: text("message").notNull(),
  privacyConsent: boolean("privacy_consent").notNull().default(false),
  status: text("status").notNull().default("new"), // new, in_progress, resolved
  assignedTo: varchar("assigned_to").references(() => users.id),
  priority: text("priority").default("medium"), // low, medium, high, urgent
  tags: text("tags").array(), // PostgreSQL array for tagging
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  respondedAt: timestamp("responded_at"),
});

// Demo request tracking
export const demoRequests = pgTable("demo_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contactId: varchar("contact_id").references(() => contactSubmissions.id),
  preferredDate: timestamp("preferred_date"),
  preferredTime: text("preferred_time"),
  productInterest: text("product_interest").array(),
  companySize: text("company_size"),
  currentSolution: text("current_solution"),
  budget: text("budget"),
  timeline: text("timeline"),
  requirements: text("requirements"),
  status: text("status").notNull().default("requested"), // requested, scheduled, completed, cancelled
  scheduledAt: timestamp("scheduled_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

### Type Inference
```typescript
// Infer types for TypeScript usage
export type ChatRoom = typeof chatRooms.$inferSelect;
export type InsertChatRoom = typeof chatRooms.$inferInsert;

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

export type RoomMember = typeof roomMembers.$inferSelect;
export type InsertRoomMember = typeof roomMembers.$inferInsert;

export type MessageReaction = typeof messageReactions.$inferSelect;
export type InsertMessageReaction = typeof messageReactions.$inferInsert;

export type DemoRequest = typeof demoRequests.$inferSelect;
export type InsertDemoRequest = typeof demoRequests.$inferInsert;
```

## 2. Advanced Query Patterns

### Chat Message Queries
```typescript
import { desc, eq, and, or, count, sql } from "drizzle-orm";

// Get paginated messages with user info
export async function getMessagesWithUsers(
  db: DatabaseType,
  roomId: string,
  limit: number = 50,
  offset: number = 0
) {
  return await db
    .select({
      id: chatMessages.id,
      content: chatMessages.content,
      messageType: chatMessages.messageType,
      status: chatMessages.status,
      createdAt: chatMessages.createdAt,
      editedAt: chatMessages.editedAt,
      user: {
        id: users.id,
        username: users.username,
        email: users.email
      },
      replyTo: {
        id: parentMessage.id,
        content: parentMessage.content,
        userId: parentMessage.userId
      }
    })
    .from(chatMessages)
    .leftJoin(users, eq(chatMessages.userId, users.id))
    .leftJoin(parentMessage, eq(chatMessages.parentId, parentMessage.id))
    .where(eq(chatMessages.roomId, roomId))
    .orderBy(desc(chatMessages.createdAt))
    .limit(limit)
    .offset(offset);
}

// Get messages with reaction counts
export async function getMessagesWithReactions(
  db: DatabaseType,
  roomId: string
) {
  return await db
    .select({
      id: chatMessages.id,
      content: chatMessages.content,
      userId: chatMessages.userId,
      createdAt: chatMessages.createdAt,
      reactionCounts: sql<number>`COUNT(${messageReactions.id})`.as('reaction_count')
    })
    .from(chatMessages)
    .leftJoin(messageReactions, eq(chatMessages.id, messageReactions.messageId))
    .where(eq(chatMessages.roomId, roomId))
    .groupBy(
      chatMessages.id,
      chatMessages.content,
      chatMessages.userId,
      chatMessages.createdAt
    )
    .orderBy(desc(chatMessages.createdAt));
}

// Search messages by content
export async function searchMessages(
  db: DatabaseType,
  roomId: string,
  searchTerm: string,
  limit: number = 20
) {
  return await db
    .select({
      id: chatMessages.id,
      content: chatMessages.content,
      userId: chatMessages.userId,
      createdAt: chatMessages.createdAt,
      user: {
        username: users.username
      }
    })
    .from(chatMessages)
    .leftJoin(users, eq(chatMessages.userId, users.id))
    .where(
      and(
        eq(chatMessages.roomId, roomId),
        sql`${chatMessages.content} ILIKE ${`%${searchTerm}%`}`
      )
    )
    .orderBy(desc(chatMessages.createdAt))
    .limit(limit);
}
```

### Room Management Queries
```typescript
// Get user's chat rooms with last message and unread count
export async function getUserRoomsWithActivity(
  db: DatabaseType,
  userId: string
) {
  const userRooms = await db
    .select({
      room: {
        id: chatRooms.id,
        name: chatRooms.name,
        description: chatRooms.description,
        isPrivate: chatRooms.isPrivate,
        createdAt: chatRooms.createdAt
      },
      memberInfo: {
        role: roomMembers.role,
        joinedAt: roomMembers.joinedAt,
        lastReadAt: roomMembers.lastReadAt
      }
    })
    .from(roomMembers)
    .innerJoin(chatRooms, eq(roomMembers.roomId, chatRooms.id))
    .where(eq(roomMembers.userId, userId))
    .orderBy(desc(roomMembers.joinedAt));

  // Get last message for each room
  for (const room of userRooms) {
    const lastMessage = await db
      .select({
        id: chatMessages.id,
        content: chatMessages.content,
        createdAt: chatMessages.createdAt,
        user: {
          username: users.username
        }
      })
      .from(chatMessages)
      .leftJoin(users, eq(chatMessages.userId, users.id))
      .where(eq(chatMessages.roomId, room.room.id))
      .orderBy(desc(chatMessages.createdAt))
      .limit(1);

    // Get unread count
    const unreadCount = await db
      .select({ count: count() })
      .from(chatMessages)
      .where(
        and(
          eq(chatMessages.roomId, room.room.id),
          room.memberInfo.lastReadAt
            ? sql`${chatMessages.createdAt} > ${room.memberInfo.lastReadAt}`
            : sql`1=1`
        )
      );

    (room as any).lastMessage = lastMessage[0] || null;
    (room as any).unreadCount = unreadCount[0]?.count || 0;
  }

  return userRooms;
}

// Get room members with their status
export async function getRoomMembers(
  db: DatabaseType,
  roomId: string
) {
  return await db
    .select({
      id: roomMembers.id,
      role: roomMembers.role,
      joinedAt: roomMembers.joinedAt,
      lastReadAt: roomMembers.lastReadAt,
      user: {
        id: users.id,
        username: users.username,
        email: users.email,
        createdAt: users.createdAt
      }
    })
    .from(roomMembers)
    .innerJoin(users, eq(roomMembers.userId, users.id))
    .where(eq(roomMembers.roomId, roomId))
    .orderBy(roomMembers.joinedAt);
}
```

## 3. Transaction Patterns

### Message Sending with Transaction
```typescript
export async function sendMessageTransaction(
  db: DatabaseType,
  messageData: {
    content: string;
    roomId: string;
    userId: string;
    parentId?: string;
  }
) {
  return await db.transaction(async (tx) => {
    // Insert the message
    const message = await tx
      .insert(chatMessages)
      .values({
        content: messageData.content,
        roomId: messageData.roomId,
        userId: messageData.userId,
        parentId: messageData.parentId,
        createdAt: new Date()
      })
      .returning();

    // Update room's last activity
    await tx
      .update(chatRooms)
      .set({ updatedAt: new Date() })
      .where(eq(chatRooms.id, messageData.roomId));

    // Update user's last read timestamp
    await tx
      .update(roomMembers)
      .set({ lastReadAt: new Date() })
      .where(
        and(
          eq(roomMembers.roomId, messageData.roomId),
          eq(roomMembers.userId, messageData.userId)
        )
      );

    return message[0];
  });
}
```

### Form Submission with Notifications
```typescript
export async function submitContactFormTransaction(
  db: DatabaseType,
  formData: InsertContactSubmission & {
    requestDemo?: boolean;
    demoData?: Partial<InsertDemoRequest>;
  }
) {
  return await db.transaction(async (tx) => {
    // Insert contact submission
    const submission = await tx
      .insert(contactSubmissions)
      .values({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        companySize: formData.companySize,
        message: formData.message,
        privacyConsent: formData.privacyConsent,
        submittedAt: new Date()
      })
      .returning();

    // If demo requested, create demo request
    if (formData.requestDemo && formData.demoData) {
      await tx
        .insert(demoRequests)
        .values({
          contactId: submission[0].id,
          ...formData.demoData,
          createdAt: new Date()
        });
    }

    // Create notification for admin users
    const adminUsers = await tx
      .select({ id: users.id })
      .from(users)
      .where(eq(users.role, 'admin')); // Assuming we add role to users table

    if (adminUsers.length > 0) {
      await tx
        .insert(notifications)
        .values(
          adminUsers.map(admin => ({
            userId: admin.id,
            type: 'contact_submission',
            title: 'New Contact Form Submission',
            content: `${formData.firstName} ${formData.lastName} from ${formData.company} has submitted a contact form.`,
            relatedId: submission[0].id,
            createdAt: new Date()
          }))
        );
    }

    return submission[0];
  });
}
```

## 4. Performance Optimization Patterns

### Indexing Strategy
```typescript
// Add indexes for performance
export const chatIndexes = {
  // Index for message queries by room
  messagesByRoom: index("idx_messages_room_created")
    .on(chatMessages.roomId, chatMessages.createdAt),
  
  // Index for message search
  messagesSearch: index("idx_messages_content_gin")
    .using('gin', sql`to_tsvector('english', ${chatMessages.content})`),
  
  // Index for user's rooms
  userRooms: index("idx_room_members_user")
    .on(roomMembers.userId, roomMembers.joinedAt),
  
  // Index for unread messages
  unreadMessages: index("idx_messages_room_created_composite")
    .on(chatMessages.roomId, chatMessages.createdAt),
  
  // Partial index for active submissions
  activeSubmissions: index("idx_contact_submissions_active")
    .on(contactSubmissions.status)
    .where(sql`status IN ('new', 'in_progress')`)
};
```

### Batch Operations
```typescript
// Batch insert messages (for data migration or bulk operations)
export async function batchInsertMessages(
  db: DatabaseType,
  messages: InsertChatMessage[]
) {
  const batchSize = 100;
  const results = [];

  for (let i = 0; i < messages.length; i += batchSize) {
    const batch = messages.slice(i, i + batchSize);
    const result = await db
      .insert(chatMessages)
      .values(batch)
      .returning();
    results.push(...result);
  }

  return results;
}

// Batch update read status
export async function markMessagesAsRead(
  db: DatabaseType,
  messageIds: string[],
  userId: string
) {
  if (messageIds.length === 0) return;

  // Update messages in batches
  const batchSize = 50;
  for (let i = 0; i < messageIds.length; i += batchSize) {
    const batch = messageIds.slice(i, i + batchSize);
    await db
      .update(chatMessages)
      .set({ status: 'read' })
      .where(
        and(
          sql`${chatMessages.id} = ANY(${batch})`,
          eq(chatMessages.userId, userId)
        )
      );
  }
}
```

## 5. Data Validation and Sanitization

### Database-Level Validation
```typescript
// Schema with validation constraints
export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  content: text("content")
    .notNull()
    .$type<string>(),
  roomId: varchar("room_id")
    .notNull()
    .references(() => chatRooms.id, { onDelete: 'cascade' }),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  // Add check constraints
  check("content_not_empty", sql`LENGTH(TRIM(${table.content})) > 0`),
  check("content_max_length", sql`LENGTH(${table.content}) <= 2000`)
]);
```

### Query Helpers with Validation
```typescript
// Safe message creation with validation
export async function createMessage(
  db: DatabaseType,
  data: {
    content: string;
    roomId: string;
    userId: string;
    parentId?: string;
  }
) {
  // Validate content
  if (!data.content.trim()) {
    throw new Error('Message content cannot be empty');
  }

  if (data.content.length > 2000) {
    throw new Error('Message content too long (max 2000 characters)');
  }

  // Verify user is member of room
  const membership = await db
    .select({ id: roomMembers.id })
    .from(roomMembers)
    .where(
      and(
        eq(roomMembers.roomId, data.roomId),
        eq(roomMembers.userId, data.userId)
      )
    )
    .limit(1);

  if (!membership.length) {
    throw new Error('User is not a member of this room');
  }

  // Create message
  return await db
    .insert(chatMessages)
    .values({
      content: data.content.trim(),
      roomId: data.roomId,
      userId: data.userId,
      parentId: data.parentId,
      createdAt: new Date()
    })
    .returning();
}
```

## 6. Migration Patterns

### Chat Schema Migration
```sql
-- migrations/add_chat_tables.sql
BEGIN;

-- Create enums
CREATE TYPE message_status AS ENUM ('sent', 'delivered', 'read');

-- Create chat rooms table
CREATE TABLE chat_rooms (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    is_private BOOLEAN NOT NULL DEFAULT FALSE,
    owner_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    max_members INTEGER DEFAULT 100,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create chat messages table
CREATE TABLE chat_messages (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL CHECK (LENGTH(TRIM(content)) > 0 AND LENGTH(content) <= 2000),
    room_id VARCHAR NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
    user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    parent_id VARCHAR REFERENCES chat_messages(id),
    message_type TEXT NOT NULL DEFAULT 'text',
    status message_status DEFAULT 'sent',
    edited_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create indexes
CREATE INDEX idx_messages_room_created ON chat_messages(room_id, created_at DESC);
CREATE INDEX idx_messages_user ON chat_messages(user_id);
CREATE INDEX idx_messages_parent ON chat_messages(parent_id) WHERE parent_id IS NOT NULL;

-- Create full-text search index
CREATE INDEX idx_messages_search ON chat_messages USING gin(to_tsvector('english', content));

COMMIT;
```

This comprehensive database guide provides all the patterns and queries needed for implementing robust chat functionality and form handling with PostgreSQL and Drizzle ORM.