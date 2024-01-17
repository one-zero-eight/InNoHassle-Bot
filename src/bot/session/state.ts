import type { MyContext } from "~/bot/context.ts";

export const enum Conversation {
  Start = "start",
  MainMenu = "main-menu",
  Scholarship = "scholarship",
  Information = "information",
  Settings = "settings",
  Support = "support",
}

export interface State {
  conversation: Conversation;
  context?: MyContext;
}
