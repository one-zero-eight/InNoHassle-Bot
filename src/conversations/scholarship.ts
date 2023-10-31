import { Composer, InlineKeyboard } from "grammy";
import { State } from "@/bot/session.ts";

import { MyContext } from "@/bot/context.ts";
import { Button, Message } from "@/labels.ts";

export const composer = new Composer<MyContext>();

composer.callbackQuery(Button.MainMenuScholarship, async (ctx) => {
  await ctx.deleteMessage();

  ctx.session.state = State.Scholarship;

  const inlineKeyboard = new InlineKeyboard()
    .text(ctx.t(Button.BackToMainMenu), Button.BackToMainMenu);

  await ctx.reply(ctx.t(Message.Scholarship), {
    reply_markup: inlineKeyboard,
  });
});
