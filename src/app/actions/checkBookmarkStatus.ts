"use server";

import connectDB from "../../../config/database";
import User from "../../../models/User";

import {getSessionUser} from "../../../utils/getSessionUser";

const checkBookmarkStatus = async (propertyId: string) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      throw new Error("User not found.");
    }

    const {userId} = sessionUser;

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found.");

    const isBookmarked = user.bookmarks.includes(propertyId);

    return {isBookmarked};
  } catch (error) {
    return {
      error: `Error checking bookmark status. ${error}`,
    };
  }
};

export default checkBookmarkStatus;
