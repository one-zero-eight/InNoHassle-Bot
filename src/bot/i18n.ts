import { I18n } from "grammy-i18n";

import { Locale } from "~/bot/session.ts";

// @ts-expect-error: GrammY bug.
const i18n = new I18n<MyContext>({
  defaultLocale: Locale.En,
  useSession: true,
  directory: "locales",
});
export default i18n;
