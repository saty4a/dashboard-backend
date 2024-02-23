import { emailFormatChecker } from "../helperFunctions/checker";
import { emailModel } from "../models/emailModel";
import { imageModel } from "../models/imageModel";
import { textModel } from "../models/textModel";


export const config = {
  api: {
    bodyParser: false
  }
};

export const uploadImageDetails = async (req, res, filesUrl) => {
    try {
        const place = await imageModel.findOne({ place: "navbar" });
        if (place === null) {
          const placeImage = await new imageModel({
            place: "navbar",
            imageUrl: filesUrl,
          }).save();
          if (placeImage?._id) {
            return res.status(200).json({
              data: null,
              message: "logo has uploaded set succesfully",
              success: true,
            });
          } else {
            throw new Error("Failed to add");
          }
        } else {
          const responseAfterUpdate = await imageModel.findOneAndUpdate(
            {
              place: "navbar",
            },
            {
              $set: {
                place: "navbar",
                imageUrl: filesUrl,
              },
            },
            { new: true }
          );
          if (responseAfterUpdate?._id) {
            return res.status(200).json({
              data: null,
              message: "logo updated successfully",
              success: true,
            });
          }
          res.status(400);
          throw new Error("Failed to update details.");
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
  };

export const getImageDetails = async (req, res) => {
  try {
    const imageData = await imageModel.findOne({ place: "navbar" });
    if (imageData === null) {
      res.status(400);
      throw new Error("no images found");
    }
    res.status(200).json({
      imageData: imageData,
      message: "logo updated successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
  };

export const addNewText = async (req, res) => {
    try {
        const place = await textModel.findOne({ place: req.body.place });
        if (place === null) {
          const newText = await new textModel({
            place: req.body.place,
            text: req.body.newText,
          }).save();
          if (newText?._id) {
            return res.status(200).json({
              data: null,
              message: "text has been change succesfully",
              success: true,
            });
          } else {
            throw new Error("Failed to text");
          }
        } else {
          const responseAfterUpdate = await textModel.findOneAndUpdate(
            {
              place: req.body.place,
            },
            {
              $set: {
                place: req.body.place,
                text: req.body.newText,
              },
            },
            { new: true }
          );
          if (responseAfterUpdate?._id) {
            return res.status(200).json({
              data: null,
              message: "text updated successfully",
              success: true,
            });
          }
          res.status(400).json({
            textData: textData,
            message: "Failed to update text.",
            success: false,
          });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
  };

export const getText = async (req, res) => {
  try {
    const textData = await textModel.findOne({ place: "header" });
    if (textData === null) {
      res.status(400).json({
        textData: textData,
        message: "no text found",
        success: false,
      });
    }
    res.status(200).json({
      textData: textData,
      message: "text updated successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
  };

export const uploadEmail = async (req, res) => {
    try {
        if (!emailFormatChecker(req.body.email)) {
          return res.status(500).json({
            data: null,
            message: "Invalid email address",
            success: false,
          });
        }
        const data = await emailModel.findOne({ email: req.body.email });
        if (data === null) {
          const newEmail = await new emailModel({
            email: req.body.email,
          }).save();
          if (newEmail?._id) {
            return res.status(200).json({
              data: null,
              message: "subscribe succesfully",
              success: true,
            });
          } else {
            throw new Error("Failed to subscribe");
          }
        } else {
          return res.status(200).json({
            data: null,
            message: "already subscribed",
            success: true,
          });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
  };

export const getAllEmail = async (req, res) => {
    try {
        const data = await emailModel.find();
        if (!data) {
          res.status(400).json({
            data: null,
            message: "no emails",
            success: false,
          });
        }
        res.status(200).json({
          emails: data,
          message: "all emails",
          success: true,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
}
export const deleteEmail = async (req, res, emailId) => {
    try {
        const responseAfterItemDeletion = await emailModel.findByIdAndDelete(emailId);
        if (responseAfterItemDeletion?.id) {
          res.status(200).json({
            data: responseAfterItemDeletion,
            message: "Item deleted successfully.",
            success: true,
          });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
}