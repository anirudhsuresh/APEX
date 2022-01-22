// values for all forces
forceProperties = {
  // center: {
  //     x: 0.5,
  //     y: 0.5
  // },
  // charge: {
  //     enabled: true,
  //     strength: -30,
  //     distanceMin: 1,
  //     distanceMax: 2000
  // },
  // collide: {
  //     enabled: true,
  //     strength: .7,
  //     iterations: 1,
  //     radius: 5
  // },
  // forceX: {
  //     enabled: false,
  //     strength: .1,
  //     x: .5
  // },
  // forceY: {
  //     enabled: false,
  //     strength: .1,
  //     y: .5
  // },
  // link: {
  //     enabled: true,
  //     distance: 30,
  //     iterations: 1
  // },
  // load the selected data
  selected_data: {
    project: 1,
    month: 1,
    ntype: "email",
  },
};

function readTextFile(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false); // using synchronous call
  var allText;
  rawFile.onload = function () {
    if (rawFile.status != 404) {
      // analyze HTTP status of the response
      allText = rawFile.responseText; // e.g. 404: Not Found
    } else {
      // show the result
      allText = "No Data";
      console.log("im here");
      return allText;
    }
  };

  rawFile.send(null);
  return allText;
}

var alias_to_name = JSON.parse(readTextFile("./new_name_to_alias.json"));
