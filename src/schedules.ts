import { z } from "zod";

const Schedules = z.object({
  groups: z.array(
    z.object({
      id: z.number(),
      alias: z.string(),
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

const URL = "https://api.innohassle.ru/events/v0/event-groups/";
export const schedules = await fetch(URL)
  .then(async (s) => await s.json())
  .then(async (s) => await Schedules.parseAsync(s));
