import { Composer, InlineKeyboard } from "grammy";

import { Conversation, type MyContext } from "~/bot.ts";
import { Button, Message } from "~/labels.ts";

const composer = new Composer<MyContext>();
export default composer;

composer.callbackQuery(Button.MainMenuSettings, async (ctx) => {
  ctx.session.state.conversation = Conversation.Template;

  const inlineKeyboard = new InlineKeyboard()
    .text(ctx.t(Button.Template1), Button.Template1)
    .text(ctx.t(Button.Template2), Button.Template2)
    .text(ctx.t(Button.BackToMainMenu), Button.BackToMainMenu);

  await ctx.editMessageText(ctx.t(Message.Template), {
    reply_markup: inlineKeyboard,
  });
});
