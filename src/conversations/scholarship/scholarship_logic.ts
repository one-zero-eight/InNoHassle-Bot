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
    grades = [parseFloat(gradesInput[0].replace(",", "."))];
  }

  const sum = grades.reduce((a, b) => a + b, 0);
  const gpa = sum / grades.length;

  return gpa;
}

export function calculate(gpa: number, course: Course): number {
  if (!(2.0 <= gpa && gpa <= 5.0)) {
    throw new RangeError(`\`gpa\` (\`${gpa}\`) is out of range [2.0, 5.0]`);
  }

  const m_min = 3000;

  let m_max;
  switch (course.year) {
    case Year.Y20:
    case Year.Y21:
    case Year.Y22:
      m_max = 20_000;
      break;
    case Year.Y23:
      m_max = 10_000;
      break;
  }

  return apply_formula(gpa, m_min, m_max);
}

function apply_formula(gpa: number, m_min: number, m_max: number): number {
  let s = m_min + (m_max - m_min) * ((gpa - 2) / 3) ** 2.5;
  s = Math.floor(s / 100) * 100;
  return s;
}
