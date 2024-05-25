import { DateUtils } from 'src/util/date.util';

export class ScheduleDto {
  date: Date;
  dayName: string;
  dayNumber: string;
  month: string;
  year: string;
  hourly: string;

  static fromDate(date: Date) {
    let schedule = new ScheduleDto();

    schedule.date = date;
    schedule.dayName = DateUtils.getDayName(date);
    schedule.dayNumber = DateUtils.getDayNumber(date);
    schedule.month = DateUtils.getMonth(date);
    schedule.year = DateUtils.getYear(date);
    schedule.hourly = DateUtils.getHourly(date);
    return schedule;
  }
}
