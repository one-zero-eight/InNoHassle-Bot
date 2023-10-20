import { Context, session, SessionFlavor } from "grammy";
import { I18nFlavor } from "grammy_i18n";
import { FileAdapter } from "grammy_storages_file";
import { type ConversationFlavor } from "grammy_conversations";

import { EapGroup, Locale, StudyGroup, WasMutedFor } from "./type_hints.ts";

export type MyContext =
  & Context
  & ConversationFlavor
  & I18nFlavor
  & SessionFlavor<SessionData>;

interface SessionData {
  __language_code?: Locale;
  notifications?: Date;
  studyGroup: StudyGroup;
  eapGroup: EapGroup;
  mutedTill?: Date;
  wasMutedFor: WasMutedFor;
}

function initial(): SessionData {
  return {
    __language_code: Locale.En,
    notifications: undefined,
    studyGroup: StudyGroup.Other,
    eapGroup: EapGroup.Other,
    mutedTill: undefined,
    wasMutedFor: WasMutedFor.None,
  };
}

function getSessionKey(ctx: Context): string | undefined {
  return ctx.from?.id.toString();
}

const storage = new FileAdapter({ dirName: "sessions" });

export const mySession = session({
  initial,
  getSessionKey,
  storage,
});
