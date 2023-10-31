import { Composer, InlineKeyboard } from "grammy";

import { composer as start } from "@/conversations/start.ts";
import { composer as settings } from "@/conversations/settings.ts";
import { composer as scholarship } from "@/conversations/scholarship.ts";
import { MyContext } from "@/bot/context.ts";
import { State } from "@/bot/session.ts";
// import * as eventGroups from "@/event_groups.ts";
// import * as scholarship from "@/scholarship.ts";
import { Button, Message } from "@/labels.ts";

export const composer = new Composer<MyContext>();

composer.use(start);
composer.use(settings);
composer.use(scholarship);

async function mainMenu(ctx: MyContext) {
  await ctx.deleteMessage();

  ctx.session.state = State.Other;

  const inlineKeyboard = new InlineKeyboard()
    .text(ctx.t(Button.MainMenuSchedules), Button.MainMenuSchedules).row()
    .text(ctx.t(Button.MainMenuScholarship), Button.MainMenuScholarship).row()
    .text(ctx.t(Button.MainMenuSettings), Button.MainMenuSettings).row()
    .text(ctx.t(Button.MainMenuSupport), Button.MainMenuSupport);

  await ctx.reply(ctx.t(Message.Default), {
    reply_markup: inlineKeyboard,
  });
}

composer.callbackQuery("quick-start", mainMenu);
composer.callbackQuery(Button.StartSchedulesYes, mainMenu);
composer.callbackQuery(Button.StartSchedulesNo, mainMenu);
composer.callbackQuery(Button.BackToMainMenu, mainMenu);

// setInterval(async function () {
//   const newEventGroups = await eventGroups.get();
//   console.log(newEventGroups);
// }, 60_000);
