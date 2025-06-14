import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./auth-schema";

// Investor profiles
export const investorProfiles = pgTable("investor_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  investmentInterests: text("investment_interests"),
  portfolioCompanies: jsonb("portfolio_companies"), // Array of portfolio companies
  investmentRange: varchar("investment_range", { length: 100 }),
  sectors: jsonb("sectors"), // Array of preferred sectors
  location: varchar("location", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Entrepreneur profiles
export const entrepreneurProfiles = pgTable("entrepreneur_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  startupName: varchar("startup_name", { length: 255 }),
  startupDescription: text("startup_description"),
  pitchSummary: text("pitch_summary"),
  fundingNeed: varchar("funding_need", { length: 100 }),
  pitchDeckUrl: text("pitch_deck_url"),
  stage: varchar("stage", { length: 50 }), // seed, series-a, etc.
  sector: varchar("sector", { length: 100 }),
  location: varchar("location", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  sectors: jsonb("sectors"), // Utiliser le même type que investorProfiles
});

// Collaboration status
export const CollaborationStatus = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
} as const;

// Collaboration requests
export const collaborationRequests = pgTable("collaboration_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  investorId: uuid("investor_id")
    .notNull()
    .references(() => users.id),
  entrepreneurId: uuid("entrepreneur_id")
    .notNull()
    .references(() => users.id),
  message: text("message"),
  status: varchar("status", { length: 50 }).default(CollaborationStatus.PENDING).notNull(), // pending, accepted, rejected
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Chat messages
export const chatMessages = pgTable("chat_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  senderId: uuid("sender_id")
    .notNull()
    .references(() => users.id),
  receiverId: uuid("receiver_id")
    .notNull()
    .references(() => users.id),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Chat rooms
export const chatRooms = pgTable("chat_rooms", {
  id: uuid("id").primaryKey().defaultRandom(),
  participant1Id: uuid("participant1_id")
    .notNull()
    .references(() => users.id),
  participant2Id: uuid("participant2_id")
    .notNull()
    .references(() => users.id),
  lastMessageAt: timestamp("last_message_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  investorProfile: one(investorProfiles, {
    fields: [users.id],
    references: [investorProfiles.userId],
  }),
  entrepreneurProfile: one(entrepreneurProfiles, {
    fields: [users.id],
    references: [entrepreneurProfiles.userId],
  }),
  sentRequests: many(collaborationRequests, { relationName: "investor" }),
  receivedRequests: many(collaborationRequests, { relationName: "entrepreneur" }),
  sentMessages: many(chatMessages, { relationName: "sender" }),
  receivedMessages: many(chatMessages, { relationName: "receiver" }),
}));

export const investorProfilesRelations = relations(investorProfiles, ({ one }) => ({
  user: one(users, {
    fields: [investorProfiles.userId],
    references: [users.id],
  }),
}));

export const entrepreneurProfilesRelations = relations(entrepreneurProfiles, ({ one }) => ({
  user: one(users, {
    fields: [entrepreneurProfiles.userId],
    references: [users.id],
  }),
}));

export const collaborationRequestsRelations = relations(collaborationRequests, ({ one }) => ({
  investor: one(users, {
    fields: [collaborationRequests.investorId],
    references: [users.id],
    relationName: "investor",
  }),
  entrepreneur: one(users, {
    fields: [collaborationRequests.entrepreneurId],
    references: [users.id],
    relationName: "entrepreneur",
  }),
}));

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  sender: one(users, {
    fields: [chatMessages.senderId],
    references: [users.id],
    relationName: "sender",
  }),
  receiver: one(users, {
    fields: [chatMessages.receiverId],
    references: [users.id],
    relationName: "receiver",
  }),
}));
