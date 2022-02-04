var flag = 0;

function readTextFile1(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false); // using synchronous call
  var allText;
  rawFile.onload = function () {
    if (rawFile.status != 404) {
      // analyze HTTP status of the response
      allText = rawFile.responseText; // e.g. 404: Not Found
      flag = 0;
    } else {
      // show the result
      allText = "No report avaliable for this month";
      flag = 1;
    }
  };

  rawFile.send(null);
  return allText;
}

function getMonth() {
  var this_month = document.getElementById("Month").value;
  // var name_to_id = readTextFile("name_to_ids.json");
  return this_month;
}

function make_reports {
  var name_to_id = JSON.parse(readTextFile("name_to_ids.json"));
  var this_project = document.getElementById("txt_ide").value;
  var alias_to_name = JSON.parse(readTextFile("new_name_to_alias.json"));
  var proj = alias_to_name[this_project];
  // console.log("here", proj);
  var proj_id = name_to_id[proj];
  // console.log("next", proj_id);
  var month = getMonth();

  var m = month + ".txt";

  var link = "data1/" + proj_id + "/" + m;
  var paths = `${link}`;
  // console.log("final", paths);
  var read = readTextFile1(paths);
  document.getElementById("textss").value = read;
  // console.log(read);
  add_links(proj_id);
  add_current_month(proj_id);
}

function add_current_month(proj_id) {
  var month = document.getElementById("Month").value;
  // var start_date = JSON.parse(readTextFile("start_date_dict.json"));

  var start_date = readTextFile1("start_date.json");
  var name_proj = document.getElementById("txt_ide").value;
  var c_month = JSON.parse(readTextFile1("month_names_dict.json"));
  var p_idss = proj_id;

  var ac_date = start_date[p_idss];
  // console.log("after line 66", ac_date, start_date);
  document.getElementById("reports_month").innerHTML = comb_date;

  if (month > 12) {
    var re_years = parseInt(month / 12);
    var re_months = parseInt(month % 12);
  } else {
    var re_years = 0;
    var re_months = month;
  }

  var res = ac_date.split("/");

  // will add all the dates and make the actaul year and month
  var f_year = +re_years + +res[2];
  var f_month = +re_months + +res[0];
  if (f_month > 12) {
    var fi_year = parseInt(f_month / 12);
    var fi_month = parseInt(f_month % 12);
  } else {
    var fi_year = 0;
    var fi_month = f_month;
  }

  var month_inti = fi_month;
  var month_words = c_month[month_inti];
  var ac_proj = name_proj;
  var project_name = ac_proj.split("[");
  var finals_year = +fi_year + +f_year;

  var comb_date = month_words + " " + finals_year;
}

function add_links(proj_id) {
  if (flag == 0) {
    var month = document.getElementById("Month").value;
    var start_date = JSON.parse(readTextFile("start_date_dict.json"));
    var name_proj = document.getElementById("txt_ide").value;
    var c_month = JSON.parse(readTextFile("month_names_dict.json"));
    var p_idss = proj_id;

    var ac_date = start_date[p_idss];

    // document.getElementById("reports_month").innerHTML = comb_date;

    if (month > 12) {
      var re_years = parseInt(month / 12);
      var re_months = parseInt(month % 12);
    } else {
      var re_years = 0;
      var re_months = month;
    }

    var res = ac_date.split("/");

    // will add all the dates and make the actaul year and month
    var f_year = +re_years + +res[2];
    var f_month = +re_months + +res[0];

    if (f_month > 12) {
      var fi_year = parseInt(f_month / 12);
      var fi_month = parseInt(f_month % 12);
    } else {
      var fi_year = 0;
      var fi_month = f_month;
    }

    var month_inti = fi_month;
    var month_words = c_month[month_inti];
    var ac_proj = name_proj;
    var project_name = ac_proj.split("[");
    var finals_year = +fi_year + +f_year;

    var comb_date = month_words + " " + finals_year;
    document.getElementById("reports_month").innerHTML = comb_date;
    // console.log(comb_date);

    var ac_proj = name_proj;
    var project_name = ac_proj.split("[");
    if (finals_year == 2005) {
      var final_link =
        "https://cwiki.apache.org/confluence/display/INCUBATOR/IncubatorBoardReport2005Q4";
    } else if (finals_year == 2006) {
      if (month_words == "January") {
        var final_link =
          "https://cwiki.apache.org/confluence/display/INCUBATOR/IncubatorBoardReport2006Q1";
      } else if (month_words == "February") {
        var final_link =
          "https://cwiki.apache.org/confluence/display/INCUBATOR/IncubatorBoardReport2006Q1";
      } else {
        var final_link =
          "https://cwiki.apache.org/confluence/display/INCUBATOR/" +
          month_words +
          finals_year +
          "#" +
          project_name[0];
      }
    } else {
      var final_link =
        "https://cwiki.apache.org/confluence/display/INCUBATOR/" +
        month_words +
        finals_year +
        "#" +
        project_name[0];
    }

    document.getElementById("repo_link").innerHTML =
      '<a href="' + final_link + '" target="_blank"> Link </a>';
  } else {
    document.getElementById("repo_link").innerHTML = "No link for this month";
  }
}

// duplicate yes functions for parallel window

function yes1(cu_month) {
  // var proj = myFunction();

  var name_to_id = JSON.parse(readTextFile("name_to_ids.json"));
  var this_project = document.getElementById("txt_ide").value;
  var alias_to_name = JSON.parse(readTextFile("new_name_to_alias.json"));
  var proj = alias_to_name[this_project];

  var proj_id = name_to_id[proj];

  var month = cu_month;

  var m = month + ".txt";

  var link = "data1/" + proj_id + "/" + m;
  var paths = `${link}`;

  var read = readTextFile1(paths);
  document.getElementById("textss").value = read;
  add_links1(proj_id);
  add_current_month1(proj_id);
}

function add_current_month1(proj_id) {
  var month = document.getElementById("Month").value;
  var start_date = JSON.parse(readTextFile("start_date_dict.json"));
  var name_proj = document.getElementById("txt_ide").value;
  var c_month = JSON.parse(readTextFile("month_names_dict.json"));
  // var p_idss = name_to_id[name_proj];
  var p_idss = proj_id;
  var ac_date = start_date[p_idss];

  // document.getElementById("reports_month").innerHTML = comb_date;

  if (month > 12) {
    var re_years = parseInt(month / 12);
    var re_months = parseInt(month % 12);
  } else {
    var re_years = 0;
    var re_months = month;
  }

  var res = ac_date.split("/");

  // will add all the dates and make the actaul year and month
  var f_year = +re_years + +res[2];
  var f_month = +re_months + +res[0];
  //

  console.log(f_year, f_month);
  //
  if (f_month > 12) {
    var fi_year = parseInt(f_month / 12);
    var fi_month = parseInt(f_month % 12);
  } else {
    var fi_year = 0;
    var fi_month = f_month;
  }

  var month_inti = fi_month;
  var month_words = c_month[month_inti];
  var ac_proj = name_proj;
  var project_name = ac_proj.split("[");
  var finals_year = +fi_year + +f_year;

  var comb_date = month_words + " " + finals_year;

  // document.getElementById("reports_month").innerHTML = comb_date - 1;
}

function add_links1(proj_id) {
  if (flag == 0) {
    var month = document.getElementById("Month").value;
    var start_date = JSON.parse(readTextFile("start_date_dict.json"));
    var name_proj = document.getElementById("txt_ide").value;
    var c_month = JSON.parse(readTextFile("month_names_dict.json"));
    var p_idss = proj_id;

    var ac_date = start_date[p_idss];

    document.getElementById("reports_month").innerHTML = comb_date;

    if (month > 12) {
      var re_years = parseInt(month / 12);
      var re_months = parseInt(month % 12);
    } else {
      var re_years = 0;
      var re_months = month;
    }

    var res = ac_date.split("/");

    // will add all the dates and make the actaul year and month
    var f_year = +re_years + +res[2];
    var f_month = +re_months + +res[0];
    //

    console.log(f_year, f_month);
    //
    if (f_month > 12) {
      var fi_year = parseInt(f_month / 12);
      var fi_month = parseInt(f_month % 12);
    } else {
      var fi_year = 0;
      var fi_month = f_month;
    }

    var month_inti = fi_month;
    var month_words = c_month[month_inti];
    var ac_proj = name_proj;
    var project_name = ac_proj.split("[");
    var finals_year = +fi_year + +f_year;

    var comb_date = month_words + " " + finals_year;
    // document.getElementById("reports_month").innerHTML = comb_date;

    var ac_proj = name_proj;
    var project_name = ac_proj.split("[");
    if (finals_year == 2005) {
      var final_link =
        "https://cwiki.apache.org/confluence/display/INCUBATOR/IncubatorBoardReport2005Q4";
    } else if (finals_year == 2006) {
      if (month_words == "January") {
        var final_link =
          "https://cwiki.apache.org/confluence/display/INCUBATOR/IncubatorBoardReport2006Q1";
      } else if (month_words == "February") {
        var final_link =
          "https://cwiki.apache.org/confluence/display/INCUBATOR/IncubatorBoardReport2006Q1";
      } else {
        var final_link =
          "https://cwiki.apache.org/confluence/display/INCUBATOR/" +
          month_words +
          finals_year +
          "#" +
          project_name[0];
      }
    } else {
      var final_link =
        "https://cwiki.apache.org/confluence/display/INCUBATOR/" +
        month_words +
        finals_year +
        "#" +
        project_name[0];
    }

    document.getElementById("repo_link").innerHTML =
      '<a href="' + final_link + '" target="_blank"> Link </a>';
  } else {
    document.getElementById("repo_link").innerHTML = "No link for this month";
  }
}
