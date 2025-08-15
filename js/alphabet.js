export const default_alphabet = [
  ..."~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:\"ZXCVBNM<>?`1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./ ",
  "\n"
];

function sort(array) {
  return array.sort(function(a, b) {
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
  return Object.keys(obj).map(function(key) {
    return [key, obj[key]];
  });
}
