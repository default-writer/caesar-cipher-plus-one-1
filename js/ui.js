import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

import {
  sha1,
  random,
  alphabet,
  plaintext,
  set_plaintext,
  random_key,
  encrypt_cipher,
  decrypt_cipher,
  default_key,
  set_alphabet
} from "./cipher";
import { click, saveAs } from "./io";
import { default_alphabet } from "./alphabet";
import { update_chart } from "./charts";
import { QRCode } from "./qrcode";

const alphabet1 = document.getElementById("alphabet1");
const plaintext1 = document.getElementById("plaintext1");
const IV1 = document.getElementById("IV1");
const output1 = document.getElementById("output1");
const sha_plaintext1 = document.getElementById("sha_plaintext1");
const sha_alphabet1 = document.getElementById("sha_alphabet1");
const shift1 = document.getElementById("shift1");
const import_json = document.getElementById("import_json");
const export_json = document.getElementById("export_json");
const upload_json = document.getElementById("upload_json");
const export_public_json = document.getElementById("export_public_json");
const alphabet2 = document.getElementById("alphabet2");
const plaintext2 = document.getElementById("plaintext2");
const IV2 = document.getElementById("IV2");
const output2 = document.getElementById("output2");
const sha_plaintext2 = document.getElementById("sha_plaintext2");
const sha_alphabet2 = document.getElementById("sha_alphabet2");
const shift2 = document.getElementById("shift2");
const app1 = document.getElementById("app1");
const app2 = document.getElementById("app2");
const randomize = document.getElementById("randomize");
const alphabet_random = document.getElementById("alphabet_random");
const alphabet_default = document.getElementById("alphabet_default");
const alphabet_basic = document.getElementById("alphabet_basic");
const encrypt = document.getElementById("encrypt");
const decrypt = document.getElementById("decrypt");
const ctx1 = document.getElementById("myChart1").getContext("2d");
const ctx2 = document.getElementById("myChart2").getContext("2d");
const chartType = document.getElementById("chartType");
const qrCode1Placeholder = document.getElementById("qrCode1");
const qrCode2Placeholder = document.getElementById("qrCode2");

let options1 = {
  width: 512,
  height: 512,
  colorDark: "#000000",
  colorLight: "#FFFFFF",
  typeNumber: 40,
  el: qrCode1Placeholder
};

let options2 = {
  width: 512,
  height: 512,
  colorDark: "#000000",
  colorLight: "#FFFFFF",
  typeNumber: 40,
  el: qrCode2Placeholder
};

sha_alphabet1.readOnly = true;
sha_plaintext1.readOnly = true;

let chart1 = new Chart(ctx1, {
  type: chartType.value,
  data: { labels: [], datasets: [{}] },
  options: {
    elements: {
      arc: {
        borderWidth: 1,
        borderColor: "rgba(0,127,0,0.25)"
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }
});
let chart2 = new Chart(ctx2, {
  type: chartType.value,
  data: { labels: [], datasets: [{}] },
  options: {
    elements: {
      arc: {
        borderWidth: 1,
        borderColor: "rgba(0,127,0,0.25)"
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }
});

const qrCode1 = new QRCode(options1);
const qrCode2 = new QRCode(options2);

function makeCode1() {
  qrCode1.makeCode(output1.value);
}

function makeCode2() {
  qrCode2.makeCode(output2.value);
}

function updateQRCode1() {
  clearTimeout(options1.timeout);
  options1.timeout = setTimeout(makeCode1, 1000);
}

function updateQRCode2() {
  clearTimeout(options2.timeout);
  options2.timeout = setTimeout(makeCode2, 1000);
}

function update_chart1(array) {
  return update_chart(chart1)(array);
}

function update_chart2(array) {
  return update_chart(chart2)(array);
}

function loadContent() {
  click(upload_json);
}

function saveContent() {
  const blob = new Blob(
    [
      JSON.stringify({
        cipher: output1.value,
        sha: sha_plaintext1.value,
        key: alphabet1.value,
        shift: shift1.value,
        iv: IV1.value
      })
    ],
    { type: "application/json;charset=utf-8" }
  );
  saveAs(blob, "settings.json");
}

function load_(file) {
  read(file)
    .then(content => {
      const json = JSON.parse(content);
      plaintext2.value = json.cipher;
      sha_plaintext2.value = json.sha;
      alphabet2.value = json.key ? [...json.key].join("") : [...default_alphabet].join("");
      sha_alphabet2.value = json.key ? sha1([...json.key]) : sha1([...default_alphabet]);
      shift2.value = json.shift ? parseInt(json.shift, 10) : 1;
      IV2.value = json.iv ? parseInt(json.iv, 10) : 1;
      decrypt_();
    })
    .catch(error => console.log(error));
}

function default_() {
  init_();
  encrypt_();
  prepare2_();
  decrypt_();
}

function read(file) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result);
    reader.onerror = error => reject(error);
    reader.readAsText(file);
  });
}

function init_() {
  default_key();
  alphabet1.value = alphabet.join("");
  plaintext1.value = plaintext.join("");
  sha_alphabet1.value = sha1(alphabet);
  sha_plaintext1.value = sha1(plaintext);
  IV1.value = 1;
  shift1.value = 1;
  IV2.value = 1;
  shift2.value = 1;
  plaintext2.value = plaintext.value;
}

function prepare1_() {
  IV1.value = IV2.value;
  shift1.value = shift2.value;
  alphabet1.value = alphabet2.value;
  plaintext1.value = output2.value;
  sha_alphabet1.value = sha_alphabet2.value;
  sha_plaintext1.value = sha_plaintext2.value;
}

function prepare2_() {
  IV2.value = IV1.value;
  shift2.value = shift1.value;
  alphabet2.value = alphabet1.value;
  plaintext2.value = output1.value;
  sha_alphabet2.value = sha_alphabet1.value;
  sha_plaintext2.value = sha_plaintext1.value;
}

function encrypt_() {
  output1.value = encrypt_cipher(
    parseInt(IV1.value, 10),
    Number(shift1.value),
    [...alphabet1.value],
    [...plaintext1.value],
    sha_alphabet1.value,
    sha_plaintext1.value
  ).join("");
  update_chart1(output1.value);
  updateQRCode1();
}

function decrypt_() {
  output2.value = decrypt_cipher(
    parseInt(IV2.value, 10),
    Number(shift2.value),
    [...alphabet2.value],
    [...plaintext2.value],
    sha_alphabet2.value,
    sha_plaintext2.value
  ).join("");
  update_chart2(output2.value);
  updateQRCode2();
}

function createChart(chart, ctx, type) {
  const oldData = chart.data;
  chart.destroy();
  return new Chart(ctx, {
    type: type,
    data: oldData,
    options: {
      responsive: true,
      elements: {
        arc: {
          borderWidth: 1,
          borderColor: "rgba(0,127,0,0.25)"
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

export function ui() {
  chartType.addEventListener("change", (event) => {
    chart1 = createChart(chart1, ctx1, chartType.value);
    chart2 = createChart(chart2, ctx2, chartType.value);
  });
  upload_json.addEventListener("change", event => {
    event.preventDefault();
    if (upload_json.files.length === 1) {
      load_(upload_json.files[0]);
    }
  });
  upload_json.addEventListener("click", event => {
    event.preventDefault();
    document.getElementById("upload_json").value = "";
  });
  import_json.addEventListener("click", event => {
    event.preventDefault();
    loadContent();
  });
  export_json.addEventListener("click", event => {
    event.preventDefault();
    saveContent();
  });
  export_public_json.addEventListener("click", event => {
    event.preventDefault();
    const blob = new Blob(
      [
        JSON.stringify({
          cipher: output1.value,
          sha: sha_plaintext1.value
        })
      ],
      { type: "application/json;charset=utf-8" }
    );
    saveAs(blob, "settings-public.json");
  });
  app1.addEventListener("click", event => {
    event.preventDefault();
    prepare2_();
  });
  app2.addEventListener("click", event => {
    event.preventDefault();
    prepare1_();
  });
  IV1.addEventListener("input", event => {
    event.preventDefault();
    encrypt_();
  });
  IV2.addEventListener("input", event => {
    event.preventDefault();
    decrypt_();
  });
  alphabet1.addEventListener("input", event => {
    event.preventDefault();
    sha_alphabet1.value = sha1(alphabet);
    encrypt_();
  });
  plaintext1.addEventListener("input", event => {
    event.preventDefault();
    set_plaintext(plaintext1.value);
    sha_plaintext1.value = sha1(plaintext);
    encrypt_();
  });
  randomize.addEventListener("click", event => {
    event.preventDefault();
    IV1.value = random();
    encrypt_();
  });
  alphabet_default.addEventListener("click", event => {
    event.preventDefault();
    default_();
  });
  alphabet_basic.addEventListener("click", event => {
    event.preventDefault();
    set_alphabet("~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:\"ZXCVBNM<>?`1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./ \n");
    set_plaintext("This is a demo QR-code messenger which is used for faster communication between teams. What else do you need to encrypt messages publically? Secret code which shares QR-code privacy for one it is targeted for.\r\n\r\nLook out honey 'cause I'm using technology.\r\n--Iggy Pop, \"Search and Destroy\"");
    alphabet1.value = alphabet.join("");
    sha_alphabet1.value = sha1(alphabet);
    plaintext1.value = plaintext.join("");
    sha_plaintext1.value = sha1(plaintext);
    encrypt_();
  });
  alphabet_random.addEventListener("click", event => {
    event.preventDefault();
    random_key();
    alphabet1.value = alphabet.join("");
    sha_alphabet1.value = sha1(alphabet);
    encrypt_();
  });
  shift1.addEventListener("change", event => {
    event.preventDefault();
    encrypt_();
  });
  shift2.addEventListener("change", event => {
    event.preventDefault();
    decrypt_();
  });
  encrypt.addEventListener("click", event => {
    event.preventDefault();
    encrypt_();
  });
  decrypt.addEventListener("click", event => {
    event.preventDefault();
    decrypt_();
  });

  default_();
}
