import { z } from "zod";

const ZSchedules = z.object({
  groups: z.array(
    z.object({
      id: z.number(),
      alias: z.string(),
      updated_at: z.string().transform((str) => new Date(str)),
      created_at: z.string().transform((str) => new Date(str)),
      path: z.string(),
      name: z.string(),
      description: z.string(),
      tags: z.array(
        z.object({
          id: z.number(),
          alias: z.string(),
          type: z.string(),
          name: z.string(),
        }),
      ),
    }),
  ),
});
type Schedules = z.infer<typeof ZSchedules>;

const API_EVENT_GROUPS = new URL(
  "https://api.innohassle.ru/events/v0/event-groups/",
);

export async function get(url: URL = API_EVENT_GROUPS): Promise<Schedules> {
  const response = await fetch(url);
  const data = await response.json();
  const schedules = await ZSchedules.parseAsync(data);
  return schedules;
}
