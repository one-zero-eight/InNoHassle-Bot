import { Bot, InlineKeyboard } from "grammy";
import {
  type Conversation,
  conversations,
  createConversation,
} from "grammy_conversations";
import { I18n } from "grammy_i18n";
// import { Menu } from "grammy_menu";

import { config } from "./config.ts";
import { MyContext, mySession } from "./session.ts";
import {
  Command,
  ConversationName,
  Locale,
  // MenuName,
  Message,
} from "./type_hints.ts";

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

// function guessPreferredLanguage(_language_code: string): Locale {
//   return Locale.En;
// }

// /** Returns the scholarship in rubles from the given GPA. */
// function calculateScholarship(gpa: number): number {
//   if (isNaN(gpa)) {
//     throw new Error("The GPA mustn't be NaN");
//   }
//   if (!(2.0 <= gpa && gpa <= 5.0)) {
//     throw new RangeError(`The GPA (${gpa}) is out of range [2.0, 5.0]`);
//   }
//
//   const M_MIN = 3000;
//   const M_MAX = 20_000;
//
//   let s = M_MIN + (M_MAX - M_MIN) * ((gpa - 2) / 3) ** 2.5;
//   s = Math.floor(s / 100) * 100;
//   return s;
// }

// bot.command(Command.Scholarship, async (ctx) => {
//   await ctx.reply("Please, enter your grades or GPA.");
// });

// bot.on("message:text", async (ctx) => {
//   const gpa = parseFloat(ctx.message.text);
//
//   try {
//     const scholarship = calculateScholarship(gpa);
//     await ctx.reply(scholarship.toString());
//   } catch (e: unknown) {
//     if (e instanceof RangeError) {
//       ctx.reply(e.message);
//     } else {
//       ctx.reply("Invalid input!");
//     }
//   }
// });

bot.catch((e) => console.error(e));
bot.start();
