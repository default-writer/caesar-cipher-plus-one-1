import { frequency, convert } from "./alphabet";

function convert_colors(data) {
  const result = [];
  data.forEach(o => {
    result.push("rgba(0," + Math.floor(127 + 127 * o) + ",0,255)");
  });
  return result;
}

function get_chart_data(data) {
  const freq = frequency(data);
  const items = convert(freq);
  const max = items.reduce((acc, curr) => (acc > curr[1] ? acc : curr[1]), 1);
  return {
    datasets: [
      {
        backgroundColor: convert_colors(items.map(item => item[1] / max)),
        data: items.map(item => item[1])
      }
    ],
    labels: [...items.map(item => item[0])]
  };
}

export function update_chart(chart) {
  return function(array) {
    const data = get_chart_data(array);
    if (typeof chart.data === undefined || chart.data.length === 0) {
      chart.data = data;
      chart.update();
      return;
    }
    for (let i = 0; i < chart.data.datasets[0].data.length; i++) {
      chart.data.datasets[0].data[i] = 0;
    }
    for (let i = 0; i < data.datasets[0].data.length; i++) {
      chart.data.datasets[0].backgroundColor[i] = data.datasets[0].backgroundColor[i];
      chart.data.datasets[0].data[i] = data.datasets[0].data[i];
      chart.data.labels[i] = data.labels[i];
      chart.update();
    }
    for (let i = 0; i < chart.data.datasets[0].data.length; i++) {
      if (chart.data.datasets[0].data[i] === 0) {
        chart.data.datasets[0].data.splice(i, 1);
        chart.data.labels.splice(i, 1);
        chart.update();
        i--;
      }
    }
  };
}
