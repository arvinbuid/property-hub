"use server";

import connectDB from "../../../config/database";
import User from "../../../models/User";

import {getSessionUser} from "../../../utils/getSessionUser";
import {revalidatePath} from "next/cache";

export const bookmarkProperty = async (propertyId: string) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      throw new Error("User not found.");
    }

    const {userId} = sessionUser;

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found.");

    let isBookmarked = user.bookmarks.includes(propertyId);

    let message;

    if (isBookmarked) {
      // If already bookmarked, remove
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed.";
      isBookmarked = false;
    } else {
      // If not bookmarked, add
      user.bookmarks.push(propertyId);
      message = "Bookmark added.";
      isBookmarked = true;
    }

    await user.save();
    revalidatePath("/properties/saved", "page");

    return {
      isBookmarked,
      message,
    };
  } catch (error) {
    return {
      error: `Error bookmarking property: ${error}`,
    };
  }
};
