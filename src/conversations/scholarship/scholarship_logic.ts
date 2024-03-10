import { z } from "zod";

import ScholarshipCourse from "~/bot/session/scholarship_course.ts";
import T from "~/labels.ts";

const enum Grade {
  A = 5,
  B = 4,
  C = 3,
  D = 2,
}

export type ParsedGrades = {
  grades?: Grade[];
  gpa: number;
};

export function parseGrades(str: string): ParsedGrades | never {
  const ZGrades = z.array(
    z.union([
      z.enum(["5", "A", "a", "P", "p"]).transform((_) => Grade.A),
      z.enum(["4", "B", "b"]).transform((_) => Grade.B),
      z.enum(["3", "C", "c"]).transform((_) => Grade.C),
      z.enum(["2", "D", "d", "F", "f"]).transform((_) => Grade.D),
    ]),
  );
  const gradesInput = str.trim().replace(/\s/g, "");

  if (gradesInput.includes(".")) {
    const gpa = Number.parseFloat(gradesInput);

    if (!isNaN(gpa) && 2.0 <= gpa && gpa <= 5.0) {
      return { grades: undefined, gpa };
    }
  }

  const result = ZGrades.safeParse(gradesInput.split(""));

  if (result.success) {
    return { grades: result.data, gpa: parseGpa(result.data) };
  } else {
    throw result.error;
  }
}

function parseGpa(grades: Grade[]): number | never {
  const sum = grades.reduce((a, b) => a + b, 0);
  const gpa = sum / grades.length;

  if (!(2.0 <= gpa && gpa <= 5.0)) {
    throw new RangeError(`\`gpa\` (\`${gpa}\`) is out of range [2.0, 5.0]`);
  }

  return gpa;
}

export function formatGrades(grades: Grade[]): string {
  let formatted = "";

  switch (grades[0]) {
    case Grade.A: {
      formatted += "A";
      break;
    }
    case Grade.B: {
      formatted += "B";
      break;
    }
    case Grade.C: {
      formatted += "C";
      break;
    }
    case Grade.D: {
      formatted += "D";
      break;
    }
  }

  for (const it of grades.slice(1)) {
    formatted += " ";

    switch (it) {
      case Grade.A: {
        formatted += "A";
        break;
      }
      case Grade.B: {
        formatted += "B";
        break;
      }
      case Grade.C: {
        formatted += "C";
        break;
      }
      case Grade.D: {
        formatted += "D";
        break;
      }
    }
  }

  return formatted;
}

export function calculate(gpa: number, course: ScholarshipCourse): number {
  const mMin = 3_000;

  let mMax;
  switch (course) {
    case ScholarshipCourse.B23: {
      mMax = 10_000;
      break;
    }
    case ScholarshipCourse.B22Plus: {
      mMax = 20_000;
      break;
    }
  }

  return applyFormula(gpa, mMin, mMax);
}

function applyFormula(gpa: number, mMin: number, mMax: number): number {
  let s = mMin + (mMax - mMin) * ((gpa - 2) / 3) ** 2.5;
  s = Math.floor(s / 100) * 100;
  return s;
}

export function courseName(course: ScholarshipCourse): T {
  switch (course) {
    case ScholarshipCourse.B22Plus: {
      return T.CourseB22Plus;
    }
    case ScholarshipCourse.B23: {
      return T.CourseB23;
    }
  }
}
