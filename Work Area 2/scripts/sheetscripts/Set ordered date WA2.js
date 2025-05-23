function add_order_date(e) {
  var sheet_name = "Work Area 2";
  var sheet = e.source.getSheetByName(sheet_name);
  var range = e.range;
  
  if (sheet.getName() === sheet_name && range.getColumn() === 5) {
    var checkbox_value = range.getValue();
    var date_cell = range.offset(0, 1);
    
    if (checkbox_value === true && date_cell.getValue() === "") {
      var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
      date_cell.setValue(today);
      range.setFontColor("#34a853");
    }
  }
}
