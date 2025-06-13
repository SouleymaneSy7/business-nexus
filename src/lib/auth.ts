import { APIError, betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { authSchema } from "@/db/schema/auth-schema";
import { db } from "@/db/drizzle";
import { UserTypes } from "@/types";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        input: true,
      },
      company: {
        type: "string",
        required: false,
        input: true,
      },
      bio: {
        type: "string",
        required: false,
        input: true,
      },
      isAgreedToTerms: {
        type: "boolean",
        required: true,
        input: true,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  rateLimit: {
    window: 60,
    max: 10,
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if ((user as UserTypes).isAgreedToTerms === false) {
            throw new APIError("BAD_REQUEST", {
              message: "User must agree to the Term of service before signing up.",
            });
          }
          return {
            data: user,
          };
        },
      },
    },
  },
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
