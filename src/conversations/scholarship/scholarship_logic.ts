import { z } from "zod";

import { Course, Year } from "@/bot.ts";

export async function parseGpa(str: string): Promise<number> {
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
    grades = await ZGrades.parseAsync(gradesInput);
  } catch (e) {
    if (gradesInput.length !== 1) {
      throw e;
    }

    const gpa = parseFloat(gradesInput[0].replace(",", "."));

    if (!(2 <= gpa && gpa <= 5)) {
      throw e;
    }

    return gpa;
  }

  const sum = grades.reduce((a, b) => a + b, 0);

  const gpa = sum / grades.length;
  return gpa;
}

export function calculate(gpa: number): number {
  if (!(2.0 <= gpa && gpa <= 5.0)) {
    throw new RangeError(`\`gpa\` (\`${gpa}\`) is out of range [2.0, 5.0]`);
  }

  const M_MIN = 3000;
  const M_MAX = 20_000;

  let s = M_MIN + (M_MAX - M_MIN) * ((gpa - 2) / 3) ** 2.5;
  s = Math.floor(s / 100) * 100;
  return s;
}
