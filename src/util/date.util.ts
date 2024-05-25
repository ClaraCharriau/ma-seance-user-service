import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export class DateUtils {
  private static readonly LOCALE = fr;

  public static getDayName(date: Date): string {
    return format(date, 'EEEE', { locale: this.LOCALE });
  }

  public static getDayNumber(date: Date): string {
    return format(date, 'dd', { locale: this.LOCALE });
  }

  public static getMonth(date: Date): string {
    return format(date, 'MMMM', { locale: this.LOCALE });
  }

  public static getYear(date: Date): string {
    return format(date, 'yyyy', { locale: this.LOCALE });
  }

  public static getHourly(date: Date): string {
    return format(date, 'HH:mm', { locale: this.LOCALE });
  }
}
