$(document).ready(function () {
  $("#tglr").popover({
    html: true,
    placement: "top",
    content: function () {
      return $("#popover-content").html();
    },
  });
});

function call_table_emails(actual_name) {
  var this_project = document.getElementById("txt_ide").value; // we need current project
  var proj_name = this_project.split("[")[0].toLowerCase().trim();
  var curr_month = document.getElementById("Month").value;
  console.log(actual_name);
  var create_link =
    "UPDATED_Data/Takeout/Drive/new_deep_dive_email_data/tester_monthly_emails/" +
    alias_to_name[this_project] +
    "/" +
    curr_month +
    "/" +
    actual_name +
    ".csv";
  console.log("link for the email deep dive", create_link);
  //old
  // "UPDATED_Data/new_monthly_data/emails/" +
  //   proj_name +
  //   "/" +
  //   actual_name +
  //   "_" +
  //   // curr_month +
  //   // ".csv";

  //---
  var column_names = ["URL", "Date Time"];
  // var column_names = ["Title","Views","Time","URL","Next boy"];0
  var clicks = { title: 0, views: 0, created_on: 0, url: 0 };
  // d3v3.selectAll("*").remove();
  // draw the table
  d3v3.select(".popman2").selectAll("*").remove();
  d3v3.select(".popman2").append("div").attr("id", "c2");

  d3v3.select("#c2").append("div").attr("id", "FilterableTable2");
  make_it(create_link, column_names);
}
function make_it(create_link, column_names) {
  var table = d3v3.select("#FilterableTable2").append("table");
  table.append("thead").append("tr");

  var headers = table
    .select("tr")
    .selectAll("th")
    .data(column_names)
    .enter()
    .append("th")
    .text(function (d) {
      return d;
    });

  var rows, row_entries, row_entries_no_anchor, row_entries_with_anchor;
  // d3v3.json("data.json", function(data) { // loading data from server

  // d3v3.json("wt.json", function(data) { // loading data from server
  d3v3.csv(`${create_link}`, function (error, data) {
    console.log(data);
    if (typeof data == "undefined") {
      // console.log("Yes its working ?");
      data = [
        {
          url: "not found",
          human_date_time: "not found",
          sender_names_alias: "not found",
        },
      ];
      setTimeout(function () {
        $(document).ready(function () {
          $("#tglr").popover("hide");
        });
      }, 2200);
    }
    // draw table body with rows
    table.append("tbody");

    // data bind
    rows = table.select("tbody").selectAll("tr").data(data);
    // console.log(rows)
    // enter the rows
    rows.enter().append("tr");

    // enter td's in each row
    row_entries = rows
      .selectAll("td")
      .data(function (d) {
        var arr = [];
        for (var k in d) {
          if (d.hasOwnProperty(k)) {
            arr.push(d[k]);
          }
        }
        return [arr[1], arr[0]];
      })
      .enter()
      .append("td");

    // draw row entries with no anchor
    row_entries_no_anchor = row_entries.filter(function (d) {
      return /https?:\/\//.test(d) == false;
    });
    row_entries_no_anchor.text(function (d) {
      return d;
    });

    // draw row entries with anchor
    row_entries_with_anchor = row_entries.filter(function (d) {
      return /https?:\/\//.test(d) == true;
    });
    row_entries_with_anchor
      .append("a")
      .attr("href", function (d) {
        return d;
      })
      .attr("target", "_blank")
      .attr("id", "1")
      .attr(
        "onclick",
        "window.open(this.href, 'newwindow','width=500,height=450');return false;"
      )
      // .attr("return", "false;")
      // .attr("target", "_blank")
      // .text(function(d) { return d; })
      .text("Link");
  });
}
