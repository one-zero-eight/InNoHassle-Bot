import * as grammy from "grammy";
import type { Context } from "grammy";
import { FileAdapter } from "grammy-storages-file";

import { Conversation, State } from "@/bot/session/state.ts";
import { WasMutedFor } from "@/bot/session/was_muted_for.ts";
import { Locale } from "@/bot/session/locales.ts";
import { ScheduleOptions } from "@/bot/session/schedules.ts";

export { Conversation, Locale };

export interface SessionData {
  __language_code?: Locale;
  state: State;
  innohassleId?: number;
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

export const mySession = grammy.session({ initial, getSessionKey, storage });
