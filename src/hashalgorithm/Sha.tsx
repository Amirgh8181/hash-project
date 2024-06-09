import React from 'react';


const SHAExample = ({ message }: { message: string }) => {
  const CryptoJS = require("crypto-js");

  // کلید و پیام برای تولید HMAC
  const key = '12345678';


  // تولید HMAC با الگوریتم SHA256
  const hmacSHA256 = CryptoJS.HmacSHA256(message, key).toString(CryptoJS.enc.Hex);

  // تولید HMAC با الگوریتم SHA1
  const hmacSHA1 = CryptoJS.HmacSHA1(message, key).toString(CryptoJS.enc.Hex);


  const hmacSHA512 = CryptoJS.SHA512(message, key).toString(CryptoJS.enc.Hex);
  return (
    <div>
      <h2>HMAC with SHA256:</h2>
      <p>{hmacSHA256}</p>
      <h2>HMAC with SHA1:</h2>
      <p>{hmacSHA1}</p>
      <h2>HMAC with SHA512:</h2>
      <p>{hmacSHA512}</p>
    </div>
  );
};

export default SHAExample;