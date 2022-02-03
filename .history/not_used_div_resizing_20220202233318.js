// div resizing functionality
// currently not being used
var this_project = document.getElementById("txt_ide").value;
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

  $("#comp_inc").click(function () {
    setScale((currentScale = currentScale + 0.6));
  });
})();

// refresh page button
$(function () {
  $("a, button").click(function () {
    $(this).toggleClass("active", 100);
  });
});

function refreshPage() {
  window.location.reload();
}

// other resize buttons for commit
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
    $(".simple2").css(scaleCss);
  }

  $("#decrease2").click(function () {
    setScale((currentScale = currentScale - 0.1));
  });

  $("#increase2").click(function () {
    setScale((currentScale = currentScale + 0.1));
  });

  $("#comp_inc2").click(function () {
    setScale((currentScale = currentScale + 0.6));
  });

  $("#original2").click(function () {
    setScale((currentScale = 1));
  });
})();

$(document).scroll(function () {
  var y = $(this).scrollTop();
  if (y > 15) {
    $(".bottomMenu").fadeIn();
  } else {
    $(".bottomMenu").fadeOut();
  }
});
