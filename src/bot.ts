import { Bot } from "grammy";

import { MyContext } from "@/bot/context.ts";
import { i18n } from "@/bot/i18n.ts";
import { mySession } from "@/bot/session.ts";
import { config } from "@/config.ts";
import { composer as conversations } from "@/conversations.ts";

export const bot = new Bot<MyContext>(config.BOT_TOKEN);

bot.use(i18n);
bot.use(mySession);
bot.use(conversations);

bot.catch((e) => console.error(e));
bot.start();
