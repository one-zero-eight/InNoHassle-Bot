import { Bot } from "grammy";

import type { MyContext } from "@/bot/context.ts";
import { i18n } from "@/bot/i18n.ts";
import { mySession } from "@/bot/session.ts";
import { config } from "@/config.ts";
import { composer as conversations } from "@/conversations.ts";

export type { MyContext } from "@/bot/context.ts";
export { Conversation } from "@/bot/session.ts";

export const bot = new Bot<MyContext>(config.BOT_TOKEN);

bot.use(i18n);
bot.use(mySession);
bot.use(conversations);

bot.catch((e) => console.error(e));
bot.start();
