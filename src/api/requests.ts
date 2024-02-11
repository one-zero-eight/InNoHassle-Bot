import { z, ZodSchema } from "zod";

export async function get<T extends ZodSchema>(
  url: URL,
  schema: T,
): Promise<z.infer<T>> {
  const response = await fetch(url);
  const data = await response.json();
  const result = schema.parseAsync(data);
  return result;
}
