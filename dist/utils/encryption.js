"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function encrypt(text, key) {
    let encrypted = '';
    for (let i = 0; i < text.length; i++) {
        const keyChar = key.charCodeAt(i % key.length);
        const textChar = text.charCodeAt(i);
        encrypted += String.fromCharCode(textChar ^ keyChar); // XOR operation
    }
    return Buffer.from(encrypted, 'utf8').toString('base64');
}
function decrypt(base64, key) {
    const encrypted = Buffer.from(base64, 'base64').toString('utf8');
    let decrypted = '';
    for (let i = 0; i < encrypted.length; i++) {
        const keyChar = key.charCodeAt(i % key.length);
        const encChar = encrypted.charCodeAt(i);
        decrypted += String.fromCharCode(encChar ^ keyChar); // Same XOR to decrypt
    }
    return decrypted;
}
exports.default = {
    encrypt,
    decrypt
};
