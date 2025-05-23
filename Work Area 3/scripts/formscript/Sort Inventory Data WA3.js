function sort_Data() {
  var wa3_answers_spreadsheet = "YOUR_INVENTORY_WORK_AREA_3_(ANSWERS)_ID";
  var wa3_inventory_database_spreadsheet = "YOUR_INVENTORY_WORK_AREA_3_ID";
  var wa3_answers_sheet = SpreadsheetApp.openById(wa3_answers_spreadsheet).getSheetByName("Work Area 3 Answers");
  var wa3_inventory_database_sheet = SpreadsheetApp.openById(wa3_inventory_database_spreadsheet).getSheetByName("Inventory Database");

  var last_row = wa3_answers_sheet.getLastRow();
  var header_row = wa3_answers_sheet.getRange(1, 3, 1, wa3_answers_sheet.getLastColumn() - 2).getValues()[0];
  var data_row = wa3_answers_sheet.getRange(last_row, 3, 1, wa3_answers_sheet.getLastColumn() - 2).getValues()[0];

  var date = wa3_answers_sheet.getRange(last_row, 1).getValue();
  var employee = wa3_answers_sheet.getRange(last_row, 2).getValue();
  
  var data = [];
  for (var i = 0; i < data_row.length; i++) {
    if (data_row[i] !== "") {
      data.push([data_row[i], header_row[i]]);
    }
  }

  var wa_3_1 = [], wa_3_2 = [], wa_3_3 = [], wa_3_4 = [], wa_3_5 = [], wa_3_6 = [];
  var wa_data = wa3_inventory_database_sheet.getRange("A1:F100").getValues();

  data.forEach(entry => {
    for (var i = 0; i < wa_data.length; i++) {
      for (var j = 0; j < 6; j++) {
        if (wa_data[i][j] === entry[1]) {
          [wa_3_1, wa_3_2, wa_3_3, wa_3_4, wa_3_5, wa_3_6][j].push(entry);
        }
      }
    }
  });

  // --- Set Variables for other Scripts --- //
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty("date", date);
  scriptProperties.setProperty("employee", employee);
  scriptProperties.setProperty("wa_3_1", JSON.stringify(wa_3_1));
  scriptProperties.setProperty("wa_3_2", JSON.stringify(wa_3_2));
  scriptProperties.setProperty("wa_3_3", JSON.stringify(wa_3_3));
  scriptProperties.setProperty("wa_3_4", JSON.stringify(wa_3_4));
  scriptProperties.setProperty("wa_3_5", JSON.stringify(wa_3_5));
  scriptProperties.setProperty("wa_3_6", JSON.stringify(wa_3_6));

  insert_in_sheet();
  wrapup_summary();
  add_to_overview();

}
