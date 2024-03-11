const List = require("../model/todo-list-model.js");

function getHome(req, res) {
  res.render("todo-list");
}

async function getLists(req, res) {
  const lists = await List.fetchAll();
  res.json(lists);
}

async function postList(req, res) {
  const lists = new List(req.body);
  await lists.post();
  res.status(200).json({ message: "data saved" });
}

async function deleteList(req, res) {
  const lists = new List(req.body);
  await lists.delete();
  res.status(200).json({ message: "data deleted" });
}

async function updateList(req, res) {
  const lists = new List(req.body);
  await lists.update();
  res.json({ message: "message updated" });
}

module.exports = { getHome, getLists, postList, deleteList, updateList };
