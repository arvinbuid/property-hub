"use server";

import connectDB from "../../../config/database";
import Message from "../../../models/Message";

import {getSessionUser} from "../../../utils/getSessionUser";

const getUnreadMessageCount = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) throw new Error("User not found.");

  const {userId} = sessionUser;

  const messageCount = await Message.countDocuments({
    recipient: userId,
    read: false,
  });

  return messageCount;
};

export default getUnreadMessageCount;
