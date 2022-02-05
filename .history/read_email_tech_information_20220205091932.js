function read_current_project_info() {
  var data = JSON.parse(
    readTextFile(
      // `updated_network_data/emails
      `./UPDATED_Data/new/new_emails/` + new_file_path + `.json`
    )
  );
  return data;
}
