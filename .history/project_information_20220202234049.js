// here we read the projects information and then update the various HTML elements
// first we read the email info
// next the commit info
// project information
// this provides commit stats , email stats and project information details

function UpdateprojectInfo() {
  var this_project = document.getElementById("txt_ide").value;
  var curr_month = document.getElementById("Month").value;
  console.log(curr_month);
  var new_file_path = alias_to_name[this_project] + "_" + curr_month;
  try {
    email_info = JSON.parse(
      readTextFile(`./UPDATED_Data/new/email_measures/${new_file_path}.json`)
    );
  } catch {}
  try {
    commit_info = JSON.parse(
      readTextFile(`./UPDATED_Data/new/commits_measure/${new_file_path}.json`)
    );
  } catch (err) {
    commit_info = {};
    commit_info.num_commits = 0;
    commit_info.num_committers = 0;
    commit_info.commit_per_dev = 0;
  }
  project_info = JSON.parse(
    readTextFile(
      `./UPDATED_Data/new/new_about_data/${alias_to_name[this_project]}.json`
    )
  );

  to_from_info = JSON.parse(
    readTextFile(
      `./UPDATED_Data/new/new_month_intervals/${alias_to_name[this_project]}.json`
    )
  );

  var to_dates = to_from_info[curr_month];
  Actual_change(email_info, commit_info, project_info, to_dates);
}
//  function to read email info for other parts of the code like the social net
function read_current_project_info() {
  var this_project = document.getElementById("txt_ide").value;
  var curr_month = document.getElementById("Month").value;
  var new_file_path = alias_to_name[this_project] + "_" + curr_month;

  email_info = JSON.parse(
    readTextFile(`./UPDATED_Data/new/email_measures/${new_file_path}.json`)
  );

  return email_info;
}

// function to read commit info for other parts of the code like the tech net
function read_current_project_info1() {
  var this_project = document.getElementById("txt_ide").value;
  var curr_month = document.getElementById("Month").value;
  var new_file_path = alias_to_name[this_project] + "_" + curr_month;

  commit_info = JSON.parse(
    readTextFile(`./UPDATED_Data/new/commits_measure/${new_file_path}.json`)
  );

  return commit_info;
}

function Actual_change(email_info, commit_info, project_info, to_dates) {
  document.getElementById("link").innerHTML =
    '<a href="' +
    `https://incubator.apache.org/projects/${project_info.project_name.toLowerCase()}.html` +
    '" target="_blank" > ' +
    project_info.project_name +
    "</a>";
  document.getElementById("status").innerHTML = project_info.status;
  document.getElementById("sponsor").innerHTML = project_info.sponsor;
  document.getElementById("start1").innerHTML = project_info.start_date;
  document.getElementById("end1").innerHTML = project_info.end_date;
  document.getElementById("intro").innerHTML = project_info.description;

  document.getElementById("num_emails").innerHTML = Math.floor(
    email_info.num_emails
  );

  document.getElementById("num_senders").innerHTML = Math.floor(
    email_info.num_senders.toFixed(2)
  );
  document.getElementById("email_per_dev").innerHTML = Math.floor(
    email_info.email_per_dev
  );
  document.getElementById("reports_month").innerHTML =
    project_info.start_date + "~" + project_info.end_date;

  document.getElementById("num_commits").innerHTML = Math.floor(
    commit_info.num_commits
  );
  document.getElementById("num_committers").innerHTML = Math.floor(
    commit_info.num_committers
  );
  document.getElementById("commit_per_dev").innerHTML = Math.floor(
    commit_info.commit_per_dev
  );
  document.getElementById("mentor").innerHTML = project_info.mentor;
  console.log(to_dates[0], to_dates[1]);

  document.getElementById("from").innerHTML = to_dates[0];
  document.getElementById("to").innerHTML = to_dates[1];
  document.getElementById("reports_month").innerHTML =
    to_dates[0] + "~" + to_dates[1];

  document.getElementById("pro_title").innerHTML = project_info.project_name;
  document.getElementById("pro_title1").innerHTML = project_info.project_name;
  document.getElementById("pro_title2").innerHTML = project_info.project_name;
  //
  document.getElementById("month_period_start").innerHTML =
    project_info.start_date;
  document.getElementById("month_period_end").innerHTML = project_info.end_date;
}

function email_aggregate(email_info) {
  document.getElementById("num_emails").innerHTML = Math.floor(
    email_info.num_emails
  );

  document.getElementById("num_senders").innerHTML = Math.floor(
    email_info.num_senders.toFixed(2)
  );
  document.getElementById("email_per_dev").innerHTML = Math.floor(
    email_info.email_per_dev
  );
}

function commit_aggregate(commit_info) {
  document.getElementById("num_commits").innerHTML = Math.floor(
    commit_info.num_commits
  );
  document.getElementById("num_committers").innerHTML = Math.floor(
    commit_info.num_committers
  );
  document.getElementById("commit_per_dev").innerHTML = Math.floor(
    commit_info.commit_per_dev
  );
}

$("#chk").prop("checked", false);
function UpdateMaxIncubation() {
  var slider = document.getElementById("MaxIncubation");

  slider.max = project_info.incubation_time;
  slider.min = 1;
  slider.value = slider.min;

  document.getElementById("Month").innerHTML =
    '<output id="Month">' + slider.min + "</output>";

  var max_time = parseInt(project_info.incubation_time);

  updateSliderRange(1, max_time);
}
function update_month_id(the_current_month) {
  document.getElementById("Month").innerHTML = the_current_month;
}
