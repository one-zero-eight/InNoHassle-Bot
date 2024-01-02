import { Composer, InlineKeyboard } from "grammy";

import type { MyContext } from "@/bot.ts";
import { Year } from "@/bot.ts";

import * as logic from "@/conversations/scholarship/scholarship_logic.ts";
import { Conversation } from "@/bot.ts";
import { Button, Message } from "@/labels.ts";

export const composer = new Composer<MyContext>();

composer.callbackQuery(Button.MainMenuScholarship, async (ctx) => {
  await ctx.deleteMessage();
  ctx.session.state = { conversation: Conversation.Scholarship };

  const inlineKeyboard = new InlineKeyboard()
    .text(ctx.t(Button.BackToMainMenu), Button.BackToMainMenu);

  await ctx.reply(ctx.t(Message.Scholarship), {
    reply_markup: inlineKeyboard,
  });
});

export async function onMessage(ctx: MyContext) {
  const grades = ctx.message?.text;

  const gpa = logic.parseGpa(grades);

  let year: Year;
  if (ctx.session.course === undefined) {
    year = Year.Y23;
  } else {
    year = ctx.session.course.year;
  }

  const scholarship = logic.calculate(gpa, year);
}
