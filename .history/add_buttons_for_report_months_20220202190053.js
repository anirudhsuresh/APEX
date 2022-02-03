// function listens to the no ui slider and adds buttons for allowing user to scroll tru the range of months currently available
function query_buttons() {
  let btns1 = document.querySelectorAll("div.holder button");
  btns1.forEach(function (i) {
    i.addEventListener("click", function () {
      var current_month_for_report = i.innerHTML;
      yes1(current_month_for_report);
    });
  });
}
