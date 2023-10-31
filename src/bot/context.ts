import { Context, SessionFlavor } from "grammy";
import { I18nFlavor } from "grammy-i18n";

import { SessionData } from "@/bot/session.ts";

export type MyContext = Context & I18nFlavor & SessionFlavor<SessionData>;
