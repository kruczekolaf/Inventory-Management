function insert_in_sheet() {

  var wa1_answers_spreadsheet = SpreadsheetApp.openById("YOUR_INVENTORY_WORK_AREA_1_(ANSWERS)_ID");
  var wa1_answers_sheet = wa1_answers_spreadsheet.getSheetByName("Work Area 1 Answers");

  var wa1_inventory_spreadsheet = SpreadsheetApp.openById("YOUR_INVENTORY_WORK_AREA_1_ID");
  var wa1_inventory_sheet = wa1_inventory_spreadsheet.getSheetByName("Work Area 1");

  var last_row = wa1_answers_sheet.getLastRow();
  var header_row = wa1_answers_sheet.getRange(1, 3, 1, wa1_answers_sheet.getLastColumn() - 2).getValues()[0];
  var data_row = wa1_answers_sheet.getRange(last_row, 3, 1, wa1_answers_sheet.getLastColumn() - 2).getValues()[0];

  var date_string = wa1_answers_sheet.getRange(last_row, 1).getValue();
  let date = new Date(date_string);
  let formatted_date = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');
  var employee = wa1_answers_sheet.getRange(last_row, 2).getValue();

  var data = [];
  for (var i = 0; i < data_row.length; i++) {
    if (data_row[i] !== "") {
      data.push([data_row[i], header_row[i]]);
    }
  }

  data.forEach(entry => {
  var rows = wa1_inventory_sheet.getRange("A3:A").getValues();
  for (var i = 0; i < rows.length; i++) {
    if (rows[i][0] === entry[1]) {
      wa1_inventory_sheet.getRange(i + 3, 2).setValue(entry[0]);
    }
  }
  });

  wa1_inventory_sheet.getRange("E1").setValue("Last Inventory taken:");
  wa1_inventory_sheet.getRange("E1").setBackground("#cccccc");
  wa1_inventory_sheet.getRange("E1:F1").setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
  wa1_inventory_sheet.getRange("F1").setValue(formatted_date);

  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty("formatted_date", formatted_date);
  scriptProperties.setProperty("employee", employee);

  add_to_summary();
  add_to_overview();

}
