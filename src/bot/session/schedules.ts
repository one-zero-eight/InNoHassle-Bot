interface Schedule {
  name: string;
  link: string;
}

export interface ScheduleOptions {
  schedule: Schedule;
  notifyBefore?: Date;
}
