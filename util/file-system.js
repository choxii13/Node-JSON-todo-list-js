const fs = require("fs/promises");
const path = require("path");
const filePath = path.join(__dirname, "..", "data", "data.json");

async function readFileParse() {
  const lists = await fs.readFile(filePath);
  const listsData = JSON.parse(lists);
  return listsData;
}

async function writeFile(data) {
  await fs.writeFile("./data/data.json", JSON.stringify(data));
}
module.exports = { readFileParse, writeFile };
