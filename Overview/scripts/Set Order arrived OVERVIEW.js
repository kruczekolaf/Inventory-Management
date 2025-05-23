function order_arrived(e) {
  var sheet_name = "Overview";
  var sheet = e.source.getSheetByName(sheet_name);
  var range = e.range;
  
  if (sheet.getName() === sheet_name && range.getColumn() === 8) { 
    var checkbox_value = range.getValue();
    var row = range.getRow();
    
    if (checkbox_value === true) {
      
      var ids = [
        "YOUR_INVENTORY_WORK_AREA_1_ID", 
        "YOUR_INVENTORY_WORK_AREA_2_ID", 
        "YOUR_INVENTORY_WORK_AREA_3_ID"
      ];
      
      var area = sheet.getRange(row, 4).getValue(); 
      var item = sheet.getRange(row, 1).getValue(); 
      
      var sheet_id;
      if (area === "Work Area 1") {
        sheet_id = ids[0];
      } else if (area === "Work Area 2") {
        sheet_id = ids[1];
      } else {
        sheet_id = ids[2];
      }
      
      var target_spreadsheet = SpreadsheetApp.openById(sheet_id);
      var target_sheet = target_spreadsheet.getSheetByName(area);
      
      if (target_sheet) {
        var data = target_sheet.getRange("A3:A").getValues();
        var target_row = null;
        
        for (var i = 0; i < data.length; i++) {
          if (data[i][0] === item) {
            target_row = i + 3; 
            target_row_source = target_row;
            break;
          }
        }
        
        if (!target_row) {
          for (var i = 0; i < data.length; i++) {
            if (data[i][0] === "") {
              target_row = i + 3;
              break;
            }
          }
        }
        
        if (target_row) {
          target_sheet.getRange(target_row, 5).setValue(false).setFontColor("#000000"); 
          target_sheet.getRange(target_row, 6).clearContent(); // Datum setzen (F)
          target_sheet.getRange(target_row, 7).setValue(false).setFontColor("#000000");

          sheet.getRange(row, 6).setValue(false).setFontColor("#000000"); 
          sheet.getRange(row, 7).clearContent(); 
          sheet.getRange(row, 8).setValue(false).setFontColor("#000000"); 

          sheet.getRange(row, 1).clearContent();
          sheet.getRange(row, 2).clearContent();
          sheet.getRange(row, 2).setBackground("#ffffff");
          sheet.getRange(row, 3).clearContent();
          sheet.getRange(row, 4).clearContent();
        }
      }
    }
    var sorting = sheet.getRange(3, 1, 198, 13);
    sorting.sort({column: 1, ascending: true});
  }
}
