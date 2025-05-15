"use server";

import connectDB from "../../../config/database";
import Property from "../../../models/Property";
import cloudinary from "../../../config/cloudinary";

import {getSessionUser} from "../../../utils/getSessionUser";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export const addProperty = async (formData: FormData) => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User not found.");
  }

  const {userId} = sessionUser;

  // Access the values of amenities and images from the form
  const amenities = formData.getAll("amenities");

  // Filter out empty image value
  const images = formData
    .getAll("images")
    .filter((image): image is File => image instanceof File && image.name !== "");

  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities,
    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
    images: [] as string[],
  };

  const imageUrls = [];

  // Loop through images
  for (const image of images) {
    const imageBuffer = await image.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    // Convert to base64
    const imageBase64 = imageData.toString("base64");

    // Make request to cloudinary
    const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${imageBase64}`, {
      folder: "property-hub",
    });

    imageUrls.push(result.secure_url);
  }

  // Add imageUrls to image property of propertyData
  propertyData.images = imageUrls;

  // Create a new Property instance and save it to the database
  const newProperty = new Property(propertyData);
  await newProperty.save();

  revalidatePath("/", "layout");
  redirect(`/properties/${newProperty._id}`);
};
