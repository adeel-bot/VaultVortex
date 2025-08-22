export default function generateStrongPassword() {
   let length = 16
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{};:,.<>?";
  const charSets = [upper, lower, numbers, symbols];
  const allChars = upper + lower + numbers + symbols;

  let password = "";
  // Guarantee one character from each set
  for (const set of charSets) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    password += set[array[0] % set.length];
  }

  // Fill the rest
  for (let i = password.length; i < length; i++) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    password += allChars[array[0] % allChars.length];
  }

  // Fisher-Yates shuffle
  const array = password.split('');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array.join('');
}
