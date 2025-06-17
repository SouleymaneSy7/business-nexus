import { pgTable, uuid, varchar, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(), 
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: text("role").notNull(),
  company: text("company"),
  bio: text("bio"),
});

export const session = pgTable("session", {
  id: uuid("id").primaryKey().defaultRandom(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: uuid("id").primaryKey().defaultRandom(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: uuid("id").primaryKey().defaultRandom(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => /* @__PURE__ */ new Date()),
});

// Investor profiles
export const investorProfiles = pgTable("investor_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
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
    .references(() => user.id, { onDelete: "cascade" }),
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
    .references(() => user.id),
  entrepreneurId: uuid("entrepreneur_id")
    .notNull()
    .references(() => user.id),
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
    .references(() => user.id),
  receiverId: uuid("receiver_id")
    .notNull()
    .references(() => user.id),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Chat rooms
export const chatRooms = pgTable("chat_rooms", {
  id: uuid("id").primaryKey().defaultRandom(),
  participant1Id: uuid("participant1_id")
    .notNull()
    .references(() => user.id),
  participant2Id: uuid("participant2_id")
    .notNull()
    .references(() => user.id),
  lastMessageAt: timestamp("last_message_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(user, ({ one, many }) => ({
  investorProfile: one(investorProfiles, {
    fields: [user.id],
    references: [investorProfiles.userId],
  }),
  entrepreneurProfile: one(entrepreneurProfiles, {
    fields: [user.id],
    references: [entrepreneurProfiles.userId],
  }),
  sentRequests: many(collaborationRequests, { relationName: "investor" }),
  receivedRequests: many(collaborationRequests, { relationName: "entrepreneur" }),
  sentMessages: many(chatMessages, { relationName: "sender" }),
  receivedMessages: many(chatMessages, { relationName: "receiver" }),
}));

export const investorProfilesRelations = relations(investorProfiles, ({ one }) => ({
  user: one(user, {
    fields: [investorProfiles.userId],
    references: [user.id],
  }),
}));

export const entrepreneurProfilesRelations = relations(entrepreneurProfiles, ({ one }) => ({
  user: one(user, {
    fields: [entrepreneurProfiles.userId],
    references: [user.id],
  }),
}));

export const collaborationRequestsRelations = relations(collaborationRequests, ({ one }) => ({
  investor: one(user, {
    fields: [collaborationRequests.investorId],
    references: [user.id],
    relationName: "investor",
  }),
  entrepreneur: one(user, {
    fields: [collaborationRequests.entrepreneurId],
    references: [user.id],
    relationName: "entrepreneur",
  }),
}));

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  sender: one(user, {
    fields: [chatMessages.senderId],
    references: [user.id],
    relationName: "sender",
  }),
  receiver: one(user, {
    fields: [chatMessages.receiverId],
    references: [user.id],
    relationName: "receiver",
  }),
}));

export const authSchema = {
  user,
  session,
  account,
  verification,
};

export const dataSchema = {
  investorProfiles,
  entrepreneurProfiles,
  collaborationRequests,
  chatMessages,
  chatRooms,
};
