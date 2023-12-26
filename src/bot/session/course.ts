export interface Course {
  degree: Degree;
  year: Year;
  program: Program;
  group?: number;
}

export const enum Degree {
  B = "B",
  M = "M",
}

export const enum Year {
  Y23 = 23,
  Y22 = 22,
  Y21 = 21,
  Y20 = 20,
}

export const enum Program {
  Ai = "AI",
  Ds = "DS",
  Dsai = "DSAI",
  Cs = "CS",
  Ise = "ISE",
  Sd = "SD",
  Se = "SE",
  Te = "TE",
  Ro = "RO",
}
