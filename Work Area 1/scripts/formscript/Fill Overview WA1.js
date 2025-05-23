function add_to_overview() {

  var source_sheet = SpreadsheetApp.openById("YOUR_INVENTORY_WORK_AREA_1_ID").getSheetByName("Work Area 1");
  var target_sheet = SpreadsheetApp.openById("YOUR_INVENTORY_OVERVIEW_ID").getSheetByName("Overview");
  var stock_sheet = SpreadsheetApp.openById("YOUR_INVENTORY_OVERVIEW_ID").getSheetByName("Stock");
  
  var data = [];
  var cloumn_b = source_sheet.getRange("B3:B100").getValues();
  var bg_colors = source_sheet.getRange("B3:B100").getBackgrounds();
  
  for (var i = 0; i < cloumn_b.length; i++) {
    if (cloumn_b[i][0] === "" || cloumn_b[i][0] === null) break;
    
    if (bg_colors[i][0] == "#ff0000") {
      var row_index = i + 3; 
      var row_data = source_sheet.getRange(row_index, 1, 1, 3).getValues()[0];
      row_data.push("Work Area 1");
      data.push(row_data);
    }
  }

  if (data.length === 0) return;
  
  var column_a = target_sheet.getRange("A3:A").getValues().flat();
  var existing_values = column_a.filter(value => value !== "");
  
  var first_empty_row = column_a.indexOf("") + 3;
  if (first_empty_row === 2) first_empty_row = column_a.length + 3;
  
  var stock_values = stock_sheet.getRange("A2:H50").getValues();
  
  var new_data = [];

  data.forEach(row => {
    var existsInStock = stock_values.some(stockRow => stockRow.includes(row[0]));
    if (!existing_values.includes(row[0]) && !existsInStock) { 
      new_data.push(row);
      existing_values.push(row[0]); 
    }
  });

  if (new_data.length === 0) return; 
  var target_range = target_sheet.getRange(first_empty_row, 1, new_data.length, 4);
  target_range.setValues(new_data);
  var bg_range = target_sheet.getRange(first_empty_row, 2, new_data.length, 1);
  bg_range.setBackground("#ff0000");
  var align_range = target_sheet.getRange(first_empty_row, 1, new_data.length, 1);
  align_range.setHorizontalAlignment("center");


  var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
  target_sheet.getRange("O2:P2").setValue(today);
  target_sheet.getRange("O2:P2").setFontSize(13);
  target_sheet.getRange("O2:P2").setFontWeight("bold");
  target_sheet.getRange("O2:P2").setFontFamily("Calibri");
}
