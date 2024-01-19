import type MyContext from "~/bot/context.ts";

interface State {
  conversation: Conversation;
  context?: MyContext;
}

export default State;

export const enum Conversation {
  Start = "start",
  MainMenu = "main-menu",
  Scholarship = "scholarship",
  Information = "information",
  Settings = "settings",
  Support = "support",
}
