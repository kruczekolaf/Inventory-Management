function add_to_overview() {
  const source_spreadsheet_id = "YOUR_INVENTORY_WORK_AREA_3_ID";
  const target_spreadsheet_id = "YOUR_INVENTORY_OVERVIEW_ID";
  const target_sheet_name = "Overview";
  const stock_sheet_name = "Stock";

  const work_areas = ["Work Area 3-1", "Work Area 3-2", "Work Area 3-3", "Work Area 3-4", "Work Area 3-5", "Work Area 3-6"];

  const target_spreadsheet = SpreadsheetApp.openById(target_spreadsheet_id);
  const target_sheet = target_spreadsheet.getSheetByName(target_sheet_name);
  const stock_sheet = target_spreadsheet.getSheetByName(stock_sheet_name);

  const existing_entries = target_sheet.getRange("A3:A").getValues().flat().filter(String);
  const stock_entries = stock_sheet.getRange("A2:H50").getValues().flat();

  let new_rows = [];

  work_areas.forEach(areaName => {
    const sheet = SpreadsheetApp.openById(source_spreadsheet_id).getSheetByName(areaName);
    if (!sheet) return;

    const values = sheet.getRange("B3:B100").getValues();
    const bg_colors = sheet.getRange("B3:B100").getBackgrounds();


    for (let i = 0; i < values.length; i++) {
      const cellValue = values[i][0];
      const bg_color = bg_colors[i][0];
      if (cellValue === null || cellValue === "") break;

      if (bg_color === "#ff0000") {
        const row = sheet.getRange(i + 3, 1, 1, 3).getValues()[0];
        const key = row[0];
        const already_exists = existing_entries.includes(key) || stock_entries.includes(key);

        if (!already_exists) {
          row.push(areaName);
          new_rows.push(row);
          existing_entries.push(key);
        }
      }
    }
  });

  if (new_rows.length === 0) return;
  

  const target_values = target_sheet.getRange("A3:A").getValues().flat();
  let first_empty_row = target_values.indexOf("") + 3;
  if (first_empty_row === 2) first_empty_row = target_values.length + 3;

  const target_range = target_sheet.getRange(first_empty_row, 1, new_rows.length, 4);
  target_range.setValues(new_rows);

  target_sheet.getRange(first_empty_row, 2, new_rows.length, 1).setBackground("#ff0000");
  target_sheet.getRange(first_empty_row, 1, new_rows.length, 1).setHorizontalAlignment("center");

  var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
  target_sheet.getRange("O2:P2").setValue(today);
  target_sheet.getRange("O2:P2").setFontSize(13);
  target_sheet.getRange("O2:P2").setFontWeight("bold");
  target_sheet.getRange("O2:P2").setFontFamily("Calibri");
}
