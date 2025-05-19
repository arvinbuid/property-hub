"use server";

import connectDB from "../../../config/database";
import Message from "../../../models/Message";

import {getSessionUser} from "../../../utils/getSessionUser";

const addMessage = async (formData: FormData) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      throw new Error("User not found.");
    }

    const {userId} = sessionUser;

    const recipient = formData.get("recipient");

    if (userId === recipient) throw new Error("You cannot send a message to yourself.");

    const newMessage = new Message({
      sender: userId,
      recipient,
      property: formData.get("property"),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      body: formData.get("body"),
    });

    await newMessage.save();

    return {
      submitted: true,
      message: "Message sent successfully.",
    };
  } catch (error) {
    return {
      submitted: false,
      message: `Error sending message: ${error}`,
    };
  }
};

export default addMessage;
