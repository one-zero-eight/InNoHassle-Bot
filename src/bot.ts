import { Bot } from "grammy";
import { config } from "./config.ts";

const bot = new Bot(config.BOT_TOKEN);

/**
 * Returns the scholarship in rubles from the given GPA.
 */
function calculateScholarship(gpa: number): number {
  if (isNaN(gpa)) {
    throw new Error("The GPA must not be NaN");
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

bot.start();
