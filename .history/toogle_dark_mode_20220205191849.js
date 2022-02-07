function toggle() {
  var el = document.getElementById("style1");
  if (el.href.match("./style.css")) {
    el.href = "./dark_mode.css";
  } else {
    el.href = "./style.css";
  }
  console.log("<link> href is now: " + el.href);
}
