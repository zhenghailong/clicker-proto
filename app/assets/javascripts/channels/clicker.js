// $(document).on("ready turbolinks:load", function() {
//   var canvas = $("#clicker-canvas");
//
//   var clickerId = $("[data-clicker-id]");
//
//   if (clickerId.length != 0) {
//     if (App.clicker) {
//       App.cable.subscriptions.remove(App.clicker);
//     }
//
//     console.log('subscription done');
//
//     App.clicker = App.cable.subscriptions.create(
//       {
//         channel: "ClickerChannel",
//         clicker_id: $("[data-clicker-id]").data("clicker-id")
//       },
//       {
//         received: function(data) {
//           if (canvas.length != 0) {
//             canvas.append("<h2>" + data.message + "</h2>")
//           }
//         },
//       }
//     );
//   }
// });
