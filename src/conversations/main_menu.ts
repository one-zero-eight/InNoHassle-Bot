import { Composer, InlineKeyboard } from "grammy";

import type MyContext from "~/bot/context.ts";
import T from "~/labels.ts";

export const composer = new Composer<MyContext>();

const enum CallType {
  Continue,
  Restart,
}

export { CallType };

type Options = {
  callType: CallType;
};

export async function mainMenu(ctx: MyContext, opts: Options) {
  ctx.session.state = undefined;

  const inlineKeyboard = new InlineKeyboard()
    .text(ctx.t(T.ButtonMainMenuSchedules), T.ButtonMainMenuSchedules)
    .row()
    .text(ctx.t(T.ButtonMainMenuSport), T.ButtonMainMenuSport)
    .text(ctx.t(T.ButtonMainMenuScholarship), T.ButtonMainMenuScholarship)
    .row()
    .text(ctx.t(T.ButtonMainMenuSettings), T.ButtonMainMenuSettings)
    .text(ctx.t(T.ButtonMainMenuSupport), T.ButtonMainMenuSupport);

  switch (opts.callType) {
    case CallType.Continue: {
      await ctx.api.editMessageText(
        ctx.chat?.id!,
        ctx.session.messageId,
        ctx.t(T.Default),
        { reply_markup: inlineKeyboard },
      );
      break;
    }
    case CallType.Restart: {
      ctx.api.deleteMessage(ctx.chat?.id!, ctx.session.messageId);

      const msg = await ctx.reply(
        ctx.t(T.Default),
        { reply_markup: inlineKeyboard },
      );
      ctx.session.messageId = msg.message_id;
      break;
    }
  }
}

composer.callbackQuery(
  "quick-start",
  (ctx) => mainMenu(ctx, { callType: CallType.Continue }),
);
composer.callbackQuery(
  T.ButtonStartSchedulesYes,
  (ctx) => mainMenu(ctx, { callType: CallType.Continue }),
);
composer.callbackQuery(
  T.ButtonStartSchedulesNo,
  (ctx) => mainMenu(ctx, { callType: CallType.Continue }),
);
composer.callbackQuery(
  T.ButtonBackToMainMenu,
  (ctx) => mainMenu(ctx, { callType: CallType.Continue }),
);

export function getRandomGreeting(): string {
  return T.Default.toString();
}
