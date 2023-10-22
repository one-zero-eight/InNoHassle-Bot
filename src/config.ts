import { load } from "dotenv";
import { z } from "zod";

const Config = z.object({ BOT_TOKEN: z.string() });

await load({
  // envPath: "./.env",
  export: true,
});

export const config = await Config.parseAsync(Deno.env.toObject());
