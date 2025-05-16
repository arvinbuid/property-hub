"use server";

import connectDB from "../../../config/database";
import Property from "../../../models/Property";
import cloudinary from "../../../config/cloudinary";

import {getSessionUser} from "../../../utils/getSessionUser";
import {revalidatePath} from "next/cache";

const deleteProperty = async (propertyId: string) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) throw new Error("User not found.");

    const {userId} = sessionUser;

    const property = await Property.findById(propertyId);

    if (!property) throw new Error("Property not found.");

    if (property.owner.toString() !== userId)
      throw new Error("Not authorized to delete this property.");

    // Extract public ids from cloudinary image URLs
    const publicIds = property.images.map((imageUrl: string) => {
      const parts = imageUrl.split("/");
      return parts.at(-1)!.split(".").at(0)!;
    });

    if (publicIds.length > 0) {
      for (const publicId of publicIds) {
        await cloudinary.uploader.destroy(`property-hub/${publicId}`); // PublicID structure from cloudinary is property-hub/id
      }
    }

    // Delete owner property
    await property.deleteOne();

    revalidatePath("/", "layout");
  } catch (error) {
    console.error("Error deleting property:", error);
  }
};

export default deleteProperty;
