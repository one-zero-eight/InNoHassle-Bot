import { Composer, InlineKeyboard } from "grammy";

import State from "~/bot/session/state.ts";
import type MyContext from "~/bot/context.ts";
import T from "~/labels.ts";

export const composer = new Composer<MyContext>();

composer.command(T.CommandStart, async (ctx) => {
  if (ctx.session.state !== State.Start) {
    ctx.reply("Warning");
    return;
  }

  const inlineKeyboard = new InlineKeyboard()
    .text(ctx.t(T.ButtonStartYes), T.ButtonStartYes)
    .text("Quick Start", "quick-start");

  ctx.session.messageId = (await ctx.reply(ctx.t(T.CommandStart), {
    disable_web_page_preview: true,
    parse_mode: "HTML",
    reply_markup: inlineKeyboard,
  })).message_id;
});

composer.callbackQuery(T.ButtonStartYes, async (ctx) => {
  const inlineKeyboard = new InlineKeyboard()
    .text(ctx.t(T.ButtonStartHaveAccountYes), T.ButtonStartHaveAccountYes)
    .text(ctx.t(T.ButtonStartHaveAccountNo), T.ButtonStartHaveAccountNo);

  await ctx.editMessageText(ctx.t(T.StartHaveAccount), {
    disable_web_page_preview: true,
    reply_markup: inlineKeyboard,
    parse_mode: "HTML",
  });
});

composer.callbackQuery(T.ButtonStartHaveAccountYes, async (ctx) => {
  const inlineKeyboard = new InlineKeyboard()
    .text(
      ctx.t(T.ButtonStartConnectTelegramYes),
      T.ButtonStartConnectTelegramYes,
    )
    .text(
      ctx.t(T.ButtonStartConnectTelegramNo),
      T.ButtonStartConnectTelegramNo,
    );

  await ctx.editMessageText(ctx.t(T.StartConnectTelegram), {
    reply_markup: inlineKeyboard,
  });
});

composer.callbackQuery(T.ButtonStartHaveAccountNo, async (ctx) => {
  const inlineKeyboard = new InlineKeyboard()
    .text(ctx.t(T.ButtonStartCreateAccountYes), T.ButtonStartCreateAccountYes)
    .text(ctx.t(T.ButtonStartCreateAccountNo), T.ButtonStartCreateAccountNo);

  await ctx.editMessageText(ctx.t(T.StartCreateAccount), {
    disable_web_page_preview: true,
    parse_mode: "HTML",
    reply_markup: inlineKeyboard,
  });
});

composer.callbackQuery(T.ButtonStartConnectTelegramYes, async (ctx) => {
  // const inlineKeyboard = new InlineKeyboard()
  //   .text(ctx.t(Button.), Button.)

  // XXX:
  await ctx.editMessageText(
    `Okay, master, let's kill da hoe!\n` +
      `<code>${ctx.from.id}</code>`,
    {
      parse_mode: "HTML",
      // reply_markup: inlineKeyboard,
    },
  );
});

// TODO:
composer.callbackQuery(T.ButtonStartConnectTelegramNo, async (ctx) => {
  // const inlineKeyboard = new InlineKeyboard()
  //   .text(ctx.t(Button.), Button.)

  // await ctx.editMessageText(ctx.t(Message.), {
  //   parse_mode: "HTML",
  //   reply_markup: inlineKeyboard,
  // });
});

// TODO:
composer.callbackQuery(T.ButtonStartCreateAccountYes, async (ctx) => {
  const inlineKeyboard = new InlineKeyboard();

  // await ctx.editMessageText(ctx.t(), {
  //   reply_markup: inlineKeyboard,
  // });
});

// TODO:
composer.callbackQuery(T.ButtonStartCreateAccountNo, async (ctx) => {
  const inlineKeyboard = new InlineKeyboard();

  // await ctx.editMessageText(ctx.t(), {
  //   reply_markup: inlineKeyboard,
  // });
});
