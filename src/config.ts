import { load } from "dotenv";

export interface BotConfig {
  BOT_TOKEN: string;
}

async function loadConfig(): Promise<BotConfig> {
  await load({ export: true });
  const config = {} as BotConfig;

  const variables = ["BOT_TOKEN"] as const;

  for (const key of variables) {
    const value = Deno.env.get(key);

    if (!value) {
      throw new Error(`The \`${key}\` environment variable isn't set.`);
    }

    config[key] = value;
  }

  return config;
}

export const config = await loadConfig();
