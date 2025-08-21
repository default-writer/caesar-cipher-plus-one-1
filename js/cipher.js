import { hex_sha1, hex2binb } from "./sha1";
import { prng } from "./prng";
import { default_alphabet, default_plaintext, seed, min, max } from "./constants";

let rnd = new prng(seed);
let alphabet = [...default_alphabet];
let plaintext = [...default_plaintext];

function get_alphabet(text) {
  return [...alphabet];
}

function set_alphabet(text) {
  alphabet = [...text];
}

function get_plaintext(text) {
  return [...plaintext];
}

function set_plaintext(text) {
  plaintext = [...text];
}

function random() {
  return Math.floor(rnd.next(min, max));
}

function sha1(array) {
  return hex_sha1(array.join(""));
}

function decrypt_cipher(...chars) {
  return cipher_function(shift_decrypt)(...chars);
}

function encrypt_cipher(...chars) {
  return cipher_function(shift_encrypt)(...chars);
}

function random_key() {
  shuffle(alphabet, random());
}

function default_key() {
  alphabet = [...default_alphabet];
  plaintext = [...default_plaintext];
}

function set_rnd(seed) {
  rnd = new prng(seed);
}

function size() {
  return alphabet.length;
}

function shuffle(array, seed) {
  set_rnd(seed);
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(rnd.next(i));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function cipher_function(cipher) {
  return function (random, shift, alpha, array, sha_alphabet, sha_plaintext) {
    alphabet = alpha;
    shuffle_binb(alphabet, sha_alphabet);
    shuffle_binb(alphabet, sha_plaintext);
    set_rnd(random)
    for (let i = 0; i < shift; i++) {
      array = array.map(cipher);
    }
    return array;
  };
}

function shuffle_binb(alphabet, str) {
  let array = hex2binb(str);
  shuffle(alphabet, array[0]);
  shuffle(alphabet, array[1]);
  shuffle(alphabet, array[2]);
  shuffle(alphabet, array[3]);
}

function next_position(char) {
  const j = random();
  const position = alphabet.indexOf(char);
  return (position + 1 + j) % size();
}

function previous_position(char) {
  const j = random();
  const position = alphabet.indexOf(char);
  return size() - 1 - ((size() - position + j) % size());
}

function shift_encrypt(char) {
  if (char === undefined || !alphabet.includes(char)) throw Error("undefined char '" + char + "'");
  const position = alphabet.indexOf(char);
  let newPosition = next_position(char);
  while (newPosition === position) newPosition = next_position(char);
  return alphabet[newPosition];
}

function shift_decrypt(char) {
  if (char === undefined || !alphabet.includes(char)) throw Error("undefined char '" + char + "'");
  const position = alphabet.indexOf(char);
  let newPosition = previous_position(char);
  while (newPosition === position) newPosition = previous_position(char);
  return alphabet[newPosition];
}

export { get_alphabet, get_plaintext, set_alphabet, set_plaintext, random, sha1, max, decrypt_cipher, encrypt_cipher, random_key, default_key };