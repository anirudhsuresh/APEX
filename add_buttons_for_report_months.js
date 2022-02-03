function query_buttons() {
  let btns1 = document.querySelectorAll("div.holder button");
  btns1.forEach(function (i) {
    i.addEventListener("click", function () {
      var current_month_for_report = i.innerHTML;
      yes1(current_month_for_report);
    });
  });
}
