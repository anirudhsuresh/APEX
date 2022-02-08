// reset function to ensure that when new project is selected the month and the month slider resets to zero
function resetAll() {
  console.log("its working");
  document.getElementById("num_emails").innerHTML = 0;

  document.getElementById("num_senders").innerHTML = 0;
  document.getElementById("email_per_dev").innerHTML = 0;

  document.getElementById("num_commits").innerHTML = 0;
  document.getElementById("num_committers").innerHTML = 0;
  document.getElementById("commit_per_dev").innerHTML = 0;

  document.getElementById("MaxIncubation").value = "1";
  document.getElementById("Month").value = "1";
  updateAll();
}
// function updates all during normal month change ie not the range month change
function updateAll() {
  // console.log("i am here ");
  // var month = document.getElementById("MaxIncubation").value;
  // document.getElementById("Month").innerHTML = month;
  // console.log(month);
  getMonth();
  make_reports();

  // var this_project = document.getElementById("txt_ide").value;

  UpdateprojectInfo();
  UpdateEmailNet();
  UpdateTechnicalNet();

  $("#chk").prop("checked", false);
  $("#make_range_slider").prop("checked", false);
  $("#hideableDiv").hide();
  $("#hideableDiv2").show();
}

function updateAll_for_range_slider() {
  var this_project = document.getElementById("txt_ide").value;
  var current_date_range = html5Slider.noUiSlider.get();

  var array_date_range = range(
    parseInt(current_date_range[0]),
    parseInt(current_date_range[1])
  );
  var th = create_for(array_date_range);
  var th1 = create_for_commits(array_date_range);
  aggregate__network_stats();
  cal_slider_end_length();
}

function cal_slider_end_length() {
  var this_project = document.getElementById("txt_ide").value;
  // read data
  var new_paths =
    "UPDATED_Data/new/new_forecast/" +
    alias_to_name[this_project] +
    "_" +
    "f_data.csv";
  d3.csv(new_paths, function (error, data) {
    if (error) throw error;

    // format the data
    data.forEach(function (d) {
      d.date = +d.date;
      d.close = +d.close;
    });
    // set the incubation length
    document.getElementById("MaxIncubation").max = data.length;
    console.log(data.length);
    updateSliderRange(1, data.length);
  });
}
