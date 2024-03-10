import * as grammy from "grammy";
import { type Context } from "grammy";
import { FileAdapter } from "grammy-storages-file";

import Locale from "~/bot/session/locales.ts";
import { type ScheduleOptions } from "~/bot/session/schedules.ts";
import ScholarshipCourse from "~/bot/session/scholarship_course.ts";
import State from "~/bot/session/state.ts";
import type WasMutedFor from "~/bot/session/was_muted_for.ts";

export interface SessionData {
  __language_code?: Locale;
  messageId: number;
  state?: State;
  innohassleId?: string;
  scholarshipCourse: ScholarshipCourse;
  notifications: ScheduleOptions[];
  mutedTill?: Date;
  wasMutedFor?: WasMutedFor;
}

function initial(): SessionData {
  return {
    __language_code: Locale.En,
    // The message will always exist, just not right now...
    messageId: -1,
    state: State.Start,
    innohassleId: undefined,
    notifications: [],
    scholarshipCourse: ScholarshipCourse.B23,
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
