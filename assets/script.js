$(function () {
  $(".saveBtn").on("click", function () {

      var timeBlockId = $(this).closest(".time-block").attr("id");


      var userInput = $(this).siblings(".description").val();


      localStorage.setItem(timeBlockId, userInput);
  });


  $(".time-block").each(function () {
      var currentHour = dayjs().hour();
      var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

      if (timeBlockHour < currentHour) {
          $(this).addClass("past");
      } else if (timeBlockHour === currentHour) {
          $(this).removeClass("past");
          $(this).addClass("present");
      } else {
          $(this).removeClass("past");
          $(this).removeClass("present");
          $(this).addClass("future");
      }
  });

 
  $(".time-block").each(function () {
      var timeBlockId = $(this).attr("id");
      var savedUserInput = localStorage.getItem(timeBlockId);

      if (savedUserInput) {
          $(this).find(".description").val(savedUserInput);
      }
  });


  $("#currentDay").text(dayjs().format("MMMM D, YYYY"));
});
