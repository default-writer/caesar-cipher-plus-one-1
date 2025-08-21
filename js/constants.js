const default_alphabet = [
    ..."~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:\"ZXCVBNM<>?`1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./ \n"
];
const default_plaintext = `This is a demo QR-code messenger which is used for faster communication between teams. What else do you need to encrypt messages publically? Secret code which shares QR-code privacy for one it is targeted for.\r\n\r\nLook out honey 'cause I'm using technology.\r\n--Iggy Pop, \"Search and Destroy\"`;
const seed = 1238473661;
const max = 2147483647;
const min = 0;

export { default_alphabet, default_plaintext, seed, min, max };
