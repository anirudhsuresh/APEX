function UpdateTechnicalNet() {
  var margin = { top: 1.25, right: 1.25, bottom: 1.25, left: 1.25 };
  var width = 1.25 - margin.left - margin.right;
  var height = 1.25 - margin.top - margin.bottom;
  var svg = d3
    .select("#rightsvg")
    .attr("width", "100%")
    .attr("height", "90%")
    .attr("viewBox", "0 0 700 400")
    //class to make it responsive
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);

  svg.selectAll("*").remove();
  var this_project = document.getElementById("txt_ide").value;
  var new_name = this_project.split("[")[0].toLowerCase().replace(/ /g, "");
  var curr_month = document.getElementById("Month").value;
  var new_file_path = alias_to_name[this_project] + "_" + curr_month;

  try {
    d3.json(
      `./UPDATED_Data/new/grouped_new_commits/` + new_file_path + `.json`,
      function (error, d) {
        if (error) {
          svg = d3.select("#rightsvg");
          svg.selectAll("*").remove();
          throw error;
        } else {
          data = d;

          var res = 0;

          current_info = read_current_project_info1();

          var running_threshold = Math.floor(res / 100);
          var data = reduce_the_commits(data, running_threshold);

          var g = svg.append("g").attr("transform", "translate(185,45)");

          var bp = viz
            .bP()
            .data(data)
            .min(20)
            .pad(1)
            .height(250)
            .width(350)
            .barSize(20)
            .fill((d) => color(d.primary));

          g.append("text")

            .attr("y", "-10")
            .attr("x", "-65")

            .attr("fill", "black")
            .style("font-size", "15px")
            .text("Committer");

          g.append("text")

            .attr("y", "-10")
            .attr("x", "320")
            .style("text-anchor", "right")
            .attr("fill", "black")
            .style("font-size", "15px")
            .text("File Type");

          g.append("line")
            .attr("x1", -74)
            .attr("x2", 28)
            .attr("y1", -3)
            .attr("y2", -3);
          g.append("line")
            .attr("x1", 320)
            .attr("x2", 420)
            .attr("y1", -3)
            .attr("y2", -3);

          g.call(bp);

          g.selectAll(".mainBars")
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
            .on("click", clixked);

          g.selectAll(".mainBars")
            .append("text")
            .attr("class", "label")
            .attr("x", (d) => (d.part == "primary" ? -32 : 32))
            .attr("y", (d) => +6)
            .text((d) => (d.part == "primary" ? d.key : "." + d.key))
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

          // console.log(data[0][0])
          function clixked(d) {
            var nodeTextS;
            nodeTextS = d;
            const namesS = [];
            var f = d3.select(this);

            var commiter_name = f.text();
            // console.log(f.text().split("*")[0]);
            var final_committer = f.text().split("*")[0];
            // console.log(d.key);
            var cur_month = document.getElementById("Month").value;
            // document.getElementById("current_node1").innerHTML = final_committer;
            document.getElementById("current_node1").innerHTML = d.key;
            var cur_person = d.key;
            // console.log(this_project, cur_month, cur_person);
            // work on the committer name
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
            // d3.select(this).style("fill", "red");
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
      }
    );
  } catch {}
}
