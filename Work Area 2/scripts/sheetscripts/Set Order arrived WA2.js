function order_arrived(e) {
  var sheet_name = "Work Area 2";
  var sheet = e.source.getSheetByName(sheet_name);
  var range = e.range;
  
  if (sheet.getName() === sheet_name && range.getColumn() === 7) {
    var checkbox_value = range.getValue();
    var date_cell = range.offset(0, -1);
    var checkbox_cell = range.offset(0, -2);
    
    if (checkbox_value === true) {
      date_cell.clearContent();
      checkbox_cell.setValue(false); 
      range.setValue(false);
      checkbox_cell.setFontColor("#000000");
    }
  }
}