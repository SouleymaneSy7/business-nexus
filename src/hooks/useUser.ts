import * as React from "react";

import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";

import { users } from "@/db/schema/auth-schema";
import { entrepreneurProfiles, investorProfiles } from "@/db/schema/data-schema";

import { UserTypes } from "@/types";
import { EntrepreneurProfileDBTypes, InvestorProfileDBTypes } from "@/types/schemaTypes";

type UserWithProfileTypes = UserTypes & {
  profile: InvestorProfileDBTypes | EntrepreneurProfileDBTypes | null;
};

export function useUser(userId: string) {
  const [user, setUser] = React.useState<UserWithProfileTypes | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await db.select().from(users).where(eq(users.id, userId)).limit(1);

        if (userData.length === 0) {
          throw new Error("User not found");
        }

        const userWithProfile = {
          ...userData[0],
          profile: null as any,
        };

        // Fetch profile based on role
        if (userWithProfile.role === "investor") {
          const investorProfile = await db
            .select()
            .from(investorProfiles)
            .where(eq(investorProfiles.userId, userId))
            .limit(1);

          userWithProfile.profile = investorProfile[0] || null;
        } else if (userWithProfile.role === "entrepreneur") {
          const entrepreneurProfile = await db
            .select()
            .from(entrepreneurProfiles)
            .where(eq(entrepreneurProfiles.userId, userId))
            .limit(1);

          userWithProfile.profile = entrepreneurProfile[0] || null;
        }
        userWithProfile;

        setUser(userWithProfile as UserWithProfileTypes);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return { user, loading, error };
}
