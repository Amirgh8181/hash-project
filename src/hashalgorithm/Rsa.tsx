import React from 'react';

const RSAExample: React.FC = () => {
    const CryptoJS = require("crypto-js");

    // تولید کلید‌های عمومی و خصوصی RSA
    const RSAKeyPair = CryptoJS.lib.WordArray.random(512 / 8); // برای مثال، اندازه کلید 512 بیت است

    // متن اصلی برای رمزنگاری
    const originalText = 'Hello, World!';

    // رمزنگاری متن اصلی با استفاده از کلید عمومی
    const encrypted = CryptoJS.AES.encrypt(originalText, RSAKeyPair.toString(), {
        mode: CryptoJS.mode.ECB,
    }).toString();

    // رمزگشایی متن رمزنگاری شده با استفاده از کلید خصوصی
    const decrypted = CryptoJS.AES.decrypt(encrypted, RSAKeyPair.toString(), {
        mode: CryptoJS.mode.ECB,
    }).toString(CryptoJS.enc.Utf8);

    return (
        <div>
            <h1>rsa algorithm</h1>
            <p>Original Text:
                {originalText}</p>
            <p>Encrypted Text:
                {encrypted}</p>
            <p>Decrypted Text:
                {decrypted}</p>
        </div>
    );
};

export default RSAExample;