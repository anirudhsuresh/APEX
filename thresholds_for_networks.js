function reduce_the_emails(input_array, threshold) {
  new_array = [];
  input_array.forEach((a) => {
    if (a[2] > threshold) {
      console.log("this is working", a);
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
  array2.forEach((a) => {
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
