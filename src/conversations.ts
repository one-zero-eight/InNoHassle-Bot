import { Composer, InlineKeyboard } from "grammy";

import type { MyContext } from "~/bot.ts";
import start from "~/conversations/start.ts";
import schedules from "~/conversations/schedules.ts";
import information from "~/conversations/information.ts";
import settings from "~/conversations/settings.ts";
import scholarship from "~/conversations/scholarship.ts";
import support from "~/conversations/support.ts";
// import _template from "~/conversations/_template.ts";
import { Conversation } from "~/bot.ts";
// import * as eventGroups from "~/tmp/event_groups.ts";
// import * as scholarship from "~/tmp/scholarship.ts";
import { Button, Message } from "~/labels.ts";

const composer = new Composer<MyContext>();
export default composer;

composer.use(start);
composer.use(schedules);
composer.use(settings);
composer.use(information);
composer.use(scholarship);
composer.use(support);
// composer.use(_template);

async function mainMenu(ctx: MyContext) {
  ctx.session.state = { conversation: Conversation.MainMenu };

  const inlineKeyboard = new InlineKeyboard()
    .text(ctx.t(Button.MainMenuSchedules), Button.MainMenuSchedules).row()
    .text(ctx.t(Button.MainMenuScholarship), Button.MainMenuScholarship).row()
    .text(ctx.t(Button.MainMenuInformation), Button.MainMenuInformation).row()
    .text(ctx.t(Button.MainMenuSettings), Button.MainMenuSettings).row()
    .text(ctx.t(Button.MainMenuSupport), Button.MainMenuSupport);

  await ctx.editMessageText(ctx.t(Message.Default), {
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
    case Conversation.Information: {
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
