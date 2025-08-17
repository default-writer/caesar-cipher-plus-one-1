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
    backgroundColor: convert_colors(items.map(item => item[1] / max)),
    data: items.map(item => item[1]),
    labels: [...items.map(item => item[0])]
  };
}

export function update_chart(chart) {
  return function(array) {
    const data = get_chart_data(array);
    chart.data.labels = data.labels;
    chart.data.datasets[0].data = data.data;
    chart.data.datasets[0].backgroundColor = data.backgroundColor;
    chart.update();
  };
}
