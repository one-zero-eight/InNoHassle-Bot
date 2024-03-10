import { Composer, InlineKeyboard } from "grammy";

import State from "~/bot/session/state.ts";
import * as logic from "~/conversations/scholarship/scholarship_logic.ts";
import type MyContext from "~/bot/context.ts";
import T from "~/labels.ts";
import ScholarshipCourse from "~/bot/session/scholarship_course.ts";

export const composer = new Composer<MyContext>();

async function main(ctx: MyContext, error: boolean, gpa?: number) {
  ctx.session.state = State.Scholarship;

  const inlineKeyboard = new InlineKeyboard()
    .text(
      ctx.t(T.ButtonScholarshipSelectCourse),
      T.ButtonScholarshipSelectCourse,
    )
    .text(
      ctx.t(T.ButtonBackToMainMenu),
      T.ButtonBackToMainMenu,
    );

  const course = ctx.t(logic.courseName(ctx.session.scholarshipCourse));

  if (error) {
    await ctx.api.editMessageText(
      ctx.chat?.id!,
      ctx.session.messageId,
      ctx.t(T.ScholarshipRequest, { course, error: 1 }),
      { parse_mode: "HTML", reply_markup: inlineKeyboard },
    );
    return;
  }

  if (gpa !== undefined) {
    const scholarship = logic.calculate(gpa, ctx.session.scholarshipCourse);

    await ctx.api.editMessageText(
      ctx.chat?.id!,
      ctx.session.messageId,
      ctx.t(T.ScholarshipResponse, { course, gpa, scholarship }),
      { parse_mode: "HTML", reply_markup: inlineKeyboard },
    );
    return;
  }

  await ctx.api.editMessageText(
    ctx.chat?.id!,
    ctx.session.messageId,
    ctx.t(T.ScholarshipRequest, { course, error: 0 }),
    { parse_mode: "HTML", reply_markup: inlineKeyboard },
  );
}

composer.callbackQuery(
  T.ButtonMainMenuScholarship,
  async (ctx) => await main(ctx, false, undefined),
);
composer.callbackQuery(
  T.ButtonBackToScholarship,
  async (ctx) => await main(ctx, false, undefined),
);

composer.callbackQuery(T.ButtonScholarshipSelectCourse, async (ctx) => {
  ctx.session.state = undefined;

  const inlineKeyboard = new InlineKeyboard()
    .text(ctx.t(T.CourseB23), T.CourseB23)
    .text(ctx.t(T.CourseB22Plus), T.CourseB22Plus)
    .row()
    .text(ctx.t(T.ButtonBackToScholarship), T.ButtonBackToScholarship);

  await ctx.api.editMessageText(
    ctx.chat?.id!,
    ctx.session.messageId,
    ctx.t(T.ScholarshipSelectCourse),
    { parse_mode: "HTML", reply_markup: inlineKeyboard },
  );
});

composer.callbackQuery(T.CourseB23, async (ctx) => {
  ctx.session.scholarshipCourse = ScholarshipCourse.B23;
  return await main(ctx, false, undefined);
});

composer.callbackQuery(T.CourseB22Plus, async (ctx) => {
  ctx.session.scholarshipCourse = ScholarshipCourse.B22Plus;
  return await main(ctx, false, undefined);
});

export async function onMessage(ctx: MyContext) {
  const grades = ctx.message?.text;
  await ctx.deleteMessage();

  if (grades === undefined) {
    return await main(ctx, true, undefined);
  }

  try {
    const gpa = logic.parseGpa(grades);
    return await main(ctx, false, gpa);
  } catch (_) {
    return await main(ctx, true, undefined);
  }
}
