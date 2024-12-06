const cloudinary = require("cloudinary").v2;
const User = require("./../models/userModel");
const validator = require("validator");


exports.addUser = async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      const newUser = await User.create({
        name,
        email,
      });

      return res.status(200).json({
        status: "success",
        data: {
          newUser,
        },
      });
    }
    res.json({
      message: "user exist",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "fail", message: "something went wrong" });
  }
};

exports.addImageOrVideo = async (req, res) => {
  try {
    const { imageOrVideo, email } = req.body;

    console.log(imageOrVideo, email);

    if (!validator.isURL(imageOrVideo)) {
      return res.status(400).json({
        message: "Invalid Image URL",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.imagesOrVideos.push(imageOrVideo);
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Image added successfully !",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: "something went wrong",
    });
  }
};

exports.getImagesOrVideos = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(200).json({
        status: "success",
        imagesOrVideos: user.imagesOrVideos,
      });
    }

    res.status(404).json({
      status: "fail",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

exports.deleteImageOrVideo = async (req, res) => {
  try {
    const { email, imageURL } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.imagesOrVideos = user.imagesOrVideos.filter(
      (imageOrVideo) => imageOrVideo !== imageURL
    );
    await user.save();

    return res
      .status(200)
      .json({ status: "success", message: "Image Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};

exports.imageCount = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json({
        status: "success",
        count: user.images.length,
      });
    }

    res.status(404).json({
      status: "fail",
      message: "User not found !",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong!",
    });
  }
};
