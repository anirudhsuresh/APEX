// create a combined object for the email data for the given range
function create_for(feed_size) {
  var sub_array = [];
  var this_project = document.getElementById("txt_ide").value;
  var curr_month = document.getElementById("Month").value;
  var cur_month = feed_size[0];

  for (const cur_month of feed_size) {
    var projectInfo = JSON.parse(
      readTextFile(
        `./UPDATED_Data/new/email_measures/${alias_to_name[this_project]}_${cur_month}.json`
      )
    );
    fixes;

    sub_array.push(projectInfo);
  }

  const combined_data = sub_array.reduce((a, obj) => {
    Object.entries(obj).forEach(([key, val]) => {
      if (typeof val == "number") {
        a[key] = (a[key] || 0) + val;
      }
      // a[key] = (a[key] || 0) + val;
    });
    return a;
  });

  // var threshold = Math.ceil(combined_data / 100);
  var threshold = Math.ceil(combined_data.num_emails / 100);

  email_aggregate(combined_data);

  return threshold;
}

// create combined object based on th range for the tech nets
function create_for_commits(feed_size) {
  var sub_array = [];
  var this_project = document.getElementById("txt_ide").value;
  var curr_month = document.getElementById("Month").value;
  var cur_month = feed_size[0];
  for (const cur_month of feed_size) {
    try {
      var projectInfo = JSON.parse(
        readTextFile(
          `./UPDATED_Data/new/commits_measure/${alias_to_name[this_project]}_${cur_month}.json`
        )
      );
    } catch (err) {}

    sub_array.push(projectInfo);
  }

  const combined_data = sub_array.reduce((a, obj) => {
    Object.entries(obj).forEach(([key, val]) => {
      if (typeof val == "number") {
        a[key] = (a[key] || 0) + val;
      }
      // a[key] = (a[key] || 0) + val;
    });
    return a;
  });

  // var threshold = Math.ceil(combined_data / 100);
  var threshold = Math.ceil(combined_data.num_emails / 100);

  commit_aggregate(combined_data);

  return threshold;
}

// var dataf1;
// function get_the_data(common_path) {
//   d3.json(`${common_path}`, function (error, dataf) {
//     dataf1 = dataf;
//   });
// }

function give_the_data() {
  var t = dataf1;
  return t;
}
// combine email stats
function create_network_data(feed_size) {
  var new_empty = [];
  var feed_size = feed_size;
  var first_data;
  var this_project = document.getElementById("txt_ide").value;
  for (const cur_month of feed_size) {
    var common_path = `./UPDATED_Data/new/email_measures/${alias_to_name[this_project]}_${cur_month}.json`;
    var dataf1;

    d3.json(`${common_path}`, function (error, dataf) {
      dataf1 = dataf;
    });

    new_empty = [...first_data, ...new_empty];

    return new_empty;
  }
}

function create_new_data_force_net(feed_size) {
  var new_empty = [];
  var feed_size = feed_size;
  var first_data;
  var this_project = document.getElementById("txt_ide").value;
  for (const cur_month of feed_size) {
    var common_path = `./UPDATED_Data/new/email_measures/${alias_to_name[this_project]}_${cur_month}.json`;

    first_data = eval(readTextFile(`${common_path}`));

    new_empty = [...first_data, ...new_empty];
  }

  merge_force_json(new_empty);
  // return new_empty;
}

function merge_force_json(originalArray) {
  const arrayHashmap = originalArray.reduce((obj, item) => {
    obj[item.name]
      ? obj[item.name].imports.push(...item.imports)
      : (obj[item.name] = { ...item });
    return obj;
  }, {});

  const mergedArray = Object.values(arrayHashmap);

  // console.log(mergedArray);
  R_UpdateEmailNet(mergedArray);
}

// R_UpdateEmailNet(mergedArray);
// useful for the merging of the files data
function create_new_data(feed_size) {
  var new_empty = [];
  var feed_size = feed_size;
  var first_data = [];
  var this_project = document.getElementById("txt_ide").value;
  for (const cur_month of feed_size) {
    var common_path = `./UPDATED_Data/new/new_emails/${alias_to_name[this_project]}_${cur_month}.json`;

    if (cur_month == feed_size[0]) {
      new_array = JSON.parse(readTextFile(`${common_path}`));
      var first_data = [];
      new_array.forEach((a) => {
        first_data.push([a[0], a[1], parseInt(a[2])]);
      });
    } else {
      var data1 = JSON.parse(readTextFile(`${common_path}`));
      var first_data = [];
      data1.forEach((a) => {
        first_data.push([a[0], a[1], parseInt(a[2])]);
      });

      new_empty = [...first_data, ...new_empty];
    }
  }

  return [first_data, new_empty];
}

function reduce_the_thresh(input_array, threshold) {
  new_array = [];
  input_array.forEach((a) => {
    if (a[2] > threshold) {
      new_array.push(a);
    }
  });

  return new_array;
}

function merge_all_jsons(array2, res) {
  var result = res
    .concat(array2)
    .reduce(
      function (ob, ar) {
        if (!(ar[0] + ar[1] in ob.nums)) {
          // console.log(ob);
          ob.nums[ar[0] + ar[1]] = ar;
          ob.result.push(ar);
        } else ob.nums[ar[0] + ar[1]][2] += ar[2];

        return ob;
      },
      { nums: {}, result: [] }
    )
    .result.sort(function (a, b) {
      return a[0] - b[0];
    });
  // result1 = reduce_the_thresh(result, th);
  return result;
}

function create_new_data1(feed_size) {
  var end = feed_size[feed_size.length - 1];
  var start = feed_size[0];
  var this_project = document.getElementById("txt_ide").value;
  //  read two json files and update the to and from
  to_from_info = JSON.parse(
    readTextFile(
      `./UPDATED_Data/new/new_month_intervals/${alias_to_name[this_project]}.json`
    )
  );

  var to_dates_s = to_from_info[start];
  var to_dates_e = to_from_info[end];
  var to_dates = [to_dates_s[0], to_dates_e[1]];

  document.getElementById("from").innerHTML = to_dates[0];
  document.getElementById("to").innerHTML = to_dates[1];
  document.getElementById("reports_month").innerHTML =
    to_dates[0] + "~" + to_dates[1];

  //
  var new_empty = [];
  var feed_size = feed_size;
  var first_data1 = [];
  new_empty = [];
  var this_project = document.getElementById("txt_ide").value;
  for (const cur_month of feed_size) {
    var common_path = `./UPDATED_Data/new/grouped_new_commits/${alias_to_name[this_project]}_${cur_month}.json`;

    if (cur_month == feed_size[0]) {
      try {
        first_data = JSON.parse(readTextFile(`${common_path}`));
      } catch (err) {}
      var first_data1 = [];
      first_data.forEach((a) => {
        first_data1.push([a[0], a[1], parseInt(a[2])]);
      });
    } else {
      var first_data = [];
      try {
        var data1 = JSON.parse(readTextFile(`${common_path}`));
      } catch (err) {}
      data1.forEach((a) => {
        first_data.push([a[0], a[1], parseInt(a[2])]);
      });
      new_empty1 = [...first_data, ...new_empty];
    }
  }

  return [first_data1, new_empty1];
}

function makeButtons(c) {
  $(".holder").html("");
  for (var i = 0; i < c.length; i++) {
    $(".holder").append("<button value=" + c[i] + ">" + c[i] + "</button>");
  }
}

function merge_all_jsons_2(array22, res2) {
  var result1 = res2
    .concat(array22)
    .reduce(
      function (ob, ar) {
        if (!(ar[0] + ar[1] in ob.nums)) {
          // console.log(ob);
          ob.nums[ar[0] + ar[1]] = ar;
          ob.result.push(ar);
        } else ob.nums[ar[0] + ar[1]][2] += ar[2];

        return ob;
      },
      { nums: {}, result: [] }
    )
    .result.sort(function (a, b) {
      return a[0] - b[0];
    });
  return result1;
}
