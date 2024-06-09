import React from 'react';

const DESExample = ({ message }: { message: string }) => {
    const CryptoJS = require("crypto-js");

    // کلید برای رمزنگاری و رمزگشایی
    const key = '12345678';

    // تابع برای رمزنگاری متن
    const encryptText = (plainText: string): string => {
        const cipherText = CryptoJS.DES.encrypt(plainText, key).toString();
        return cipherText;
    };

    // تابع برای رمزگشایی متن رمزنگاری شده
    const decryptText = (cipherText: string): string => {
        const bytes = CryptoJS.DES.decrypt(cipherText, key);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedText;
    };

    // متن اصلی برای رمزنگاری و رمزگشایی
    const originalText = message;

    // رمزنگاری متن
    const encryptedText = encryptText(originalText);

    // رمزگشایی متن رمزنگاری شده
    const decryptedText = decryptText(encryptedText);

    return (
        <div>
            <h1>des algorithm</h1>
            <p>Original Text: {originalText}</p>
            <p>Encrypted Text: {encryptedText}</p>
            <p>Decrypted Text: {decryptedText}</p>
        </div>
    );
};

export default DESExample;
