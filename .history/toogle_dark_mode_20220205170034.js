function toggle() {
  var el = document.getElementById("style1");
  if (el.href.match("./styling.css")) {
    el.href = "./styling.css";
  } else {
    el.href = "./dark_mode.css";
  }
  alert("<link> href is now: " + el.href);
}
