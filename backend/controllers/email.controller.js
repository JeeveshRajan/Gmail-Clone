import { Email } from "../models/email.model.js";

export const createEmail = async (req, res) => {
  try {
    const userId = req.id;
    const { to, subject, message } = req.body;
    if (!to || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const email = await Email.create({
      to,
      subject,
      message,
      userId,
    });

    return res.status(201).json({
      email,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmail = async (req, res) => {
  try {
    const emailId = req.params.id;
    if (!emailId) {
      return res.status(400).json({
        message: "Email id is required to delete this email.",
        success: false,
      });
    }

    const email = await Email.findByIdAndDelete(emailId);

    if (!email) {
      return res.status(404).json({
        message: "Email not found to delete",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Email deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllEmail = async (req, res) => {
  try {
    const userId = req.id;
    const emails = await Email.find({ userId });

    return res.status(200).json({
      emails,
    });
  } catch (error) {
    console.log(error);
  }
};
