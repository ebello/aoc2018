export default async function readFile(file) {
  const resp = await fetch(file);
  return resp.text();
}