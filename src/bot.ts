import { Bot } from "grammy";

import { config } from "./config.ts";
import { MyContext, mySession } from "./session.ts";

const bot = new Bot<MyContext>(config.BOT_TOKEN);
bot.use(mySession);

// function guessPreferredLanguage(_language_code: string): Language {
//   return Language.En;
// }

/**
 * Returns the scholarship in rubles from the given GPA.
 */
function calculateScholarship(gpa: number): number {
  if (isNaN(gpa)) {
    throw new Error("The GPA mustn't be NaN");
  }
  if (!(2.0 <= gpa && gpa <= 5.0)) {
    throw new RangeError(`The GPA (${gpa}) is out of range [2.0, 5.0]`);
  }

  const M_MIN = 3000;
  const M_MAX = 20_000;

  let s = M_MIN + (M_MAX - M_MIN) * ((gpa - 2) / 3) ** 2.5;
  s = Math.floor(s / 100) * 100;
  return s;
}

bot.command("start", async (_) => {
});

bot.on("message:text", async (ctx) => {
  const gpa = parseFloat(ctx.message.text);

  try {
    const scholarship = calculateScholarship(gpa);
    await ctx.reply(scholarship.toString());
  } catch (e: unknown) {
    if (e instanceof RangeError) {
      ctx.reply(e.message);
    } else {
      ctx.reply("Invalid input!");
    }
  }
});

bot.catch((e) => console.error(e));
bot.start();
