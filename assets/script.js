$(function () {
  // Listener for click events on the save button
  $(".container-lg").on("click", ".saveBtn", function () {
    var timeBlockId = $(this).closest(".time-block").attr("id");
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userInput);
  });

  // Applying the past, present, or future class to each time block
  function updateColors() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

      if (timeBlockHour < currentHour) {
        $(this).addClass("past");
        $(this).removeClass("present future");
      } else if (timeBlockHour === currentHour) {
        $(this).addClass("present");
        $(this).removeClass("past future");
      } else {
        $(this).addClass("future");
        $(this).removeClass("past present");
      }
    });
  }

  // Getting user input from localStorage and setting values to corresponding textarea elements
  function loadEvents() {
    $(".time-block").each(function () {
      var timeBlockId = $(this).attr("id");
      var savedUserInput = localStorage.getItem(timeBlockId);

      if (savedUserInput) {
        $(this).find(".description").val(savedUserInput);
      }
    });
  }

  // Displaying the current date in the header
  function displayCurrentDate() {
    $("#currentDay").text(dayjs().format("MMMM D, YYYY"));
  }

  // Initial setup
  displayCurrentDate();
  loadEvents();
  updateColors();

  // Set up interval to update colors every minute
  setInterval(function () {
    updateColors();
  }, 60000);
});
