import fs from 'fs';
import path from 'path';

export function loadTestUsers() {
  const userPath = path.resolve(__dirname, '../.auth/testUsers-user.json');
  const rawData = fs.readFileSync(userPath, 'utf-8');
  return JSON.parse(rawData);
}

// export function loadTestUser2() {
//   const userPath = path.resolve(__dirname, '../.auth/testUser2-user.json');
//   const rawData = fs.readFileSync(userPath, 'utf-8');
//   return JSON.parse(rawData);
// }