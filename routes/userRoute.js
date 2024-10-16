const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router
  .post("/user", userController.addUser)
  .post("/image", userController.addImage)
  .post("/count", userController.imageCount)
  .post("/images", userController.getImages);

router.delete("/delete", userController.deleteImage);

module.exports = router;
