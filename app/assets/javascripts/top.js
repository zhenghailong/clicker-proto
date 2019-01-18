// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).on("ready turbolinks:load", function() {
  var rcanvas = $("#clicker-r-canvas");
  var jcanvas = $("#clicker-j-canvas");

  var clickerId = $("[data-clicker-r-id]").data("clicker-r-id");
  var clickerType = $("[data-clicker-t-id]").data("clicker-t-id");

  var chart_canvas = $("#clicker_chart");

  if (clickerType) {
    rcanvas.html("<p>投票種別：" + clickerType + "</p>")
  }

  var i = 0;
  var anwser_data_arr4;
  // TODO 削除
  anwser_data_arr4 = [0, 0, 0, 0];
  var anwser_data_arr2;
  // TODO 削除
  anwser_data_arr2 = [0, 0];

  if (clickerId) {
    var i = countSpecifieChannel("ClickerChannel", clickerId+':J');
    if (i >=1) { i--; }
    jcanvas.html("<p>" + i + "</p>")

    if (App.clickerR) {
      App.cable.subscriptions.remove(App.clickerR);
    }

    App.clickerR = App.cable.subscriptions.create(
      {
        channel: "ClickerChannel",
        clicker_id: clickerId + ':R'
      },
      {
        received: function(data) {
          rcanvas.html("<p>投票データ：" + JSON.stringify(data.anwser) + "</p>")
          d = Object.values(data.anwser);

          if (data.clicker_type == 1) {
            anwser_data_arr4[0] = d[0] + anwser_data_arr4[0]
            anwser_data_arr4[1] = d[1] + anwser_data_arr4[1]
            anwser_data_arr4[2] = d[2] + anwser_data_arr4[2]
            anwser_data_arr4[3] = d[3] + anwser_data_arr4[3]
            // draw chart
            // data.anwserをanwser_data_arrにappendして、chartにわたす
            console.log("draw chart 444444");
            draw_chart_four(anwser_data_arr4);
          }

          if (data.clicker_type == 2) {
            anwser_data_arr2[0] = d[0] + anwser_data_arr2[0]
            anwser_data_arr2[1] = d[1] + anwser_data_arr2[1]
            // draw chart
            // data.anwserをanwser_data_arrにappendして、chartにわたす
            console.log("draw chart 2222222");
            draw_chart_two(anwser_data_arr2);
          }
        },
      }
    );

    if (App.clickerJ) {
      App.cable.subscriptions.remove(App.clickerJ);
    }

    App.clickerJ = App.cable.subscriptions.create(
      {
        channel: "ClickerChannel",
        clicker_id: clickerId + ':J'
      },
      {
        received: function(data) {
          i++;
          console.log(logOutputChannel());
          jcanvas.html("<p>" + i + "</p>")
        },
      }
    );
  }

});

function countSpecifieChannel(channel, room) {
  console.log('countSpecifieChannel channel:' + channel + ',room:' + room);

  var i = 0;

  var subscriptions = App.cable.subscriptions['subscriptions'];
  subscriptions.forEach(function (subscription) {
      var identifier = subscription.identifier;
      obj = JSON.parse(identifier);

      if (channel == obj.channel && room == obj.clicker_id) {
          i += 1;
      }

  });

  console.log('> count:' + i)
  return i;
}

function logOutputChannel() {
    console.log('++++++++++debug++++++++++');
    console.log('Subscribed channel');

    // 購読中のチャンネル数
    var count = App.cable.subscriptions['subscriptions'].length;
    console.log('> count:' + count);

    // 購読中のチャンネル情報
    var subscriptions = App.cable.subscriptions['subscriptions'];
    subscriptions.forEach(function (subscription) {
        var identifier = subscription.identifier;

        obj = JSON.parse(identifier);
        //=> {channel: "MessagesChannel", room: "1"}

        console.log('> channnel:' + obj.channel + ',clicker_id:' + obj.clicker_id);

    });
    console.log('+++++++++++++++++++++++++');
}

function draw_chart_two(i_data) {
  ctx = document.getElementById("clicker_chart").getContext('2d')
  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["A", "B"],
      datasets: [{
        data: i_data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  })
}

function draw_chart_four(i_data) {
  ctx = document.getElementById("clicker_chart").getContext('2d')
  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["A", "B", "C", "D"],
      datasets: [{
        data: i_data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  })
}
