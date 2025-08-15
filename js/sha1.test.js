import { validate_hex_sha1 } from "./sha1";

test("validate string to sha1 conversion", () => {
  let val = validate_hex_sha1();
  expect(val).toBe(true);
});
