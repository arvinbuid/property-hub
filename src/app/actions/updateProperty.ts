"use server";

import connectDB from "../../../config/database";
import Property from "../../../models/Property";

import {revalidatePath} from "next/cache";
import {getSessionUser} from "../../../utils/getSessionUser";

export type State = {
  success: boolean;
  message: string;
  redirect?: string;
};

const updateProperty = async (prevState: State, formData: FormData): Promise<State> => {
  try {
    await connectDB();

    const propertyId = formData.get("propertyId") as string;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      throw new Error("User not found.");
    }

    const {userId} = sessionUser;

    const existingProperty = await Property.findById(propertyId);

    if (!existingProperty) throw new Error("Property not found.");

    // Verify the property ownership
    if (existingProperty.owner.toString() !== userId)
      throw new Error("Current user does not own this property.");

    const amenities = formData.getAll("amenities");

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
    };

    await Property.findByIdAndUpdate(propertyId, propertyData, {new: true});

    revalidatePath("/", "layout");

    return {
      success: true,
      message: "Property updated successfully.",
      redirect: "/profile",
    };
  } catch (error) {
    return {
      success: false,
      message: `Error updating property: ${error}`,
    };
  }
};

export default updateProperty;
