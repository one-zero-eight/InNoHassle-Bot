import { Bot, Context, InlineKeyboard, session, SessionFlavor } from "grammy";
import { I18n, I18nFlavor } from "grammy_i18n";
import { FileAdapter } from "grammy_storages_file";

import { config } from "./config.ts";
import { getSchedules } from "./schedules.ts";
import { Button, Command, Locale, Message, WasMutedFor } from "./type_hints.ts";

interface Schedule {
  name: string;
  link: string;
}

interface ScheduleOptions {
  schedule: Schedule;
  notifyBefore?: Date;
}

interface SessionData {
  __language_code?: Locale;
  innohassleId?: number;
  settingsSync: boolean;
  notifications: ScheduleOptions[];
  mutedTill?: Date;
  wasMutedFor: WasMutedFor;
}

type MyContext = Context & I18nFlavor & SessionFlavor<SessionData>;

function initial(): SessionData {
  return {
    __language_code: Locale.En,
    innohassleId: undefined,
    settingsSync: false,
    notifications: [],
    mutedTill: undefined,
    wasMutedFor: WasMutedFor.None,
  };
}

function getSessionKey(ctx: Context): string | undefined {
  return ctx.from?.id.toString();
}

const storage = new FileAdapter(/* { dirName: "sessions" } */);

const mySession = session({ initial, getSessionKey, storage });

// @ts-expect-error: GrammY bug.
const i18n = new I18n<MyContext>({
  defaultLocale: Locale.En,
  useSession: true,
  directory: "locales",
});

const bot = new Bot<MyContext>(config.BOT_TOKEN);
bot.use(mySession);
bot.use(i18n);

bot.command(Command.Start, async (ctx) => {
  const inlineKeyboard = new InlineKeyboard()
    .text(ctx.t(Button.StartYes), Button.StartYes);

  await ctx.reply(ctx.t(Message.Start), {
    disable_web_page_preview: true,
    parse_mode: "HTML",
    reply_markup: inlineKeyboard,
  });
});

bot.callbackQuery(Button.StartYes, async (ctx) => {
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

bot.callbackQuery(Button.StartHaveAccountYes, async (ctx) => {
  await ctx.deleteMessage();

  const inlineKeyboard = new InlineKeyboard()
    .text(ctx.t(Button.StartConnectTelegramYes), Button.StartConnectTelegramYes)
    .text(ctx.t(Button.StartConnectTelegramNo), Button.StartConnectTelegramNo);

  await ctx.reply(ctx.t(Message.StartConnectTelegram), {
    reply_markup: inlineKeyboard,
  });
});

bot.callbackQuery(Button.StartHaveAccountNo, async (ctx) => {
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

bot.callbackQuery(Button.StartCreateAccountYes, async (ctx) => {
  await ctx.deleteMessage();

  const inlineKeyboard = new InlineKeyboard();

  await ctx.reply(ctx.t(), {
    reply_markup: inlineKeyboard,
  });
});

bot.callbackQuery(Button.StartCreateAccountNo, async (ctx) => {
  await ctx.deleteMessage();

  const inlineKeyboard = new InlineKeyboard();

  await ctx.reply(ctx.t(), {
    reply_markup: inlineKeyboard,
  });
});

async function mainMenu(ctx: MyContext) {
  await ctx.deleteMessage();

  const inlineKeyboard = new InlineKeyboard()
    .text(ctx.t(Button.MainMenuSchedules), Button.MainMenuSchedules).row()
    .text(ctx.t(Button.MainMenuScholarship), Button.MainMenuScholarship).row()
    .text(ctx.t(Button.MainMenuSettings), Button.MainMenuSettings).row()
    .text(ctx.t(Button.MainMenuSupport), Button.MainMenuSupport);

  await ctx.reply(ctx.t(Message.Default), {
    reply_markup: inlineKeyboard,
  });
}

bot.callbackQuery(Button.StartSchedulesYes, mainMenu);
bot.callbackQuery(Button.StartSchedulesNo, mainMenu);
bot.callbackQuery(Button.BackToMainMenu, mainMenu);

bot.callbackQuery(Button.MainMenuSettings, async (ctx) => {
  await ctx.deleteMessage();

  const inlineKeyboard = new InlineKeyboard()
    .text(ctx.t(Button.BackToMainMenu), Button.BackToMainMenu);

  await ctx.reply(ctx.t(Message.Settings), {
    reply_markup: inlineKeyboard,
  });
});

bot.catch((e) => console.error(e));
// bot.start();

setInterval(async function () {
  const schedules = await getSchedules();
}, 60_000);
