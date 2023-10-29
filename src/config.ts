import { load } from "dotenv";
import { z } from "zod";

const ZConfig = z.object({ BOT_TOKEN: z.string() });

await load({
  // envPath: "./.env",
  export: true,
});

export const config = await ZConfig.parseAsync(Deno.env.toObject());
