import { Composer } from "grammy";

import type MyContext from "~/bot/context.ts";

import * as start from "~/conversations/start.ts";
import * as mainMenu from "~/conversations/main_menu.ts";
import * as information from "~/conversations/information.ts";
import * as schedules from "~/conversations/schedules.ts";
import * as settings from "~/conversations/settings.ts";
import * as scholarship from "~/conversations/scholarship.ts";
import * as sport from "~/conversations/sport.ts";
import * as support from "~/conversations/support.ts";
import * as global from "~/conversations/global.ts";

const composer = new Composer<MyContext>();
export default composer;

composer.use(start.composer);
composer.use(mainMenu.composer);
composer.use(information.composer);
composer.use(schedules.composer);
composer.use(settings.composer);
composer.use(scholarship.composer);
composer.use(sport.composer);
composer.use(support.composer);
composer.use(global.composer);
