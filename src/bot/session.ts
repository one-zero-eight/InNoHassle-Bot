import * as grammy from "grammy";
import type { Context } from "grammy";
import { FileAdapter } from "grammy-storages-file";

import type Course from "~/bot/session/course.ts";
import type State from "~/bot/session/state.ts";
import type WasMutedFor from "~/bot/session/was_muted_for.ts";
import type { ScheduleOptions } from "~/bot/session/schedules.ts";
import Locale from "~/bot/session/locales.ts";
import { Conversation } from "~/bot/session/state.ts";

export type { Course };
export { Year } from "~/bot/session/course.ts";
export { Conversation, Locale };

export interface SessionData {
  __language_code?: Locale;
  state: State;
  innohassleId?: number;
  course?: Course;
  settingsSync: boolean;
  notifications: ScheduleOptions[];
  mutedTill?: Date;
  wasMutedFor?: WasMutedFor;
}

function initial(): SessionData {
  return {
    __language_code: Locale.En,
    state: { conversation: Conversation.Start },
    innohassleId: undefined,
    course: undefined,
    settingsSync: false,
    notifications: [],
    mutedTill: undefined,
    wasMutedFor: undefined,
  };
}

function getSessionKey(ctx: Context): string | undefined {
  return ctx.from?.id.toString();
}

const storage = new FileAdapter(/* { dirName: "sessions" } */);

const mySession = grammy.session({ initial, getSessionKey, storage });
export default mySession;
