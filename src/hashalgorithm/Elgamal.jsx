import React from "react";
import ElGamal from "elgamal";

const ElgamalShow = async ({message}) => {
  console.log(message);
  const eg = await ElGamal.generateAsync();
  const secret = message;
  const encrypted = await eg.encryptAsync(secret);
  const decrypted = await eg.decryptAsync(encrypted);
  console.log(encrypted);
  console.log(decrypted.toString());
  console.log(decrypted.toString() === secret); // true
  return (
    <div className="max-w-full">
      <h1>Elgamal</h1>
      <p>encrypt</p>
      <p className="w-[80%]">{JSON.stringify(encrypted)}</p>
      <p>decrypt</p>
      <p>{decrypted.toString()}</p>
    </div>
  );
};

export default ElgamalShow;
