// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).on("ready turbolinks:load", function() {
  var canvas = $("#clicker-canvas");
  var clickerId = $("[data-clicker-id]");

  if (clickerId.length != 0) {
    if (App.clicker) {
      App.cable.subscriptions.remove(App.clicker);
    }

    App.clicker = App.cable.subscriptions.create(
      {
        channel: "ClickerChannel",
        clicker_id: $("[data-clicker-id]").data("clicker-id")
      },
      {
        received: function(data) {
          if (data.action == 'start') {
            canvas.html("<h2>投票種別：" + data.clicker_type + "</h2>")
          }
        },
      }
    );
  }
});

