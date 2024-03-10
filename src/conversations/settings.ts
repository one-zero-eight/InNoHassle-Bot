import { Composer, InlineKeyboard } from "grammy";

import type MyContext from "~/bot/context.ts";
import T from "~/labels.ts";

export const composer = new Composer<MyContext>();

composer.callbackQuery(T.ButtonMainMenuSettings, async (ctx) => {
  ctx.session.state = undefined;

  let inlineKeyboard = new InlineKeyboard();

  if (ctx.session.innohassleId === undefined) {
    inlineKeyboard = inlineKeyboard.text(
      ctx.t(T.ButtonSettingsLinkAccount),
      T.ButtonSettingsLinkAccount,
    ).row();
  } else {
    inlineKeyboard = inlineKeyboard.text(
      ctx.t(T.ButtonSettingsUnlinkAccount),
      T.ButtonSettingsUnlinkAccount,
    ).row();
  }

  inlineKeyboard = inlineKeyboard.text(
    ctx.t(T.ButtonBackToMainMenu),
    T.ButtonBackToMainMenu,
  );

  await ctx.editMessageText(
    ctx.t(T.Settings, { innohassleLinked: 0 }),
    {
      parse_mode: "HTML",
      reply_markup: inlineKeyboard,
    },
  );
});

composer.callbackQuery(T.ButtonSettingsLinkAccount, async (ctx) => {
  // TODO
});

composer.callbackQuery(T.ButtonSettingsUnlinkAccount, async (ctx) => {
  // TODO
});
