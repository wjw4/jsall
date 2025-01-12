// code 可以改成自己要的
const code = "abcdefghijklmnopqrstuvwxyz0123456789";

export function randomString(length = 36) {
  let result = "";

  for (let i = 0; i < length; i++) {
    result += code.charAt(Math.floor(Math.random() * code.length));
  }

  return result;
}
