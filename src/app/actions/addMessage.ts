"use server";

import connectDB from "../../../config/database";
import Message from "../../../models/Message";

import {getSessionUser} from "../../../utils/getSessionUser";

export type State = {
  submitted: boolean;
  error: string;
};

const addMessage = async (prevState: State, formData: FormData): Promise<State> => {
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
      sender: userId, // current logged in user
      recipient, // owner of the property
      property: formData.get("property"),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      body: formData.get("body"),
    });

    await newMessage.save();

    return {
      submitted: true,
      error: "",
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown error occurred.";

    return {
      submitted: false,
      error: message,
    };
  }
};

export default addMessage;
