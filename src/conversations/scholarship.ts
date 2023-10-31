import { Composer, InlineKeyboard } from "grammy";

import type { MyContext } from "@/bot.ts";
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
