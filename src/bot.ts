import { Bot, Context, InlineKeyboard, session, SessionFlavor } from "grammy";
import { I18n, I18nFlavor } from "grammy_i18n";
import {
  type Conversation,
  type ConversationFlavor,
  conversations,
  createConversation,
} from "grammy_conversations";
import { FileAdapter } from "grammy_storages_file";

import { config } from "./config.ts";
import {
  Command,
  ConversationName,
  Locale,
  Message,
  WasMutedFor,
} from "./type_hints.ts";

interface Schedule {
  name: string;
  link: string;
}

interface ScheduleOptions {
  schedule: Schedule;
  notifyBefore?: Date;
}

interface SessionData {
  __language_code?: Locale;
  notifications: ScheduleOptions[];
  mutedTill?: Date;
  wasMutedFor: WasMutedFor;
}

type MyContext =
  & Context
  & ConversationFlavor
  & I18nFlavor
  & SessionFlavor<SessionData>;

function initial(): SessionData {
  return {
    __language_code: Locale.En,
    notifications: [],
    mutedTill: undefined,
    wasMutedFor: WasMutedFor.None,
  };
}

function getSessionKey(ctx: Context): string | undefined {
  return ctx.from?.id.toString();
}

const storage = new FileAdapter({ dirName: "sessions" });

const mySession = session({
  initial,
  getSessionKey,
  storage,
});

const i18n = new I18n<MyContext>({
  defaultLocale: Locale.En,
  useSession: true,
  directory: "locales",
});

const bot = new Bot<MyContext>(config.BOT_TOKEN);
bot.use(mySession);
bot.use(conversations());
bot.use(createConversation(greeting, ConversationName.Greeting));
bot.use(i18n);

// const menuOk = new Menu<MyContext>(MenuName.Ok)
//   .text((ctx) => ctx.t(Message.ButtonGreetingOk), (ctx) => ctx.reply("Oksey"));

// bot.use(menuOk);

type MyConversation = Conversation<MyContext>;

async function greeting(conversation: MyConversation, ctx: MyContext) {
  await ctx.reply("Send me your favorite numbers, separated by commas!");
  const { message } = await conversation.waitFor("message:text");
  const sum = message.text
    .split(",")
    .map((n) => parseInt(n.trim(), 10))
    .reduce((x, y) => x + y);
  await ctx.reply("The sum of these numbers is: " + sum);

  // const inlineKeyboard = new InlineKeyboard()
  //   .text(ctx.t(Message.ButtonGreetingOk), Message.ButtonGreetingOk);

  // await ctx.reply(ctx.t(Message.Greeting), {
  //   disable_web_page_preview: true,
  //   parse_mode: "HTML",
  //   reply_markup: inlineKeyboard,
  // });

  // await conversation.waitForCallbackQuery(Message.ButtonGreetingOk);
  // await ctx.reply("Jeez!");
}

// bot.callbackQuery(Message.ButtonGreetingOk, async (ctx) => {
//   await ctx.answerCallbackQuery({
//     text: "You were curious, indeed!",
//   });
// });

bot.command(
  Command.Start,
  async (ctx) => await ctx.conversation.enter(ConversationName.Greeting),
);

bot.catch((e) => console.error(e));
bot.start();
