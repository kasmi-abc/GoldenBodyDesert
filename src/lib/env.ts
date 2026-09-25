import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL required"),
  NEXTAUTH_SECRET: z.string().min(16).optional(),
  REDIS_URL: z.string().optional(),
  MEILISEARCH_HOST: z.string().optional(),
  NORDOUEST_API_KEY: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

export function getEnv(): Partial<Env> {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    if (process.env.NODE_ENV === "production") {
      console.error("env validation failed", parsed.error.flatten());
    }
    return process.env as Partial<Env>;
  }
  return parsed.data;
}
