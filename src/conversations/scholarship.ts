import { Composer, InlineKeyboard } from "grammy";

import State from "~/bot/session/state.ts";
import * as logic from "~/conversations/scholarship/scholarship_logic.ts";
import type MyContext from "~/bot/context.ts";
import T from "~/labels.ts";
import ScholarshipCourse from "~/bot/session/scholarship_course.ts";

export const composer = new Composer<MyContext>();

async function main(ctx: MyContext) {
  ctx.session.state = State.Scholarship;

  const inlineKeyboard = new InlineKeyboard()
    .text(
      ctx.t(T.ButtonScholarshipSelectCourse),
      T.ButtonScholarshipSelectCourse,
    )
    .row()
    .text(ctx.t(T.ButtonBackToMainMenu), T.ButtonBackToMainMenu);

  await ctx.editMessageText(
    ctx.t(T.ScholarshipRequest, {
      course: ctx.t(logic.courseName(ctx.session.scholarshipCourse)),
    }),
    { parse_mode: "HTML", reply_markup: inlineKeyboard },
  );
}

composer.callbackQuery(T.ButtonMainMenuScholarship, main);
composer.callbackQuery(T.ButtonBackToScholarship, main);

composer.callbackQuery(T.ButtonScholarshipSelectCourse, async (ctx) => {
  ctx.session.state = undefined;

  const inlineKeyboard = new InlineKeyboard()
    .text(ctx.t(T.CourseB23), T.CourseB23)
    .text(ctx.t(T.CourseB22Plus), T.CourseB22Plus)
    .row()
    .text(ctx.t(T.ButtonBackToScholarship), T.ButtonBackToScholarship);

  await ctx.editMessageText(
    ctx.t(T.ButtonScholarshipSelectCourse),
    { parse_mode: "HTML", reply_markup: inlineKeyboard },
  );
});

composer.callbackQuery(T.CourseB23, async (ctx) => {
  ctx.session.scholarshipCourse = ScholarshipCourse.B23;
  return await main(ctx);
});

composer.callbackQuery(T.CourseB22Plus, async (ctx) => {
  ctx.session.scholarshipCourse = ScholarshipCourse.B22Plus;
  return await main(ctx);
});

export async function onMessage(ctx: MyContext) {
  // await ctx.reply(ctx.t(Message.ScholarshipRequest));
  const grades = ctx.message?.text;

  if (grades === undefined) {
    return onMessage(ctx);
  }

  const gpa = logic.parseGpa(grades);

  const scholarship = logic.calculate(gpa, ctx.session.scholarshipCourse);
  ctx.reply(scholarship.toString());
}
