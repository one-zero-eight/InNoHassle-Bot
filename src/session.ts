export interface SessionData {
  language: Language;
  notifications?: Date;
  studyGroup: StudyGroup;
  eapGroup: EapGroup;
  mutedTill?: Date;
  wasMutedFor: WasMutedFor;
}

export const enum Language {
  En = "English",
  Ru = "Russian",
}

export const enum StudyGroup {
  // BS Year 1
  B23Dsai01 = "B23-DSAI-01",
  B23Dsai02 = "B23-DSAI-02",
  B23Dsai03 = "B23-DSAI-03",
  B23Dsai04 = "B23-DSAI-04",
  B23Dsai05 = "B23-DSAI-05",
  B23Ise01 = "B23-ISE-01",
  B23Ise02 = "B23-ISE-02",
  B23Ise03 = "B23-ISE-03",
  B23Ise04 = "B23-ISE-04",
  B23Ise05 = "B23-ISE-05",

  // BS Year 2
  B22Cs01 = "B22-CS-01",
  B22Cs02 = "B22-CS-02",
  B22Cs03 = "B22-CS-03",
  B22Cs04 = "B22-CS-04",
  B22Cs05 = "B22-CS-05",
  B22Cs06 = "B22-CS-06",
  B22Dsai01 = "B22-DSAI-01",
  B22Dsai02 = "B22-DSAI-02",
  B22Dsai03 = "B22-DSAI-03",
  B22Dsai04 = "B22-DSAI-04",

  // BS Year 3
  B21Ai = "B21-AI",
  B21Cs = "B21-CS",
  B21Ds01 = "B21-DS-01",
  B21Ds02 = "B21-DS-02",
  B21Ro = "B21-RO",
  B21Sd01 = "B21-SD-01",
  B21Sd02 = "B21-SD-02",
  B21Sd03 = "B21-SD-03",

  // BS Year 4
  B20Ai01 = "B20-AI-01",
  B20Cs01 = "B20-CS-01",
  B20Ds01 = "B20-DS-01",
  B20Ro01 = "B20-RO-01",
  B20Sd01 = "B20-SD-01",
  B20Sd02 = "B20-SD-02",

  // MS Year 1
  M22Ds01 = "M22-DS-01",
  M22Ro01 = "M22-RO-01",
  M22Se01 = "M22-SE-01",
  M22Se02 = "M22-SE-02",
  M22Te01 = "M22-TE-01",

  // MS Year 2
  M21Ds = "M21-DS",

  Other = "Other",
}

export const enum EapGroup {
  // Beginner Level
  Eap0G1 = "EAP0-1",
  Eap0G2 = "EAP0-2",
  Eap0G3 = "EAP0-3",

  // Advanced Level
  Eap1G1 = "EAP1-1",
  Eap1G2 = "EAP1-2",
  Eap1G3 = "EAP1-3",
  Eap1G4 = "EAP1-4",
  Eap1G5 = "EAP1-5",
  Eap1G6 = "EAP1-6",
  Eap1G7 = "EAP1-7",
  Eap1G8 = "EAP1-8",
  Eap1G9 = "EAP1-9",
  Eap1G10 = "EAP1-10",
  Eap1G11 = "EAP1-11",
  Eap1G12 = "EAP1-12",
  Eap1G13 = "EAP1-13",
  Eap1G14 = "EAP1-14",

  Other = "Other",
}

export const enum WasMutedFor {
  None,
  Day,
  Week,
  Month,
  Ever,
}
