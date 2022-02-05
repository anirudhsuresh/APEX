function read_current_project_info() {
  var this_project = document.getElementById("txt_ide").value;
  var curr_month = document.getElementById("Month").value;
  var new_file_path = alias_to_name[this_project] + "_" + curr_month;
  var data = JSON.parse(
    readTextFile(
      // `updated_network_data/emails
      `./UPDATED_Data/new/new_emails/` + new_file_path + `.json`
    )
  );
  return data;
}
