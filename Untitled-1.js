function reduce_the_commits(input_array, threshold) {
  new_array = [];
  input_array.forEach((a) => {
    if (a[2] > threshold) {
      new_array.push(a);
    }
  });

  // now that we created the new array we need to find the new sender names new number of commits
  var num_emails = [];

  var num_e = [];
  var num_emails = [];
  var num_s = [];
  var num_committers = [];

  new_array.forEach((a) => {
    num_e.push(parseInt(a[2]));
    num_commits = num_e.reduce((a, b) => a + b, 0);
    num_s.push(a[0]);
    num_committers = [...new Set(num_s)].length;
  });

  var commit_per_dev = Math.floor(num_emails / num_committers);

  document.getElementById("num_commits").innerHTML = Math.floor(num_commits);
  document.getElementById("num_committers").innerHTML =
    Math.floor(num_committers);
  document.getElementById("commit_per_dev").innerHTML =
    Math.floor(commit_per_dev);

  return new_array;
}
