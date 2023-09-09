import { config } from "./config.ts";
import { Bot } from "grammy";

const bot = new Bot(config.BOT_TOKEN);

function calculateScholarship(gpa: number): number {
  const M_MIN = 3000;
  const M_MAX = 20_000;

  const s = M_MIN + (M_MAX - M_MIN) * ((gpa - 2) / 3) ** 2.5;
  return Math.floor(s / 100) * 100;
}

bot.command("scholarship", async (ctx) => {
  ctx.reply("Enter your GPA.");
  //   if (!ctx.message.text) {
  //     return;
  //   }

  //   const gpa = parseFloat(ctx.message.text);

  //   if (isNaN(gpa)) {
  //     return;
  //   }

  //   if (gpa < 2 || gpa > 5) {
  //     return;
  //   }

  //   await ctx.reply(calculateScholarship(gpa).toString());
});

bot.start();
