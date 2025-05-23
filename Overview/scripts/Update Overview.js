function overview_update() {
  var overview_spreadsheet = SpreadsheetApp.openById("YOUR_INVENTORY_OVERVIEW_ID");
  var overview_sheet = overview_spreadsheet.getSheetByName("Overview");
  var ids = [
    "YOUR_INVENTORY_WORK_AREA_1_ID", 
    "YOUR_INVENTORY_WORK_AREA_2_ID", 
    "YOUR_INVENTORY_WORK_AREA_3_ID"
  ];

  var data = overview_sheet.getDataRange().getValues();
  var end_row = 3;
  
  while (data[end_row - 1] && data[end_row - 1][0] !== "") {
    end_row++;
  }

  for (var i = 2; i < end_row - 1; i++) {
    var item = data[i][0];
    var area = data[i][3];
    var sheet_id;

    if (area === "Work Area 1") {
      sheet_id = ids[0];
    } else if (area === "Work Area 2") {
      sheet_id = ids[1];
    } else {
      sheet_id = ids[2];
    }

    var target_spreasheet = SpreadsheetApp.openById(sheet_id);
    var target_sheet = target_spreasheet.getSheetByName(area);
    var target_data = target_sheet.getDataRange().getValues();
    var target_row = null;
    
    for (var j = 2; j < target_data.length; j++) {
      if (target_data[j][0] === "") {
        break;
      }
      if (target_data[j][0] === item) {
        target_row = j;

        target_sheet.getRange(target_row + 1, 5).setValue(false).setFontColor("#000000");
        target_sheet.getRange(target_row + 1, 6).setValue("");
        break;
      }
    }
    
    if (target_row !== null) {
      var cell = target_sheet.getRange(target_row + 1, 2);
      var bg_color = cell.getBackground();
      
      if (bg_color === "#34a853") {
        for (var k = 2; k < end_row - 1; k++) {
          if (data[k][0] === item) {
            overview_sheet.getRange(k + 1, 1, 1, 1).setValue("");
            overview_sheet.getRange(k + 1, 2, 1, 1).setValue("");
            overview_sheet.getRange(k + 1, 2, 1, 1).setBackground("#ffffff");
            overview_sheet.getRange(k + 1, 3, 1, 1).setValue("");
            overview_sheet.getRange(k + 1, 4, 1, 1).setValue("");
            overview_sheet.getRange(k + 1, 7, 1, 1).setValue("");
            overview_sheet.getRange(k + 1, 10, 1, 1).setValue("");
            overview_sheet.getRange(k + 1, 6, 1, 1).setValue(false).setFontColor("#000000");
          }
        }
      }
    }
  }
  
  var range = overview_sheet.getRange(3, 1, 198, 13);
  range.sort({column: 1, ascending: true});


}
