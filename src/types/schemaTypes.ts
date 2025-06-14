import { users } from "@/db/schema/auth-schema";
import {
  chatMessages,
  chatRooms,
  collaborationRequests,
  entrepreneurProfiles,
  investorProfiles,
} from "@/db/schema/data-schema";

export type UserDBTypes = typeof users.$inferSelect;
export type NewUserDBTypes = typeof users.$inferInsert;
export type InvestorProfileDBTypes = typeof investorProfiles.$inferSelect;
export type NewInvestorProfileDBTypes = typeof investorProfiles.$inferInsert;
export type EntrepreneurProfileDBTypes = typeof entrepreneurProfiles.$inferSelect;
export type NewEntrepreneurProfileDBTypes = typeof entrepreneurProfiles.$inferInsert;
export type CollaborationRequestDBTypes = typeof collaborationRequests.$inferSelect;
export type NewCollaborationRequestDBTypes = typeof collaborationRequests.$inferInsert;
export type ChatMessageDBTypes = typeof chatMessages.$inferSelect;
export type NewChatMessageDBTypes = typeof chatMessages.$inferInsert;
export type ChatRoomDBTypes = typeof chatRooms.$inferSelect;
export type NewChatRoomDBTypes = typeof chatRooms.$inferInsert;
