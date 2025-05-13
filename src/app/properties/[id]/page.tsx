import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import connectDB from "../../../../config/database";
import Property from "../../../../models/Property";

import { PropertyType } from "../../../../types/property";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyDetails from "@/components/PropertyDetails";

const PropertyPage = async (props: {
    params: Promise<{
        id: string;
    }>
}) => {
    const { id } = await props.params;
    await connectDB();
    const property = await Property.findById(id).lean<PropertyType>();

    if (!property) return <p className="text-xl text-red-500 pt-6 pl-4">Property not found.</p>

    return (
        <>
            <PropertyHeaderImage image={property.images[0]} name={property.name} />
            {/* Go back */}
            <section>
                <div className="container m-auto py-6 px-6">
                    <Link
                        href="/"
                        className="text-blue-500 hover:text-blue-600 flex items-center"
                    >
                        <FaArrowLeft className="mr-2" /> Back to Properties
                    </Link>
                </div>
            </section>

            {/* Property Info */}
            <section className="bg-blue-50">
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                        <PropertyDetails property={property} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default PropertyPage