"use server";

import {revalidatePath} from "next/cache";
import connectDB from "../../../config/database";
import Message from "../../../models/Message";

import {getSessionUser} from "../../../utils/getSessionUser";

const markMessageAsRead = async (messageId: string) => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) throw new Error("User not found.");

  const {userId} = sessionUser;

  const message = await Message.findById(messageId);

  if (!message) throw new Error("Message not found.");

  // Verify ownership
  if (message.recipient.toString() !== userId)
    throw new Error("Current user does not own this message.");

  message.read = !message.read;
  await message.save();

  revalidatePath("/messages", "page");

  return message.read;
};

export default markMessageAsRead;
