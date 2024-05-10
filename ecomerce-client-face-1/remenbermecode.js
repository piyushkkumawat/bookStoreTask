// Importing CryptoJS library (you need to include it in your project)
const CryptoJS = require("crypto-js");

// Encryption function
function encryptData(data, key) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}

// Decryption function
function decryptData(encryptedData, key) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, key);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

// Example usage
const key = "your-secret-key"; // Replace with your secret key
const data = { id: 123, username: "example_user" };

// Encrypt data
const encryptedData = encryptData(data, key);
console.log("Encrypted Data:", encryptedData);

const expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() + 7);

Cookies.set("remember", encryptedData);
const remember = Cookies.get("remember");
console.log("remember :>> ", remember);
// Decrypt data
const decryptedData = decryptData(remember, key);
console.log("Decrypted Data:", decryptedData);
