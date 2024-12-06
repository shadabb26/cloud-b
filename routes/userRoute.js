const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router
  .post("/user", userController.addUser)
  .post("/image", userController.addImageOrVideo)
  .post("/count", userController.imageCount)
  .post("/images", userController.getImagesOrVideos);

router.delete("/delete", userController.deleteImageOrVideo);

module.exports = router;
