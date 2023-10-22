import { load } from "dotenv";
import { z } from "zod";

export const Config = z.object({ BOT_TOKEN: z.string() });
export type Config = z.infer<typeof Config>;

async function loadConfig(): Promise<Config> {
  await load({ /* envPath: "./.env", */ export: true });
  return await Config.parseAsync(Deno.env.toObject());
}

export const config = await loadConfig();
