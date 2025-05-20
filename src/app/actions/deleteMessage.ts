"use server";

import connectDB from "../../../config/database";
import Message from "../../../models/Message";

import {getSessionUser} from "../../../utils/getSessionUser";
import {revalidatePath} from "next/cache";

const deleteMessage = async (messageId: string) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) throw new Error("User not found.");

    const {userId} = sessionUser;

    const message = await Message.findById(messageId);

    // Verify ownership
    if (message.recipient.toString() !== userId)
      throw new Error("Not authorized to delete this message.");

    // Delete owner message
    await message.deleteOne();

    revalidatePath("/", "layout");
  } catch (error) {
    console.error("Error deleting property:", error);
  }
};

export default deleteMessage;
