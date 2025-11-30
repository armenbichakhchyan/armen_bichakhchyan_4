import CryptoJS from "crypto-js";

export function hashPassword(password, secret) {
    return CryptoJS.SHA256(password + secret).toString();
}

export function encrypt(text, secret) {
    return CryptoJS.AES.encrypt(text, secret).toString();
}

export function decrypt(cipher, secret) {
    const bytes = CryptoJS.AES.decrypt(cipher, secret);
    return bytes.toString(CryptoJS.enc.Utf8);
}