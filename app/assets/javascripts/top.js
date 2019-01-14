// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).on("ready turbolinks:load", function() {
  var canvas = $("#clicker-r-canvas");
  var clickerId = $("[data-clicker-r-id]");

  if (clickerId.length != 0) {
    if (App.clickerR) {
      App.cable.subscriptions.remove(App.clickerR);
    }

    App.clickerR = App.cable.subscriptions.create(
      {
        channel: "ClickerChannel",
        clicker_id: $("[data-clicker-r-id]").data("clicker-r-id") + ':R'
      },
      {
        received: function(data) {
          alert(data.clicker_type)
        },
      }
    );
  }
});

