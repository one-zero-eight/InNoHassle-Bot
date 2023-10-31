import { Composer, InlineKeyboard } from "grammy";

import { composer as start } from "@/conversations/start.ts";
import { composer as settings } from "@/conversations/settings.ts";
import { composer as scholarship } from "@/conversations/scholarship.ts";
import type { MyContext } from "@/bot.ts";
import { Conversation } from "@/bot.ts";
// import * as eventGroups from "@/tmp/event_groups.ts";
// import * as scholarship from "@/tmp/scholarship.ts";
import { Button, Message } from "@/labels.ts";

export const composer = new Composer<MyContext>();

composer.use(start);
composer.use(settings);
composer.use(scholarship);

async function mainMenu(ctx: MyContext) {
  await ctx.deleteMessage();

  ctx.session.state = { conversation: Conversation.MainMenu };

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

composer.on("message", async (ctx) => {
  switch (ctx.session.state.conversation) {
    case Conversation.Start: {
      break;
    }
    case Conversation.Scholarship: {
      break;
    }
    case Conversation.Settings: {
      break;
    }
    case Conversation.Support: {
      break;
    }
    default: {
      await mainMenu(ctx);
      break;
    }
  }
});
