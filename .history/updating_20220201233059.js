function updateAll() {
  var this_project = document.getElementById("txt_ide").value;

  $("#chk").prop("checked", false);
  $("#make_range_slider").prop("checked", false);
  $("#hideableDiv").hide();
  $("#hideableDiv2").show();
  console.log("this is here when we change");
  UpdateprojectInfo();
  UpdateEmailNet();

  UpdateTechnicalNet();

  // make_chart();
}

function updateAll_for_range_slider() {
  var this_project = document.getElementById("txt_ide").value;
  // forceProperties.selected_data.project = name_to_id[this_project];
  // console.log(projectInfo.incubation_time);
  // console.log(typeof projectInfo.incubation_time);

  var current_date_range = html5Slider.noUiSlider.get();
  // console.log(current_date_range);
  var array_date_range = range(
    parseInt(current_date_range[0]),
    parseInt(current_date_range[1])
  );
  var th = create_for(array_date_range);
  var th1 = create_for_commits(array_date_range);

  // on_start();
  agg_slider();
}
