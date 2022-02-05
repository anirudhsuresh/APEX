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

  // current_info = read_current_project_info();

  var res = 0;
  data.forEach((a) => (res += parseInt(a[2])));

  var running_threshold = Math.ceil(res / 100);

  data = reduce_the_commits(data);

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

    var cur_month = document.getElementById("Month").value;
    // document.getElementById("current_node1").innerHTML = final_committer;
    document.getElementById("current_node1").innerHTML = d.key;
    var cur_person = d.key;

    var actual_name = cur_person
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, " ")
      .trim();

    var actual_title =
      "Commits made by" +
      " " +
      actual_name +
      " " +
      "during month" +
      " " +
      cur_month;

    document.getElementById("inside_title1").innerHTML = actual_title;
    call_table_commits(cur_person);
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
