import { Composer, InlineKeyboard } from "grammy";

import type { MyContext } from "@/bot.ts";
import { Button, Message } from "@/labels.ts";

export const composer = new Composer<MyContext>();

composer.callbackQuery(Button.MainMenuInformation, async (ctx) => {
  await ctx.deleteMessage();

  const inlineKeyboard = new InlineKeyboard()
    .text(ctx.t(Button.BackToMainMenu), Button.BackToMainMenu);

  await ctx.reply(ctx.t(Message.Information), {
    reply_markup: inlineKeyboard,
  });
});
