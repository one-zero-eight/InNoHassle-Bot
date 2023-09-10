import { config } from "./config.ts";

import { Bot } from "grammy";

const bot = new Bot(config.BOT_TOKEN);

/**
 * @param {number} gpa - TODO
 * @returns {number} TODO
 */
function calculateScholarship(gpa: number): number {
  if (!(2 <= gpa && gpa <= 5)) {
    throw new RangeError(/* TODO */);
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
  } catch (_) {
    ctx.reply("Invalid input!");
  }
});

bot.start();
