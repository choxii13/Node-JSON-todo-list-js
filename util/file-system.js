const fs = require("fs/promises");
const path = require("path");
const filePath = path.join(__dirname, "..", "data", "data.json");

async function readFileParse() {
  const lists = await fs.readFile(filePath);
  const listsData = JSON.parse(lists);
  return listsData;
}

async function writeFile(lists) {
  await fs.writeFile("./data/data.json", JSON.stringify(lists));
  return lists;
}
module.exports = { readFileParse, writeFile };
