import PropertyEditForm from "@/components/PropertyEditForm";
import connectDB from "../../../../../config/database";
import Property from "../../../../../models/Property";
import { PropertyType } from "../../../../../types/property";

import { convertToSerializableObject } from "../../../../../utils/convertToObject";

const EditProperty = async (props: {
    params: Promise<{
        id: string
    }>
}) => {
    const { id } = await props.params;
    await connectDB();

    const propertyDoc = await Property.findById(id).lean<PropertyType>();

    if (!propertyDoc) return <p className="text-xl text-red-500 pt-6 pl-4">Property not found.</p>

    const property = convertToSerializableObject(propertyDoc) as PropertyType;

    return (
        <section className="bg-blue-50">
            <div className="container m-auto max-w-lg md:max-w-2xl py-24">
                <div className="bg-white px-10 py-12 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <PropertyEditForm property={property} />
                </div>
            </div>
        </section>
    );
}

export default EditProperty;