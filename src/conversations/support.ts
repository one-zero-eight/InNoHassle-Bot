import { Composer, InlineKeyboard } from "grammy";

import type MyContext from "~/bot/context.ts";
import T from "~/labels.ts";

export const composer = new Composer<MyContext>();

composer.callbackQuery(T.ButtonMainMenuSupport, async (ctx) => {
  ctx.session.state = undefined;

  const inlineKeyboard = new InlineKeyboard()
    .text(ctx.t(T.ButtonBackToMainMenu), T.ButtonBackToMainMenu);

  await ctx.editMessageText(ctx.t(T.Support), {
    reply_markup: inlineKeyboard,
  });
});
