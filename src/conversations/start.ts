import { Composer, InlineKeyboard } from "grammy";

import type { MyContext } from "@/bot.ts";
import { State } from "@/bot.ts";
import { Button, Command, Message } from "@/labels.ts";

export const composer = new Composer<MyContext>();

composer.command(Command.Start, async (ctx) => {
  if (ctx.session.state !== State.Start) {
    ctx.reply("Warning");
    return;
  }

  const inlineKeyboard = new InlineKeyboard()
    .text(ctx.t(Button.StartYes), Button.StartYes)
    .text("Quick Start", "quick-start");

  await ctx.reply(ctx.t(Message.Start), {
    disable_web_page_preview: true,
    parse_mode: "HTML",
    reply_markup: inlineKeyboard,
  });
});

composer.callbackQuery(Button.StartYes, async (ctx) => {
  await ctx.deleteMessage();

  const inlineKeyboard = new InlineKeyboard()
    .text(ctx.t(Button.StartHaveAccountYes), Button.StartHaveAccountYes)
    .text(ctx.t(Button.StartHaveAccountNo), Button.StartHaveAccountNo);

  await ctx.reply(ctx.t(Message.StartHaveAccount), {
    disable_web_page_preview: true,
    parse_mode: "HTML",
    reply_markup: inlineKeyboard,
  });
});

composer.callbackQuery(Button.StartHaveAccountYes, async (ctx) => {
  await ctx.deleteMessage();

  const inlineKeyboard = new InlineKeyboard()
    .text(ctx.t(Button.StartConnectTelegramYes), Button.StartConnectTelegramYes)
    .text(ctx.t(Button.StartConnectTelegramNo), Button.StartConnectTelegramNo);

  await ctx.reply(ctx.t(Message.StartConnectTelegram), {
    reply_markup: inlineKeyboard,
  });
});

composer.callbackQuery(Button.StartHaveAccountNo, async (ctx) => {
  await ctx.deleteMessage();

  const inlineKeyboard = new InlineKeyboard()
    .text(ctx.t(Button.StartCreateAccountYes), Button.StartCreateAccountYes)
    .text(ctx.t(Button.StartCreateAccountNo), Button.StartCreateAccountNo);

  await ctx.reply(ctx.t(Message.StartCreateAccount), {
    disable_web_page_preview: true,
    parse_mode: "HTML",
    reply_markup: inlineKeyboard,
  });
});

composer.callbackQuery(Button.StartCreateAccountYes, async (ctx) => {
  await ctx.deleteMessage();

  const inlineKeyboard = new InlineKeyboard();

  await ctx.reply(ctx.t(), {
    reply_markup: inlineKeyboard,
  });
});

composer.callbackQuery(Button.StartCreateAccountNo, async (ctx) => {
  await ctx.deleteMessage();

  const inlineKeyboard = new InlineKeyboard();

  await ctx.reply(ctx.t(), {
    reply_markup: inlineKeyboard,
  });
});
