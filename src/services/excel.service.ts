import ExcelJS from "exceljs";
import DateService from "./date.service";

export default class ExcelService {
  public async createWorksheetForCurrentMonth() {
    const workbook = new ExcelJS.Workbook();

    const year = DateService.getCurrentYear();
    const month = DateService.getCurrentMonthName();

    const sheet = workbook.addWorksheet(`${month} ${year}`);

    sheet.columns = [
      { header: "Wochentag", key: "weekday" },
      { header: "Datum", key: "date" },
      { header: "Arbeitszeitbeginn", key: "worktimeStart" },
      { header: "Pausenzeitstart", key: "pauseStart" },
      { header: "Pausenzeitende", key: "pauseEnd" },
      { header: "Arbeitszeitende", key: "worktimeEnd" },
      { header: "Pausenzeit", key: "pauseTime" },
      { header: "ArbeitszeitIst", key: "worktimeIs" },
      { header: "ArbeitszeitSoll", key: "worktimeShouldBe" },
    ];

    const dateCol = sheet.getColumn("date");

    const daysInMonth = DateService.daysInMonth();
    const currentMonth = DateService.getCurrentMonth();

    const dates: string[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, currentMonth, i).toLocaleDateString("de", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      dates.push(date);
    }

    dateCol.values = [dateCol.header as string, ...dates];

    const weekdayCol = sheet.getColumn("weekday");

    const weekdays: string[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = DateService.getDayName(
        year,
        DateService.getCurrentMonth(),
        i
      );

      weekdays.push(date);
    }

    weekdayCol.values = [weekdayCol.header as string, ...weekdays];

    const worktimeIs = sheet.getColumn("worktimeIs");

    const worktimeIsValues: any[] = [];

    for (let i = 2; i <= weekdays.length + 1; i++) {
      worktimeIsValues.push({ formula: `F${i}-C${i}-G${i}`, date1904: false });
    }

    worktimeIs.values = [worktimeIs.header as string, ...worktimeIsValues];

    sheet.columns.forEach(function (column, i) {
      var maxLength = 0;
      column?.["eachCell"]?.({ includeEmpty: true }, function (cell) {
        var columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
    });

    sheet.eachRow(function (row, _rowNumber) {
      row.eachCell(function (cell, _colNumber) {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    return await workbook.xlsx.writeBuffer();
  }
}
