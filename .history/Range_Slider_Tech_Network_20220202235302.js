// similar function to tech network but for the range slider

var color = d3.scaleOrdinal(d3.schemeCategory20c);
//UpdateTechnicalNet()

function Update_Tech_Range_Slider(input_data) {
  var svg = d3
    .select("#rightsvg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 700 400")
    //class to make it responsive
    .classed("svg-content-responsive", true);

  svg.selectAll("*").remove();

  var data = input_data;

  current_info = read_current_project_info();

  var res = 0;
  data.forEach((a) => (res += parseInt(a[2])));

  var running_threshold = Math.ceil(res / 100);

  data = reduce_the_commits(data, running_threshold);

  var bp = viz
    .bP()
    .data(data)
    .min(20)
    .pad(1)
    .height(250)
    .width(350)
    .barSize(20)
    // .edgeOpacity(0.6)
    // .edgeMode("straight") //makes it looks a little better
    .fill((d) => color(d.primary));

  var g = svg.append("g").attr("transform", "translate(195,45)");

  //  top x and y labels essentially

  g.append("text")
    // .attr("transform", "rotate(-90)")
    .attr("y", "-10")
    .attr("x", "-65")
    // .style("text-anchor", "middle")
    .attr("fill", "black")
    .style("font-size", "15px")
    .text("Sender Nodes");

  g.append("text")
    // .attr("transform", "rotate(90)")
    .attr("y", "-10")
    .attr("x", "320")
    .style("text-anchor", "right")
    .attr("fill", "black")
    .style("font-size", "15px")
    .text("Receiver Nodes");

  //  lines below the labels
  g.append("line").attr("x1", -74).attr("x2", 28);
  g.append("line").attr("x1", 320).attr("x2", 420);

  g.call(bp);

  // effect on the bars on hover , click etc
  g.selectAll(".mainBars")
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .on("click", clixked);

  //  the text on the bars and the percentages

  g.selectAll(".mainBars")
    .append("text")
    .attr("class", "label")
    .attr("x", (d) => (d.part == "primary" ? -32 : 32))
    .attr("y", (d) => +6)
    // .text(d=>d.part=="primary"? d.key: "." + d.key)
    .text((d) => (d.part == "primary" ? d.key : d.key))
    .attr("fill", "black")
    .attr("text-anchor", (d) => (d.part == "primary" ? "end" : "start"))
    .style("font-size", "14px");

  g.selectAll(".mainBars")
    .append("text")
    .attr("class", "perc")
    .attr("x", (d) => (d.part == "primary" ? 23 : -20))
    .attr("y", (d) => +6)
    .text(function (d) {
      return d3.format("0.0%")(d.percent);
    })
    .attr("text-anchor", (d) => (d.part == "primary" ? "end" : "start"))
    .attr("fill", "black")
    .style("font-size", "14px");
  // 23:-20))

  function clixked(d) {
    var nodeTextS;
    nodeTextS = d;
    const namesS = [];
    var f = d3.select(this);

    console.log(d.key);
    console.log(Object.keys(g));
    console.log(d3.select(this));

    // commit_node

    document.getElementById("current_node").innerHTML = d.key;
    // construct the dir:
    var this_project = document.getElementById("txt_ide").value;
    var cur_month = document.getElementById("Month").value;
    var cur_person = d.key;
    // console.log(this_project, cur_month, cur_person);
    var proj_name = this_project.split("[")[0].toLowerCase().trim();
    // work on the committer name
    // var actual_name = cur_person
    //   .toLowerCase()
    //   .replace(/[^a-zA-Z0-9]/g, " ")
    //   .trim();
    // // console.log(actual_name);
    // // dynamically updating the titles of the popovers
    var actual_name = d.key;
    var actual_title =
      "Emails sent by" +
      " " +
      actual_name +
      " " +
      "during month" +
      " " +
      cur_month;

    document.getElementById("inside_title").innerHTML = actual_title;
    call_table_commits(actual_name);
  }

  function mouseover(d) {
    d3.select(this).attr("font-weight", "bold");

    bp.mouseover(d);
    g.selectAll(".mainBars")
      .select(".perc")
      .text(function (d) {
        return d3.format("0.0%")(d.percent);
      });
  }

  function mouseout(d) {
    d3.select(this).attr("font-weight", null);
    bp.mouseout(d);
    g.selectAll(".mainBars")
      .select(".perc")
      .text(function (d) {
        return d3.format("0.0%")(d.percent);
      });
  }
}
