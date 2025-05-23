function order_arrived(e) {

  var sheet_names = ["Work Area 3-1", "Work Area 3-2", "Work Area 3-3", "Work Area 3-4", "Work Area 3-5", "Work Area 3-6"];
  
  var sheet = e.source.getActiveSheet();
  var sheet_name = sheet.getName();
  var range = e.range;
  
  if (sheet_names.includes(sheet_name) && range.getColumn() === 7) { 
    var checkbox_value = range.getValue();
    var date_cell = range.offset(0, -1);
    var ordered_cell = range.offset(0, -2);
    
    if (checkbox_value === true) {
      date_cell.clearContent();
      ordered_cell.setValue(false);
      range.setValue(false);
      ordered_cell.setFontColor("#000000");
    }
  }

}