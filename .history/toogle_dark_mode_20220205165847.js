function toggle() {
  var el = document.getElementById("style1");
  if (el.href.match("resumecss.css")) {
    el.href = "resumecssinvert.css";
  } else {
    el.href = "resumecss.css";
  }
  alert("<link> href is now: " + el.href);
}
