import { z } from "zod";

import { Year } from "~/bot.ts";

export function parseGpa(str: string): number {
  const ZGrades = z.array(
    z.union([
      z.enum(["2", "D", "d", "F", "f"]).transform((_) => 2),
      z.enum(["3", "C", "c"]).transform((_) => 3),
      z.enum(["4", "B", "b"]).transform((_) => 4),
      z.enum(["5", "A", "a", "P", "p"]).transform((_) => 5),
    ]),
  );

  const gradesInput = str.trim().toUpperCase().split(/\s+/);

  let grades: number[];

  try {
    grades = ZGrades.parse(gradesInput);
  } catch (e) {
    if (gradesInput?.length !== 1) {
      throw e;
    }
    grades = [parseFloat(gradesInput[0].replace(",", "."))];
  }

  const sum = grades.reduce((a, b) => a + b, 0);
  const gpa = sum / grades.length;

  if (!(2.0 <= gpa && gpa <= 5.0)) {
    throw new RangeError(`\`gpa\` (\`${gpa}\`) is out of range [2.0, 5.0]`);
  }

  return gpa;
}

export function calculate(gpa: number, courseYear: Year): number {
  const mMin = 3000;

  let mMax;
  switch (courseYear) {
    case Year.Y20:
    case Year.Y21:
    case Year.Y22:
      mMax = 20_000;
      break;
    case Year.Y23:
      mMax = 10_000;
      break;
  }

  return applyFormula(gpa, mMin, mMax);
}

function applyFormula(gpa: number, mMin: number, mMax: number): number {
  let s = mMin + (mMax - mMin) * ((gpa - 2) / 3) ** 2.5;
  s = Math.floor(s / 100) * 100;
  return s;
}
