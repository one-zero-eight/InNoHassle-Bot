/** Telegram bot commands starting with a `/` symbol. */
export const enum Command {
  Start = "start",
  Scholarship = "scholarship",
}

/** GrammY conversation function names. */
export const enum ConversationName {
  Greeting = "greeting",
}

/** Messages from `/locales/*.ftl`. */
export const enum Message {
  Greeting = "greeting",
  ButtonGreetingOk = "button-greeting-ok",
}

/** Telegram language codes (ISO 639-1). */
export const enum Locale {
  En = "en",
}

/** A user can be muted if they spam support. */
export const enum WasMutedFor {
  None,
  Day,
  Week,
  Month,
  Ever,
}

// /** Inline button menu names. */
// export const enum MenuName {
//   Ok = "ok",
// }
