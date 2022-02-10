function create_nested_data_emails(feed_size) {
  var new_empty = [];
  var feed_size = feed_size;

  var first_data = [];
  var this_project = document.getElementById("txt_ide").value;
  for (const cur_month of feed_size) {
    var common_path = `./UPDATED_Data/new/new_emails/${alias_to_name[this_project]}_${cur_month}.json`;

    if (cur_month == feed_size[0]) {
      try {
        new_array = JSON.parse(readTextFile(`${common_path}`));
      } catch {}
      var first_data = [];
      new_array.forEach((a) => {
        first_data.push([a[0], a[1], parseInt(a[2])]);
      });
    } else {
      try {
        var data1 = JSON.parse(readTextFile(`${common_path}`));
      } catch {}
      var first_data = [];
      data1.forEach((a) => {
        first_data.push([a[0], a[1], parseInt(a[2])]);
      });

      new_empty = [...first_data, ...new_empty];
    }
  }

  return [first_data, new_empty];
}

function create_nested_data_commits(feed_size) {
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
    var common_path = `./UPDATED_Data/new/new_commit/Jan/${alias_to_name[this_project]}_${cur_month}.json`;

    try {
    } catch {}
    if (cur_month == feed_size[0]) {
      try {
        first_data = JSON.parse(readTextFile(`${common_path}`));
      } catch (err) {}
      var first_data1 = [];
      try {
        first_data.forEach((a) => {
          first_data1.push([a[0], a[1], parseInt(a[2])]);
        });
      } catch {}
    } else {
      var first_data = [];
      try {
        var data1 = JSON.parse(readTextFile(`${common_path}`));
      } catch (err) {}
      try {
        data1.forEach((a) => {
          first_data.push([a[0], a[1], parseInt(a[2])]);
        });
      } catch {}
      new_empty1 = [...first_data, ...new_empty];
    }
  }

  return [first_data1, new_empty1];
}

function merge_for_emails(array2, res) {
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

function merge_for_commits(array22, res2) {
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

function makeButtons(c) {
  $(".holder").html("");
  for (var i = 0; i < c.length; i++) {
    $(".holder").append("<button value=" + c[i] + ">" + c[i] + "</button>");
  }
}
