function query_buttons() {
  let btns1 = document.querySelectorAll("div.holder button");
  // console.log(btns1);
  btns1.forEach(function (i) {
    i.addEventListener("click", function () {
      var current_month_for_report = i.innerHTML;
      // console.log(current_month_for_report);
      yes1(current_month_for_report);
      // document.querySelector(".msg1").innerHTML = i.innerHTML;
      // var objTo = document.getElementById("content");
      // let divtest = document.createElement("div");

      // divtest.innerHTML = i.innerHTML;

      // objTo.replaceWith(divtest);
    });
  });
}
