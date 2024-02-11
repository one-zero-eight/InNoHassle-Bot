import { Composer } from "grammy";

import type MyContext from "~/bot/context.ts";
import State from "~/bot/session/state.ts";

import * as mainMenu from "~/conversations/main_menu.ts";
import * as scholarship from "~/conversations/scholarship.ts";

export const composer = new Composer<MyContext>();

composer.on("message", async (ctx) => {
  switch (ctx.session.state) {
    case State.Start: {
      // TODO
      break;
    }
    case State.Scholarship: {
      await scholarship.onMessage(ctx);
      break;
    }
    default: {
      await mainMenu.mainMenu(ctx);
      break;
    }
  }
});
