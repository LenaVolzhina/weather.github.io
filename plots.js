var __eon_pubnub = new PubNub({
    subscribeKey: "sub-c-07d96e98-ecef-11e9-9a2e-968ee626a36d"
  });


var temperature_chart = eon.chart({
    pubnub: __eon_pubnub,
    history: true,
    limit: 100,
    rate: 1000,
    channels: ["tempeon"],
    flow: true,
    generate: {
      bindto: "#chartTemp",
      data: {
        x: "x",
        labels: false
      },

      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%H:%M:%S"
          }
        }
      }
    },
    transform: function(data) {
      return { eon: { Temperature: data.temperature_celsius } };
    }
  });

var humidity_chart = eon.chart({
  pubnub: __eon_pubnub,
  history: true,
  limit: 100,
  channels: ["humeon"],
  flow: true,
  generate: {
    bindto: "#chartHum",
    data: {
      type: "spline",
      x: "x",
      labels: false
    },
    transition: {
      duration: 250
    },
    color: {
      pattern: ["#FF0000", "#F6C600", "#60B044"],
      threshold: {
        values: [50, 52, 55]
      }
    },
    tooltip: {
      show: true
    },
    point: {
      show: true
    },
    axis: {
      x: {
        type: "timeseries",
        tick: {
          format: "%H:%M:%S"
        }
      }
    }
  },
  transform: function(data) {
    return { eon: { Humidity: data.humidity } };
  }
});


// https://www.pubnub.com/developers/eon/chart/gauge/
// https://github.com/GerHobbelt/eon-chart/blob/master/node_modules/c3/htdocs/samples/chart_gauge.html#L14

var humidity_thresholds = [30, 45, 60]    // terribly, low, normal, high
var gauge_chart = eon.chart({
  pubnub: __eon_pubnub,
  history: true,
  channels: ['humeon'],
  generate: {
    bindto: '#chartHumidityCurrent',
    data: {
      type: 'gauge',
    },
    gauge: {
      min: 0,
      max: 100,
      label: {
        format: function(value, ratio) {
          let comment
          let [t1, t2, t3] = humidity_thresholds

          if (value < t1) comment = "terrible"
          else if (value < t2) comment = "low"
          else if (value < t3) comment = "normal"
          else comment = "high"

          return String(Math.round(value)) + "%: " + comment
        },
        // show: false // to turn off the min/max labels.
      }
    },
    color: {
      pattern: ['#FF0000', '#FFCC00', '#60B044', '#EEEEEE'],
      threshold: {
        values: humidity_thresholds
      }
    }
  },
  transform: function(data) {
    return { eon: { Humidity: data.humidity } };
  }
});
