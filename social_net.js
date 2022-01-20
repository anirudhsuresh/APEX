var colors = d3.scaleOrdinal(d3.schemeCategory20);

var svg = d3.select("#middlesvg");
(width = +svg.attr("width")), (height = +svg.attr("height"));

var node;
var link;

var simulation = d3
  .forceSimulation()
  .force(
    "link",
    d3
      .forceLink()
      .id(function (d) {
        return d.id;
      })
      .distance(150)
      .strength(1)
  )
  .force("charge", d3.forceManyBody())
  .force("center", d3.forceCenter(width / 2, height / 2));

UpdateEmailNet();

function UpdateEmailNet() {
  var svg = d3.select("#middlesvg");

  svg.selectAll("*").remove();

  svg
    .append("defs")
    .append("marker")
    .attrs({
      id: "arrowhead",
      viewBox: "-0 -5 10 10",
      refX: 13,
      refY: 0,
      orient: "auto",
      markerWidth: 13,
      markerHeight: 13,
      xoverflow: "visible",
    })
    .append("svg:path")
    .attr("d", "M 0,-5 L 10 ,0 L 0,5")
    .attr("fill", "#999");

  d3.json(
    `network_data/p${forceProperties.selected_data.project}m${forceProperties.selected_data.month}_email.json`,
    function (error, graph) {
      if (error) {
        svg.selectAll("*").remove();
      } else {
        update(graph.links, graph.nodes);
      }
    }
  );
}

function update(links, nodes) {
  link = svg
    .selectAll(".link")
    .data(links)
    .enter()
    .append("line")
    .attr("class", "link")
    .attr("marker-end", "url(#arrowhead)");

  //link.append("title")
  //    .text(function (d) {return d.type;});

  edgepaths = svg
    .selectAll(".edgepath")
    .data(links)
    .enter()
    .append("path")
    .attrs({
      class: "edgepath",
      "fill-opacity": 0,
      "stroke-opacity": 0,
      id: function (d, i) {
        return "edgepath" + i;
      },
    })
    .style("pointer-events", "none");

  edgelabels = svg
    .selectAll(".edgelabel")
    .data(links)
    .enter()
    .append("text")
    .style("pointer-events", "none")
    .attrs({
      class: "edgelabel",
      id: function (d, i) {
        return "edgelabel" + i;
      },
      "font-size": 10,
      fill: "#aaa",
    });

  edgelabels
    .append("textPath")
    .attr("xlink:href", function (d, i) {
      return "#edgepath" + i;
    })
    .style("text-anchor", "middle")
    .style("pointer-events", "none")
    .attr("startOffset", "50%")
    .text(function (d) {
      return d.value;
    });

  node = svg
    .selectAll(".node")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .call(
      d3.drag().on("start", dragstarted).on("drag", dragged)
      //.on("end", dragended)
    );

  node
    .append("circle")
    .attr("r", 5)
    .style("fill", function (d, i) {
      return colors(i);
    });

  node.append("title").text(function (d) {
    return d.id;
  });

  node
    .append("text")
    .attr("dy", -3)
    .text(function (d) {
      return d.id;
    });

  simulation.nodes(nodes).on("tick", ticked);

  simulation.force("link").links(links);

  simulation.alpha(1).restart();
}

function ticked() {
  link
    .attr("x1", function (d) {
      return d.source.x;
    })
    .attr("y1", function (d) {
      return d.source.y;
    })
    .attr("x2", function (d) {
      return d.target.x;
    })
    .attr("y2", function (d) {
      return d.target.y;
    });

  node.attr("transform", function (d) {
    return "translate(" + d.x + ", " + d.y + ")";
  });

  edgepaths.attr("d", function (d) {
    return (
      "M " +
      d.source.x +
      " " +
      d.source.y +
      " L " +
      d.target.x +
      " " +
      d.target.y
    );
  });

  edgelabels.attr("transform", function (d) {
    if (d.target.x < d.source.x) {
      var bbox = this.getBBox();

      rx = bbox.x + bbox.width / 2;
      ry = bbox.y + bbox.height / 2;
      return "rotate(180 " + rx + " " + ry + ")";
    } else {
      return "rotate(0)";
    }
  });
}

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

//    function dragended(d) {
//        if (!d3.event.active) simulation.alphaTarget(0);
//        d.fx = undefined;
//        d.fy = undefined;
//    }
