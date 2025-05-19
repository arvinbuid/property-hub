import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import connectDB from "../../../../config/database";
import Property from "../../../../models/Property";

import Link from "next/link";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";

import { PropertyType } from "../../../../types/property";
import { FaArrowLeft } from "react-icons/fa";
import { convertToSerializableObject } from "../../../../utils/convertToObject";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";

const PropertyPage = async (props: {
    params: Promise<{
        id: string;
    }>
}) => {
    const { id } = await props.params;
    await connectDB();

    const propertyDoc = await Property.findById(id).lean<PropertyType>();

    if (!propertyDoc) return <p className="text-xl text-red-500 pt-6 pl-4">Property not found.</p>

    const property = convertToSerializableObject(propertyDoc) as PropertyType;

    const bookmarkStatus = await checkBookmarkStatus(property._id);

    // Check if property is bookmarked and pass it as a prop
    const isBookmarked = 'isBookmarked' in bookmarkStatus ? bookmarkStatus.isBookmarked : false;

    return (
        <>
            <PropertyHeaderImage image={property.images[0]} name={property.name} />
            {/* Go back */}
            <section>
                <div className="container m-auto py-6 px-6">
                    <Link
                        href="/properties"
                        className="text-blue-500 hover:text-blue-600 flex items-center"
                    >
                        <FaArrowLeft className="mr-2" /> Back to Properties
                    </Link>
                </div>
            </section>

            {/* Property Info */}
            <section className="bg-blue-50">
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-70/30 w-full gap-6">
                        <PropertyDetails property={property} />
                        <aside className="space-y-4">
                            <BookmarkButton property={property} initialIsBookmarked={isBookmarked} />
                            <ShareButtons property={property} />
                            <PropertyContactForm property={property} />
                        </aside>
                    </div>
                </div>
            </section>

            <PropertyImages images={property.images} />
        </>
    )
}

export default PropertyPage