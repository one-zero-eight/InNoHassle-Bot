import { Composer, InlineKeyboard } from "grammy";

import type MyContext from "~/bot/context.ts";
import T from "~/labels.ts";

export const composer = new Composer<MyContext>();

export async function mainMenu(ctx: MyContext) {
  ctx.session.state = undefined;

  const inlineKeyboard = new InlineKeyboard()
    .text(ctx.t(T.ButtonMainMenuSchedules), T.ButtonMainMenuSchedules)
    .row()
    .text(ctx.t(T.ButtonMainMenuSport), T.ButtonMainMenuSport)
    .text(ctx.t(T.ButtonMainMenuScholarship), T.ButtonMainMenuScholarship)
    .row()
    .text(ctx.t(T.ButtonMainMenuSettings), T.ButtonMainMenuSettings)
    .text(ctx.t(T.ButtonMainMenuSupport), T.ButtonMainMenuSupport);

  await ctx.editMessageText(
    ctx.t(T.Default),
    { reply_markup: inlineKeyboard },
  );
}

composer.callbackQuery("quick-start", mainMenu);
composer.callbackQuery(T.ButtonStartSchedulesYes, mainMenu);
composer.callbackQuery(T.ButtonStartSchedulesNo, mainMenu);
composer.callbackQuery(T.ButtonBackToMainMenu, mainMenu);

export function getRandomGreeting(): string {
  return T.Default.toString();
}
