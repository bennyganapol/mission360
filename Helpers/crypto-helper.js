import crypto from 'crypto';

const key = 'my secret key123';

export default function HashString(stringToHash) {
  const hash = crypto.createHmac('sha512', key);
  hash.update(stringToHash);
  const value = hash.digest('hex');
  return value;
}
