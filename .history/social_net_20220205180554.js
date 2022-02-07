// function to create social network
// function to create social network

var color = d3.scaleOrdinal(d3.schemeCategory20c);

function UpdateEmailNet() {
  // select svg element
  var svg = d3
    .select("#middlesvg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 700 400")
    //class to make it responsive
    .classed("svg-content-responsive", true);

  svg.selectAll("*").remove();

  // var new_name = this_project.split("[")[0].toLowerCase().replace(/ /g, "");
  var this_project = document.getElementById("txt_ide").value;
  var curr_month = document.getElementById("Month").value;
  var new_file_path = alias_to_name[this_project] + "_" + curr_month;

  try {
    // read the data file
    var data = JSON.parse(
      readTextFile(
        // `updated_network_data/emails
        `./UPDATED_Data/new/new_emails/` + new_file_path + `.json`
      )
    );
  } catch {}
  // console.log(Object.keys(data).length);

  // read the current info to calculate the threshold
  // current_info = read_current_project_emails();

  // var running_threshold = Math.floor(current_info.num_emails / 100);

  // calculate the threshold and then reduce the data to ensure there are no zeros

  // console.log("social th", running_threshold, current_info.num_emails);
  data = reduce_the_emails(data);

  // bi partible graph
  var bp = viz
    .bP()
    .data(data)
    .min(20)
    .pad(1)
    .height(250)
    .width(350)
    .barSize(20)
    .edgeOpacity(0.6)
    // .edgeMode("straight") //makes it looks a little better
    .fill((d) => color(d.primary));

  var g = svg.append("g").attr("transform", "translate(195,45)");

  //  top x and y labels essentially

  g.append("text")
    // .attr("transform", "rotate(-90)")
    .attr("y", "-10")
    .attr("x", "-65")
    // .style("text-anchor", "middle")
    // .attr("fill", "black")
    .attr("class", "d3_colors")
    .style("font-size", "15px")
    .text("Sender Nodes");

  g.append("text")
    // .attr("transform", "rotate(90)")
    .attr("y", "-10")
    .attr("x", "320")
    .style("text-anchor", "right")
    // .attr("fill", "black")
    .attr("class", "d3_colors")
    .style("font-size", "15px")
    .text("Receiver Nodes");

  //  lines below the labels
  g.append("line").attr("x1", -74).attr("x2", 28);
  g.append("line").attr("x1", 320).attr("x2", 420);

  g.call(bp);

  // effect on the bars on hover , click etc
  g.selectAll(".mainBars")
    .on("mouseover", mouseover) // on mouse over
    .on("mouseout", mouseout) // on moving out
    .on("click", clixked); // on clicking on developers

  //  the text on the bars and the percentages
  // text elements
  g.selectAll(".mainBars")
    .append("text")
    .attr("class", "label1")
    .attr("x", (d) => (d.part == "primary" ? -32 : 32))
    .attr("y", (d) => +6)
    // .text(d=>d.part=="primary"? d.key: "." + d.key)
    .text((d) => (d.part == "primary" ? d.key : d.key))
    // .attr("fill", "black")
    // .attr("class", "d3_colors")
    .attr("text-anchor", (d) => (d.part == "primary" ? "end" : "start"))
    .style("font-size", "14px");

  // percentages
  g.selectAll(".mainBars")
    .append("text")
    .attr("class", "perc")
    .attr("x", (d) => (d.part == "primary" ? 44 : -44))
    .attr("y", (d) => +7)
    .text(function (d) {
      return d3.format("0.0%")(d.percent);
    })
    .attr("text-anchor", (d) => (d.part == "primary" ? "end" : "start"))
    // .attr("fill", "black")
    // .attr("class", "d3_colors")
    .style("font-size", "14px")
    .attr("font-weight", "bold");
  // 23:-20))

  // on clicking function
  function clixked(d) {
    var nodeTextS;
    nodeTextS = d;
    const namesS = [];
    var f = d3.select(this);

    console.log(d.key);

    // get the current developer
    document.getElementById("current_node").innerHTML = d.key;

    // construct the directory to find the devs file
    var cur_month = document.getElementById("Month").value;
    var cur_person = d.key;
    // work on the emails name
    var actual_name = cur_person
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, " ")
      .trim();

    // dynamically updating the titles of the popovers
    var actual_title =
      "Emails sent by" +
      " " +
      actual_name +
      " " +
      "during month" +
      " " +
      cur_month;

    // set the title of the email popover link
    document.getElementById("inside_title").innerHTML = actual_title;
    // call the function to read the current developers email links
    call_table_emails(actual_name);
  }

  function mouseover(d) {
    d3.select(this).attr("font-weight", "bold"); // make the current dev bold
    d3.select(this).select("text").style("font-size", "17px");
    bp.mouseover(d);
    g.selectAll(".mainBars")
      .select(".perc")
      .text(function (d) {
        return d3.format("0.0%")(d.percent);
      });
  }

  function mouseout(d) {
    d3.select(this).attr("font-weight", null);
    d3.select(this).select("text").style("font-size", "14px");
    bp.mouseout(d);
    g.selectAll(".mainBars")
      .select(".perc")
      .text(function (d) {
        return d3.format("0.0%")(d.percent);
      });
  }
}

// .attr("class", "d3_colors")
// d3.select(this).select("text").style("fill", "tomato");
// d3.select(this).select("text").style("font-size", "17px");
