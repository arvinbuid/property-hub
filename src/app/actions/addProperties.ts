"use server";

export const addProperty = async (formData: FormData) => {
  try {
    // Access the values of amenities and images from the form
    const amenities = formData.getAll("amenities");

    // Filter out empty image value
    const images = formData
      .getAll("images")
      .filter((image): image is File => image instanceof File && image.name !== "")
      .map((image) => image.name);

    const propertyData = {
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
      images,
    };
  } catch (error) {
    console.error(error);
  }
};
