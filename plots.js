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
