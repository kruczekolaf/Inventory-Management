function insert_in_sheet() {

  var wa3_inventory_database_spreadsheet = "YOUR_INVENTORY_WORK_AREA_3_ID";

  const scriptProperties = PropertiesService.getScriptProperties();
  const date_string = scriptProperties.getProperty("date");
  const wa_3_1 = JSON.parse(scriptProperties.getProperty("wa_3_1") || "[]");
  const wa_3_2 = JSON.parse(scriptProperties.getProperty("wa_3_2") || "[]");
  const wa_3_3 = JSON.parse(scriptProperties.getProperty("wa_3_3") || "[]");
  const wa_3_4 = JSON.parse(scriptProperties.getProperty("wa_3_4") || "[]");
  const wa_3_5 = JSON.parse(scriptProperties.getProperty("wa_3_5") || "[]");
  const wa_3_6 = JSON.parse(scriptProperties.getProperty("wa_3_6") || "[]");

  let date = new Date(date_string);
  let formatted_date = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');

  var sheetNames = ["Work Area 3-1", "Work Area 3-2", "Work Area 3-3", "Work Area 3-4", "Work Area 3-5", "Work Area 3-6"];
  var arrays = [wa_3_1, wa_3_2, wa_3_3, wa_3_4, wa_3_5, wa_3_6];
  
  sheetNames.forEach((sheetName, index) => {
    var sheet = SpreadsheetApp.openById(wa3_inventory_database_spreadsheet).getSheetByName(sheetName);
    arrays[index].forEach(entry => {
      var rows = sheet.getRange("A3:A").getValues();
      for (var i = 0; i < rows.length; i++) {
        if (rows[i][0] === entry[1]) {
          sheet.getRange(i + 3, 2).setValue(entry[0]);
        }
      }
    });
    sheet.getRange("E1").setValue("Last Inventory taken:");
    sheet.getRange("E1").setBackground("#cccccc");
    sheet.getRange("E1:F1").setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
    sheet.getRange("F1").setValue(formatted_date);

    /* // Setup for adding Item via Script
    var lastRow = sheet.getLastRow(); // Letzte Zeile des gesamten Blattes
    var columnAValues = sheet.getRange("A1:A" + lastRow).getValues();

    var lastOccupiedRow = 0;
    for (var i = 0; i < columnAValues.length; i++) {
      if (columnAValues[i][0] != "") {
        lastOccupiedRow = i + 1;
      }
    }

    sheet.getRange(3, 5, lastOccupiedRow - 2, 1).insertCheckboxes();
    sheet.getRange(3, 7, lastOccupiedRow - 2, 1).insertCheckboxes();
    sheet.getRange(3, 5, lastOccupiedRow - 2, 3).setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.SOLID);
    sheet.getRange(3, 5, lastOccupiedRow - 2, 3).setBorder(true, true, true, true, null, null, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
    */

  });

}
