const express = require("express");
const router = express.Router();
const todoListController = require("../controller/todo-list-controller");

router.get("/", todoListController.getHome);

router.get("/lists", todoListController.getLists);

router.post("/post", todoListController.postList);

router.delete("/delete", todoListController.deleteList);

router.post("/update", todoListController.updateList);

module.exports = router;
