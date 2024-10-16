const cloudinary = require("cloudinary").v2;
const User = require("./../models/userModel");
const validator = require("validator");

cloudinary.config({
  cloud_name: "dj37vywde",
  api_key: "388516618234788",
  api_secret: "18YwXh4vq8K8xazeTsf16rk62cE",
});

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

exports.addImage = async (req, res) => {
  try {
    const { image, email } = req.body;

    if (!validator.isURL(image)) {
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

    user.images.push(image);
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Image added successfully !",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "something went wrong",
    });
  }
};

exports.getImages = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(200).json({
        status: "success",
        images: user.images,
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

exports.deleteImage = async (req, res) => {
  try {
    const { email, imageURL } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.images = user.images.filter((image) => image !== imageURL);
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
