import { z } from "zod";
import * as requests from "~/api/requests.ts";

const API_EVENT_GROUPS: URL = new URL(
  "https://api.innohassle.ru/events/v0/event-groups/",
);

const EventGroupsSchema = z.object({
  groups: z.array(
    z
      .object({
        id: z.number(),
        alias: z.string(),
        // `updatedAt`
        "updated_at": z.string().transform((str) => new Date(str)),
        // `createdAt`
        "created_at": z.string().transform((str) => new Date(str)),
        path: z.string(),
        name: z.string(),
        description: z.string(),
        tags: z.array(
          z.object({
            id: z.number(),
            alias: z.string(),
            type: z.string(),
            name: z.string(),
            // omitted
            satellite: z.any(),
          }).transform((rename) => {
            const { satellite: _, ...rest } = rename;
            return { ...rest };
          }),
        ),
      })
      .transform((rename) => {
        const { "updated_at": updatedAt, "created_at": createdAt, ...rest } =
          rename;
        return { ...rest, updatedAt, createdAt };
      }),
  ),
});

export function get(): Promise<z.infer<typeof EventGroupsSchema>> {
  return requests.get(API_EVENT_GROUPS, EventGroupsSchema);
}
