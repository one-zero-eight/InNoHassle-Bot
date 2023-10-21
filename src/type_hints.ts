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
  Start = "start",
  StartHaveAccount = "start-have-account",
  StartConnectTelegram = "start-connect-telegram",
  StartCreateAccount = "start-create-account",
  StartSchedules = "start-schedules",
  Default = "default",
  Settings = "settings",
}

/** Buttons from `/locales/*.ftl`. */
export const enum Button {
  StartYes = "button-start-yes",
  SettingsLanguage = "button-settings-language",
  SettingsSync = "button-settings-sync",
  BackToMainMenu = "button-back-to-main-menu",
  BackToSettings = "button-back-to-settings",
  StartHaveAccountYes = "button-start-have-account-yes",
  StartHaveAccountNo = "button-start-have-account-no",
  StartConnectTelegramYes = "button-start-connect-telegram-yes",
  StartConnectTelegramNo = "button-start-connect-telegram-no",
  StartCreateAccountYes = "button-start-create-account-yes",
  StartCreateAccountNo = "button-start-create-account-no",
  StartSchedulesYes = "button-start-schedules-yes",
  StartSchedulesNo = "button-start-schedules-no",
  MainMenuSupport = "button-main-menu-support",
  MainMenuScholarship = "button-main-menu-scholarship",
  MainMenuSettings = "button-main-menu-settings",
  MainMenuSchedules = "button-main-menu-schedules",
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
