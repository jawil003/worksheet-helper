export default class DateService {
  public static daysInMonth() {
    const year = this.getCurrentYear();
    const month = this.getCurrentMonth();

    return new Date(year, month + 1, 0).getDate();
  }

  public static getCurrentMonth() {
    const date = new Date();
    const month = date.getMonth();

    return month;
  }

  public static getDayName(year: number, month: number, day: number) {
    const date = new Date(year, month, day);

    return date.toLocaleDateString("de", { weekday: "long" });
  }

  public static getCurrentMonthName() {
    const date = new Date();
    const month = date.toLocaleString("de", { month: "long" });

    return month;
  }

  public static getCurrentYear() {
    const date = new Date();

    return date.getFullYear();
  }
}
