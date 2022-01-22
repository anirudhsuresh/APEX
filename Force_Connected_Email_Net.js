var diameter = 1000,
  radius = diameter / 4,
  innerRadius = radius - 120;

var cluster = d3.cluster().size([360, innerRadius]);

var line = d3
  .radialLine()
  .curve(d3.curveBundle.beta(0.95))
  .radius(function (d) {
    return d.y;
  })
  .angle(function (d) {
    return (d.x / 180) * Math.PI;
  });

var xposition = 1.3,
  yposition = 0.9;

//var svg = d3.select("#middlesvg");
//var node;
//var link;

var svg = d3
  .select("#middlesvg")
  .append("svg")
  .attr("width", diameter)
  .attr("height", diameter)
  .append("g")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 700 400")
  //class to make it responsive
  .classed("svg-content-responsive", true)
  .attr(
    "transform",
    "translate(" + xposition * radius + "," + yposition * radius + ")"
  );

var node = svg.append("g").selectAll(".node");
var link = svg.append("g").selectAll(".link");

function build_force_network(classes) {
  var roots = packageHierarchy(classes).sum(function (d) {
    return d.size;
  });

  cluster(roots);

  link = link
    .data(packageImports(roots.leaves()))
    .enter()
    .append("path")
    .each(function (d) {
      (d.source = d[0]), (d.target = d[d.length - 1]);
    })
    .attr("class", "link")
    .attr("d", line);

  node = node
    .data(roots.leaves())
    .enter()
    .append("text")
    .attr("class", "node")
    .attr("dy", "0.31em")
    .attr("transform", function (d) {
      return (
        "rotate(" +
        (d.x - 90) +
        ")translate(" +
        (d.y + 8) +
        ",0)" +
        (d.x < 180 ? "" : "rotate(180)")
      );
    })
    .attr("text-anchor", function (d) {
      return d.x < 180 ? "start" : "end";
    })
    .text(function (d) {
      return d.data.key;
    })
    .on("mouseover", mouseovered)
    .on("mouseout", mouseouted);
}
// );

svg = d3.select("#middlesvg");

svg.selectAll("*").remove();

//UpdateEmailNet()

function R_UpdateEmailNet(classes) {
  svg = d3.select("#middlesvg");

  svg.selectAll("*").remove();

  svg = d3
    .select("#middlesvg")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .append("g")
    .attr(
      "transform",
      "translate(" + xposition * radius + "," + yposition * radius + ")"
    );

  node = svg.append("g").selectAll(".node");
  link = svg.append("g").selectAll(".link");

  roots = packageHierarchy(classes).sum(function (d) {
    return d.size;
  });

  cluster(roots);

  link = link
    .data(packageImports(roots.leaves()))
    .enter()
    .append("path")
    .each(function (d) {
      (d.source = d[0]), (d.target = d[d.length - 1]);
    })
    .attr("class", "link")
    .attr("d", line);

  node = node
    .data(roots.leaves())
    .enter()
    .append("text")
    .attr("class", "node")
    .attr("dy", "0.31em")
    .attr("transform", function (d) {
      return (
        "rotate(" +
        (d.x - 90) +
        ")translate(" +
        (d.y + 8) +
        ",0)" +
        (d.x < 180 ? "" : "rotate(180)")
      );
    })
    .attr("text-anchor", function (d) {
      return d.x < 180 ? "start" : "end";
    })
    .text(function (d) {
      return d.data.key;
    })
    .on("mouseover", mouseovered)
    .on("mouseout", mouseouted);
  //   }
  // );

  //simulation.alpha(0.8).restart();
}

function mouseovered(d) {
  node.each(function (n) {
    n.target = n.source = false;
  });

  link
    .classed("link--target", function (l) {
      if (l.target === d) return (l.source.source = true);
    })
    .classed("link--source", function (l) {
      if (l.source === d) return (l.target.target = true);
    })
    .filter(function (l) {
      return l.target === d || l.source === d;
    })
    .raise();

  node
    .classed("node--target", function (n) {
      return n.target;
    })
    .classed("node--source", function (n) {
      return n.source;
    });
}

function mouseouted(d) {
  link.classed("link--target", false).classed("link--source", false);

  node.classed("node--target", false).classed("node--source", false);
}

// Lazily construct the package hierarchy from class names.
function packageHierarchy(classes) {
  var map = {};

  function find(name, data) {
    var node = map[name],
      i;
    if (!node) {
      node = map[name] = data || { name: name, children: [] };
      if (name.length) {
        node.parent = find(name.substring(0, (i = name.lastIndexOf("."))));
        node.parent.children.push(node);
        node.key = name.substring(i + 1);
      }
    }
    return node;
  }

  classes.forEach(function (d) {
    find(d.name, d);
  });

  return d3.hierarchy(map[""]);
}

// Return a list of imports for the given array of nodes.
function packageImports(nodes) {
  var map = {},
    imports = [];

  // Compute a map from name to node.
  nodes.forEach(function (d) {
    map[d.data.name] = d;
  });

  // For each import, construct a link from the source to target node.
  nodes.forEach(function (d) {
    if (d.data.imports)
      d.data.imports.forEach(function (i) {
        imports.push(map[d.data.name].path(map[i]));
      });
  });

  return imports;
}

function overed(d) {
  link.style("mix-blend-mode", null);
  d3.select(this).attr("font-weight", "bold");
  d3.selectAll(d.incoming.map((d) => d.path))
    .attr("stroke", colorin)
    .raise();
  d3.selectAll(d.incoming.map(([d]) => d.text))
    .attr("fill", colorin)
    .attr("font-weight", "bold");
  d3.selectAll(d.outgoing.map((d) => d.path))
    .attr("stroke", colorout)
    .raise();
  d3.selectAll(d.outgoing.map(([, d]) => d.text))
    .attr("fill", colorout)
    .attr("font-weight", "bold");
}

function outed(d) {
  link.style("mix-blend-mode", "multiply");
  d3.select(this).attr("font-weight", null);
  d3.selectAll(d.incoming.map((d) => d.path)).attr("stroke", null);
  d3.selectAll(d.incoming.map(([d]) => d.text))
    .attr("fill", null)
    .attr("font-weight", null);
  d3.selectAll(d.outgoing.map((d) => d.path)).attr("stroke", null);
  d3.selectAll(d.outgoing.map(([, d]) => d.text))
    .attr("fill", null)
    .attr("font-weight", null);
}
