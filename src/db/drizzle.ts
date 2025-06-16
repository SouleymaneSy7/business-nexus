import postgres from "postgres";
import { config } from "dotenv";
import { users } from "./schema/auth-schema";
import { drizzle } from "drizzle-orm/postgres-js";

config({ path: ".env" });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL environment variable is not defined");

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false });
export const db = drizzle({ client, casing: "snake_case" });

const allUsers = await db.select().from(users);
console.log(allUsers);
