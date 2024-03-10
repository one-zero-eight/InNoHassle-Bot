import type { Context, SessionFlavor } from "grammy";
import { type I18nFlavor } from "grammy-i18n";

import { type SessionData } from "~/bot/session.ts";

type MyContext = Context & I18nFlavor & SessionFlavor<SessionData>;
export default MyContext;
