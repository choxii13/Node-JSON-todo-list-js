const express = require("express");
const router = express.Router();
const { readFileParse, writeFile } = require("../util/file-system.js");

router.get("/", async function (req, res) {
  res.render("todo-list");
});

router.get("/lists", async function (req, res) {
  const lists = await readFileParse();
  console.log(lists);
  res.json(lists);
});

router.post("/post", async function (req, res) {
  const list = req.body;
  const listsData = await readFileParse();
  listsData.push(list);
  await writeFile(listsData);
  res.status(200).json({ message: "data saved" });
});

router.delete("/delete", async function (req, res) {
  const list = req.body;
  const listsData = await readFileParse();
  const newData = listsData.filter((lists, index) => {
    return index !== list.index;
  });
  await writeFile(newData);
  res.status(200).json({ message: "data deleted" });
});

router.post("/patches", async function (req, res) {
  console.log(req.body);
  const list = req.body;
  const listsData = await readFileParse();
  listsData.map(async function (listData, index) {
    if (index === list.index) {
      listsData[index].name = list.name;
      console.log(listsData);
      await writeFile(listsData);
    }
  });
  res.json({ message: "message updated" });
});
module.exports = router;
