// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).on("ready turbolinks:load", function() {
  var canvas = $("#clicker-canvas");
  var clickerId = $("[data-clicker-id]").data("clicker-id");
  var clickerType = $("[data-clicker-type]").data("clicker-type");

  var four = $("#four_area");
  var two = $("#two_area");
  var toggleBtn = function(clicker_type) {
    if (clicker_type == 1) {
      four.show();
      two.hide();
    } else {
      four.hide();
      two.show();
    }
  }

  if (clickerType) {
    toggleBtn(clickerType);
  } else {
    four.hide();
    two.hide();
  }

  if (clickerId) {
    if (App.clicker) {
      App.cable.subscriptions.remove(App.clicker);
    }

    App.clicker = App.cable.subscriptions.create(
      {
        channel: "ClickerChannel",
        clicker_id: clickerId
      },
      {
        received: function(data) {
          if (data.action == 'start') {
            canvas.html("<h2>投票種別：" + data.clicker_type + "</h2>")
            toggleBtn(data.clicker_type);
          }
        },
      }
    );
  }
});

