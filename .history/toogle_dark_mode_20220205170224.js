function toggle() {
  var el = document.getElementById("style1");
  if (el.href.match("./styling.css")) {
    el.href = "./dark_mode.css";
  } else {
    el.href = "./styling.css";
  }
  console.log("<link> href is now: " + el.href);
}
