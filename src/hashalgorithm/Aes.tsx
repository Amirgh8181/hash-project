import React from 'react';


const AESExample: React.FC = () => {
    // کلید و بردار اولیه برای رمزنگاری و رمزگشایی
    const key = '12345678901234567890123456789012';
    const iv = '1234567890123456';
    const CryptoJS = require("crypto-js");
    // تابع برای رمزنگاری متن
    const encryptText = (plainText: string): string => {
        const cipherText = CryptoJS.AES.encrypt(plainText, key, { iv: iv }).toString();
        return cipherText;
    };

    // تابع برای رمزگشایی متن رمزنگاری شده
    const decryptText = (cipherText: string): string => {
        const bytes = CryptoJS.AES.decrypt(cipherText, key, { iv: iv });
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedText;
    };

    // متن اصلی برای رمزنگاری و رمزگشایی
    const originalText = 'Hello, World!';

    // رمزنگاری متن
    const encryptedText = encryptText(originalText);

    // رمزگشایی متن رمزنگاری شده
    const decryptedText = decryptText(encryptedText);

    return (
        <div>
            <h1>AES algorithm</h1>
            <p>Original Text: {originalText}</p>
            <p>Encrypted Text: {encryptedText}</p>
            <p>Decrypted Text: {decryptedText}</p>
        </div>
    );
};

export default AESExample;