export type UserRole = "investor" | "entrepreneur";

export interface UserTypes {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyName?: string;
  bio?: string;
  emailVerified: boolean;
  isAgreedToTerms: boolean;
  createdAt: Date;
  updatedAt: Date;
}
