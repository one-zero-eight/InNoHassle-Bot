import { Composer, InlineKeyboard } from "grammy";

import { MyContext } from "@/bot/context.ts";
import { Button, Message } from "@/labels.ts";

export const composer = new Composer<MyContext>();

composer.callbackQuery(Button.MainMenuSettings, async (ctx) => {
  await ctx.deleteMessage();

  const inlineKeyboard = new InlineKeyboard()
    .text(ctx.t(Button.BackToMainMenu), Button.BackToMainMenu);

  await ctx.reply(ctx.t(Message.Settings), {
    reply_markup: inlineKeyboard,
  });
});
