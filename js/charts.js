function sort(array) {
  return array.sort(function (a, b) {
    var firstLetter = a[0],
      firstNum = a[1],
      secondLetter = b[0],
      secondNum = b[1];
    if (firstNum < secondNum) {
      return 1;
    }
    if (firstNum > secondNum) {
      return -1;
    }
    if (firstLetter > secondLetter) {
      return 1;
    }
    if (firstLetter < secondLetter) {
      return -1;
    }
    return 0;
  });
}
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
  return function (array) {
    const data = get_chart_data(array);
    chart.data.labels = data.labels;
    chart.data.datasets[0].data = data.data;
    chart.data.datasets[0].backgroundColor = data.backgroundColor;
    chart.update();
  };
}

export function chars(text) {
  const freq = frequency(text);
  const items = convert(freq);
  const sort_items = sort(items);
  return {
    chars: sort_items.reduce((acc, curr) => (acc += curr[0]), ""),
    values: sort_items.map(s => s[1])
  };
}

export function frequency(text) {
  var count = {};
  text.split("").map(s => (count[s] = count[s] ? count[s] + 1 : 1));
  return Object.keys(count)
    .sort()
    .reduce((acc, curr) => ({ ...acc, [curr]: count[curr] }), {});
}

export function convert(obj) {
  return Object.keys(obj).map(function (key) {
    return [key, obj[key]];
  });
}
