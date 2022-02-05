// reset function to ensure that when new project is selected the month and the month slider resets to zero
function resetAll() {
  // console.log("its working");
  document.getElementById("MaxIncubation").value = "1";
  document.getElementById("Month").value = "1";
  updateAll();
}
// function updates all during normal month change ie not the range month change
function updateAll() {
  getMonth();
  make_reports();
  // var this_project = document.getElementById("txt_ide").value;
  $("#chk").prop("checked", false);
  $("#make_range_slider").prop("checked", false);
  $("#hideableDiv").hide();
  $("#hideableDiv2").show();
  UpdateprojectInfo();
  UpdateEmailNet();
  UpdateTechnicalNet();
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
  UpdateMaxIncubation();
}
