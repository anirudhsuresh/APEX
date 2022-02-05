function reduce_the_emails(input_array) {
  current_info = read_current_project_emails();

  n_e = email_calculate(input_array);
  console.log(n_e);
  if (current_info.num_emails < 100) {
    threshold = 0;
  } else {
    threshold = Math.ceil(current_info.num_emails / 100);
  }

  new_array = [];
  input_array.forEach((a) => {
    if (a[2] > threshold) {
      // console.log("this is working", a);
      new_array.push(a);
    }
  });

  // now that we created the new array we need to find the new sender names new number of commits
  var num_emails = [];

  var num_senders = [];

  var num_e = [];
  var num_emails = [];
  var num_s = [];
  var num_senders = [];
  new_array.forEach((a) => {
    num_e.push(parseInt(a[2]));
    num_emails = num_e.reduce((a, b) => a + b, 0);
    num_s.push(a[0]);
    num_senders = [...new Set(num_s)].length;
  });

  var emails_per_dev = Math.floor(num_emails / num_senders);

  document.getElementById("num_emails").innerHTML = Math.floor(num_emails);

  document.getElementById("num_senders").innerHTML = Math.floor(num_senders);
  document.getElementById("email_per_dev").innerHTML =
    Math.floor(emails_per_dev);

  return new_array;
}

function reduce_the_commits(input_array) {
  current_info = read_current_project_commits();
  if (current_info.num_commits < 100) {
    threshold = 0;
  } else {
    threshold = Math.ceil(current_info.num_commits / 100);
  }
  // console.log(current_info.num_commits);
  new_array = [];
  input_array.forEach((a) => {
    if (a[2] > threshold) {
      new_array.push(a);
    }
  });

  // now that we created the new array we need to find the new sender names new number of commits

  var num_e = [];

  var num_s = [];
  var num_committers = [];
  // console.log(new_array);
  new_array.forEach((a) => {
    num_e.push(parseInt(a[2]));
    num_commits = num_e.reduce((a, b) => a + b, 0);
    num_s.push(a[0]);
    num_committers = [...new Set(num_s)].length;
  });
  var commit_per_dev = Math.floor(num_commits / num_committers);
  document.getElementById("num_commits").innerHTML = Math.floor(num_commits);
  document.getElementById("num_committers").innerHTML =
    Math.floor(num_committers);
  document.getElementById("commit_per_dev").innerHTML =
    Math.floor(commit_per_dev);

  return new_array;
}

function email_calculate(new_array) {
  new_array.forEach((a) => {
    num_e.push(parseInt(a[2]));
    num_emails = num_e.reduce((a, b) => a + b, 0);
  });

  return new_array;
}
