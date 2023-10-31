import * as grammy from "grammy";
import type { Context } from "grammy";
import { FileAdapter } from "grammy-storages-file";

export const enum Locale {
  En = "en",
}

export const enum State {
  Start,
  Scholarship,
  Other,
}

const enum WasMutedFor {
  None,
  Day,
  Week,
  Month,
  Ever,
}

interface Schedule {
  name: string;
  link: string;
}

interface ScheduleOptions {
  schedule: Schedule;
  notifyBefore?: Date;
}

export interface SessionData {
  __language_code?: Locale;
  state: State;
  innohassleId?: number;
  settingsSync: boolean;
  notifications: ScheduleOptions[];
  mutedTill?: Date;
  wasMutedFor: WasMutedFor;
}

function initial(): SessionData {
  return {
    __language_code: Locale.En,
    state: State.Start,
    innohassleId: undefined,
    settingsSync: false,
    notifications: [],
    mutedTill: undefined,
    wasMutedFor: WasMutedFor.None,
  };
}

function getSessionKey(ctx: Context): string | undefined {
  return ctx.from?.id.toString();
}

const storage = new FileAdapter(/* { dirName: "sessions" } */);

export const mySession = grammy.session({ initial, getSessionKey, storage });
