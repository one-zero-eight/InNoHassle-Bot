import * as dotenv from "dotenv";
import { z } from "zod";

const ConfigSchema = z.object({ BOT_TOKEN: z.string() });

await dotenv.load({
  // envPath: "./.env",
  export: true,
});

const config = await ConfigSchema.parseAsync(Deno.env.toObject());
export default config;
