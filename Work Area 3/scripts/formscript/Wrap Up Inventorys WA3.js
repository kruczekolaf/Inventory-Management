function wrapup_summary() {
  const inventory_spreadsheet = SpreadsheetApp.openById("YOUR_INVENTORY_WORK_AREA_3_ID");
  const summary_sheet = inventory_spreadsheet.getSheetByName("Work Area 3 Summary");

  const source_sheets = ["Work Area 3-1", "Work Area 3-2", "Work Area 3-3", "Work Area 3-4", "Work Area 3-5", "Work Area 3-6"];

  const scriptProperties = PropertiesService.getScriptProperties();
  const date_string = scriptProperties.getProperty("date");
  let date = new Date(date_string);

  let formatted_date = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');
  const employee = scriptProperties.getProperty("employee");

  let column_index; 
  if (typeof column_index === "undefined") {
    let col = 1;
    while (summary_sheet.getRange(1, col).getValue() !== "") {
      col++;
    }
    column_index = (col === 1) ? 1 : summary_sheet.getLastColumn() + 2;
  }

  summary_sheet.getRange(1, column_index + 3).setValue("Date:");
  summary_sheet.getRange(1, column_index + 4).setValue(formatted_date);
  summary_sheet.getRange(2, column_index + 3).setValue("Employee:");
  summary_sheet.getRange(2, column_index + 4).setValue(employee);
  summary_sheet.getRange(1, column_index + 3, 2, 2).setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.SOLID_THICK).setFontColor("#000000");
  summary_sheet.getRange(1, column_index + 3, 2, 1).setBackground("#cccccc");

  source_sheets.forEach(sheetName => {
    const source_sheet = inventory_spreadsheet.getSheetByName(sheetName);
    const last_row = source_sheet.getRange("A:A").getLastRow();
    
    let free_cell = null;
    for (let row = 1; row <= last_row; row++) {
      const cell_value = source_sheet.getRange(row, 1).getValue();
      if (!cell_value) {
      free_cell = row;
      break;
      }
    }

    const range = source_sheet.getRange(1, 1, free_cell, 3); 
    const values = range.getValues();
    const backgrounds = range.getBackgrounds();
    const font_colors = range.getFontColorObjects();

    let row = 1;
    while (summary_sheet.getRange(row, column_index).getValue() !== "") {
      row++;
    }

    
    const target_range = summary_sheet.getRange(row, column_index, values.length, 3);
    target_range.setValues(values);
    target_range.setBackgrounds(backgrounds);
    target_range.setFontColorObjects(font_colors);
    target_range.setFontSize(13);

    summary_sheet.getRange(row, column_index, 1, 3).merge();
    summary_sheet.getRange(row, column_index, free_cell - 1, 3).setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.SOLID);
    summary_sheet.getRange(row, column_index, 2, 3).setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
    summary_sheet.getRange(row, column_index, free_cell - 1, 3).setBorder(true, true, true, true, null, null, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
    summary_sheet.getRange(row, column_index, free_cell - 1, 1).setBorder(null, null, null, true, null, null, "black", SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
    summary_sheet.getRange(row, column_index + 1, free_cell - 1, 1).setBorder(null, null, null, true, null, null, "black", SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

    for(i = 0; i < 3; i++) {
      summary_sheet.setColumnWidth(column_index + i, 115);
    }
  });

}



