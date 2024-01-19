import { Composer, InlineKeyboard } from "grammy";

import type { MyContext } from "~/bot.ts";
import { Button, Message } from "~/labels.ts";

const composer = new Composer<MyContext>();
export default composer;

composer.callbackQuery(Button.MainMenuSchedules, async (ctx) => {
  const inlineKeyboard = new InlineKeyboard()
    .text(ctx.t(Button.BackToMainMenu), Button.BackToMainMenu);

  await ctx.editMessageText(ctx.t(Message.Schedules), {
    reply_markup: inlineKeyboard,
  });
});
