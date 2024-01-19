import { Bot } from "grammy";

import i18n from "~/bot/i18n.ts";
import mySession from "~/bot/session.ts";
import config from "~/config.ts";
import conversations from "~/conversations.ts";
import type MyContext from "~/bot/context.ts";

export { Conversation, Year } from "~/bot/session.ts";
export type { MyContext };
export type { Course } from "~/bot/session.ts";

const bot = new Bot<MyContext>(config.BOT_TOKEN);
export default bot;

bot.use(i18n);
bot.use(mySession);
bot.use(conversations);

bot.catch((e) => console.error(e));
bot.start();
