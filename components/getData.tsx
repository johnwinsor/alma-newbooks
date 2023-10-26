import { promises as fs } from 'fs';

export default async function Page() {
  const file = await fs.readFile(process.cwd() + '../data.json', 'utf8');
  const books = JSON.parse(file);

  return books
}