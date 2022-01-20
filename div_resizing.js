(function () {
  var currentScale = 1;

  var cssPrefixesMap = [
    "scale",
    "-webkit-transform",
    "-moz-transform",
    "-ms-transform",
    "-o-transform",
    "transform",
  ];

  function setScale(scale) {
    var scaleCss = {};

    cssPrefixesMap.forEach(function (prefix) {
      scaleCss[prefix] = "scale(" + scale + ")";
    });

    //   $("div").css(scaleCss);
    $(".simple").css(scaleCss);
  }

  $("#decrease").click(function () {
    setScale((currentScale = currentScale - 0.1));
  });

  $("#increase").click(function () {
    setScale((currentScale = currentScale + 0.1));
  });
  $("#original").click(function () {
    setScale((currentScale = 1));
  });
})();

// refresh page
function refreshPage() {
  window.location.reload();
}
