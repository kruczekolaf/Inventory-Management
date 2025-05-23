function monthly_inventory_summary() {
  var wa_2_inventory_spreadsheet = SpreadsheetApp.openById("YOUR_INVENTORY_WORK_AREA_2_ID");
  var wa_2_summary_sheet = wa_2_inventory_spreadsheet.getSheetByName("Work Area 2 Summary");
  var wa_2_monthly_spreadsheet = SpreadsheetApp.openById("YOUR_MONTHLY_INVENTORY_WORK_AREA_2_ID");

  let today = new Date();
  let month_number = today.getMonth();
  const month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month = month_names[month_number];

  var copied_summary_sheet = wa_2_summary_sheet.copyTo(wa_2_monthly_spreadsheet);
  copied_summary_sheet.setName("Work Area 2 Inventories " + month);

  wa_2_summary_sheet.clearContents();
  wa_2_summary_sheet.getRange("A:Z").setBackground("white").setBorder(false, false, false, false, false, false);

}