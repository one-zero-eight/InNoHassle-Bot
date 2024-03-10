import * as dotenv from "dotenv";
import { z } from "zod";

const ConfigSchema = z.object({ BOT_TOKEN: z.string() });

await dotenv.load({
  // envPath: "./.env",
  export: true,
});

const config = ConfigSchema.parse(Deno.env.toObject());
export default config;
