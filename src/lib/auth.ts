import { db } from '@/db/drizzle';
import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { authSchema } from '@/db/schema';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: authSchema,
  }),
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        defaultValue: 'investor',
        input: true,
      },
      isAgreedToTerms: {
        type: 'boolean',
        required: true,
        defaultValue: false,
        input: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  // databaseHooks: {
  //   user: {
  //     create: {
  //       before: async (user, ctx) => {
  //         if (user.isAgreedToTerms === false) {
  //           // Your special condition.
  //           // Send the API error.
  //           throw new APIError('BAD_REQUEST', {
  //             message: 'User must agree to the Term of service before signing up.',
  //           });
  //         }
  //         return {
  //           data: user,
  //         };
  //       },
  //     },
  //   },
  // },
  plugins: [nextCookies()],
});
