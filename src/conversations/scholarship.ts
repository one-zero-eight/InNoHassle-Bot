import { Composer, InlineKeyboard } from "grammy";

import State from "~/bot/session/state.ts";
import * as logic from "~/conversations/scholarship/scholarship_logic.ts";
import type MyContext from "~/bot/context.ts";
import T from "~/labels.ts";
import ScholarshipCourse from "~/bot/session/scholarship_course.ts";
import { type ParsedGrades } from "~/conversations/scholarship/scholarship_logic.ts";

export const composer = new Composer<MyContext>();

const enum CallType {
  Request,
  Ok,
  Err,
}

type Options =
  | { callType: CallType.Request }
  | { callType: CallType.Ok; grades: ParsedGrades }
  | { callType: CallType.Err };

async function main(ctx: MyContext, opts: Options) {
  ctx.session.state = State.Scholarship;

  const inlineKeyboard = new InlineKeyboard()
    .text(
      ctx.t(T.ButtonScholarshipSelectCourse),
      T.ButtonScholarshipSelectCourse,
    )
    .text(ctx.t(T.ButtonBackToMainMenu), T.ButtonBackToMainMenu);

  const course = ctx.t(logic.courseName(ctx.session.scholarshipCourse));

  switch (opts.callType) {
    case CallType.Request: {
      await ctx.api.editMessageText(
        ctx.chat?.id!,
        ctx.session.messageId,
        ctx.t(T.ScholarshipRequest, { course, error: 0 }),
        { parse_mode: "HTML", reply_markup: inlineKeyboard },
      );
      break;
    }
    case CallType.Ok: {
      const scholarship = logic.calculate(
        opts.grades.gpa,
        ctx.session.scholarshipCourse,
      );

      if (opts.grades.grades !== undefined) {
        const grades = logic.formatGrades(opts.grades.grades);

        await ctx.api.editMessageText(
          ctx.chat?.id!,
          ctx.session.messageId,
          ctx.t(T.ScholarshipResponseGrades, {
            course,
            grades,
            gpa: opts.grades.gpa,
            scholarship,
          }),
          { parse_mode: "HTML", reply_markup: inlineKeyboard },
        );
      } else {
        await ctx.api.editMessageText(
          ctx.chat?.id!,
          ctx.session.messageId,
          ctx.t(T.ScholarshipResponse, {
            course,
            gpa: opts.grades.gpa,
            scholarship,
          }),
          { parse_mode: "HTML", reply_markup: inlineKeyboard },
        );
      }
      break;
    }
    case CallType.Err: {
      await ctx.api.editMessageText(
        ctx.chat?.id!,
        ctx.session.messageId,
        ctx.t(T.ScholarshipRequest, { course, error: 1 }),
        { parse_mode: "HTML", reply_markup: inlineKeyboard },
      );
    }
  }
}

composer.callbackQuery(
  T.ButtonMainMenuScholarship,
  async (ctx) => await main(ctx, { callType: CallType.Request }),
);
composer.callbackQuery(
  T.ButtonBackToScholarship,
  async (ctx) => await main(ctx, { callType: CallType.Request }),
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
  return await main(ctx, { callType: CallType.Request });
});

composer.callbackQuery(T.CourseB22Plus, async (ctx) => {
  ctx.session.scholarshipCourse = ScholarshipCourse.B22Plus;
  return await main(ctx, { callType: CallType.Request });
});

export async function onMessage(ctx: MyContext) {
  let opts: Options;

  try {
    const grades = ctx.message?.text;
    await ctx.deleteMessage();
    opts = { callType: CallType.Ok, grades: logic.parseGrades(grades!) };
  } catch (_) {
    opts = { callType: CallType.Err };
  }

  return await main(ctx, opts);
}
