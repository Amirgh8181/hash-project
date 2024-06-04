"use client"
import React, { useState } from 'react';

// Define types for keys and messages
type PublicKey = {
  p: number;
  g: number;
  h: number;
};

type EncryptedMessage = {
  b: number;
  c: number;
};

// Helper functions
const extendedEuclid = (a: number, b: number): { x: number; y: number; d: number } => {
  let u1 = 1, u2 = 0, u3 = a;
  let v1 = 0, v2 = 1, v3 = b;
  let q, t1, t2, t3;

  while (v3 !== 0) {
    q = Math.floor(u3 / v3);
    t1 = u1 - q * v1;
    t2 = u2 - q * v2;
    t3 = u3 - q * v3;
    u1 = v1; u2 = v2; u3 = v3;
    v1 = t1; v2 = t2; v3 = t3;
  }
  return { x: u1, y: u2, d: u3 };
};

const powmod = (base: number, exp: number, modulus: number): number => {
  let accum = 1, i = 0, basepow2 = base;
  if (exp === -1) {
    return extendedEuclid(base, modulus).x;
  }
  while ((exp >> i) > 0) {
    if (((exp >> i) & 1) === 1) {
      accum = (accum * basepow2) % modulus;
    }
    basepow2 = (basepow2 * basepow2) % modulus;
    i += 1;
  }
  return accum;
};

// Validation functions
const isPrime = (p: number): boolean => {
  // Add a simple prime check function or use a library for more robust checks
  if (p <= 1) return false;
  if (p <= 3) return true;
  if (p % 2 === 0 || p % 3 === 0) return false;
  for (let i = 5; i * i <= p; i += 6) {
    if (p % i === 0 || p % (i + 2) === 0) return false;
  }
  return true;
};

const isPrimitiveRoot = (g: number, p: number): boolean => {
  const o = new Set<number>();
  for (let i = 1; i < p; i++) {
    o.add(powmod(g, i, p));
  }
  return o.size === p - 1;
};

const isValidPrivate = (x: number, p: number): boolean => x > 0 && x < (p - 1);
const isValidEncryptKey = (y: number, p: number): boolean => y >= 0 && y < (p - 1);
const isValidMessage = (m: number, p: number): boolean => m > 0 && m < p;

const validatePublicKeyFields = (g: number, x: number, p: number): string[] => {
  const errors: string[] = [];
  if (!isPrime(p)) {
    errors.push('NOT_PRIME');
  }
  if (!isPrimitiveRoot(g, p)) {
    errors.push('NOT_ROOT');
  }
  if (!isValidPrivate(x, p)) {
    errors.push('INVALID_KEY');
  }
  return errors;
};

const validateEncryptFields = (m: number, y: number, p: number): string[] => {
  const errors: string[] = [];
  if (!isValidEncryptKey(y, p)) {
    errors.push('INVALID_ENC_KEY');
  }
  if (!isValidMessage(m, p)) {
    errors.push('INVALID_MSG');
  }
  return errors;
};

// Main component
const ElGamal: React.FC = () => {
  const [p, setP] = useState<number>(23);
  const [g, setG] = useState<number>(5);
  const [x, setX] = useState<number>(6);
  const [message, setMessage] = useState<number>(10);
  const [encryptionKey, setEncryptionKey] = useState<number>(15);
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [encryptedMessage, setEncryptedMessage] = useState<EncryptedMessage | null>(null);
  const [decryptedMessage, setDecryptedMessage] = useState<number | null>(null);

  const generatePublicKey = () => {
    const errors = validatePublicKeyFields(g, x, p);
    if (errors.length > 0) {
      alert(errors.join(', '));
      return;
    }
    const h = powmod(g, x, p);
    setPublicKey({ p, g, h });
  };

  const encryptMessage = () => {
    if (!publicKey) {
      alert('Generate public key first');
      return;
    }
    const errors = validateEncryptFields(message, encryptionKey, publicKey.p);
    if (errors.length > 0) {
      alert(errors.join(', '));
      return;
    }
    const b = powmod(publicKey.g, encryptionKey, publicKey.p);
    const c = (message * powmod(publicKey.h, encryptionKey, publicKey.p)) % publicKey.p;
    setEncryptedMessage({ b, c });
  };

  const decryptMessage = () => {
    if (!encryptedMessage) {
      alert('Encrypt a message first');
      return;
    }
    const ay = powmod(encryptedMessage.b, x, p);
    let s = (powmod(ay, -1, p) * encryptedMessage.c) % p;
    s = s < 0 ? s + p : s;
    setDecryptedMessage(s);
  };

  return (
    <div>
      <h1>ElGamal Encryption</h1>
      <div>
        <label>Prime (p): </label>
        <input type="number" value={p} onChange={(e) => setP(parseInt(e.target.value))} />
      </div>
      <div>
        <label>Generator (g): </label>
        <input type="number" value={g} onChange={(e) => setG(parseInt(e.target.value))} />
      </div>
      <div>
        <label>Private Key (x): </label>
        <input type="number" value={x} onChange={(e) => setX(parseInt(e.target.value))} />
      </div>
      <button onClick={generatePublicKey}>Generate Public Key</button>
      {publicKey && (
        <div>
          <h2>Public Key</h2>
          <p>p: {publicKey.p}</p>
          <p>g: {publicKey.g}</p>
          <p>h: {publicKey.h}</p>
        </div>
      )}
      <div>
        <label>Message: </label>
        <input type="number" value={message} onChange={(e) => setMessage(parseInt(e.target.value))} />
      </div>
      <div>
        <label>Encryption Key: </label>
        <input type="number" value={encryptionKey} onChange={(e) => setEncryptionKey(parseInt(e.target.value))} />
      </div>
      <button onClick={encryptMessage}>Encrypt Message</button>
      {encryptedMessage && (
        <div>
          <h2>Encrypted Message</h2>
          <p>b: {encryptedMessage.b}</p>
          <p>c: {encryptedMessage.c}</p>
        </div>
      )}
      <button onClick={decryptMessage}>Decrypt Message</button>
      {decryptedMessage !== null && (
        <div>
          <h2>Decrypted Message</h2>
          <p>{decryptedMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ElGamal;
