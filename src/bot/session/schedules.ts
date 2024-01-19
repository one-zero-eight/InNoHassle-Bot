export interface ScheduleOptions {
  schedule: Schedule;
  notifyBefore?: Date;
}

export interface Schedule {
  name: string;
  link: string;
}
