import { z } from "zod";

const ZEventGroups = z.object({
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
type EventGroups = z.infer<typeof ZEventGroups>;

const API_EVENT_GROUPS = new URL(
  "https://api.innohassle.ru/events/v0/event-groups/",
);

export async function get(url: URL = API_EVENT_GROUPS): Promise<EventGroups> {
  const response = await fetch(url);
  const data = await response.json();
  const eventGroups = await ZEventGroups.parseAsync(data);
  return eventGroups;
}
