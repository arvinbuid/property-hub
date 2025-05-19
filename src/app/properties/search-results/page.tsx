import Property from "../../../../models/Property";

import { FilterQuery } from "mongoose";
import { convertToSerializableObject } from "../../../../utils/convertToObject";
import { PropertyType } from "../../../../types/property";
import PropertySearchForm from "@/components/PropertySearchForm";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import PropertyCard from "@/components/PropertyCard";

const PropertySearchResult = async (props: {
    searchParams: Promise<{
        location: string,
        propertyType: string
    }>
}) => {
    const { location, propertyType } = await props.searchParams;

    const locationPattern = new RegExp(location, 'i'); // case insensitive

    // Use $or to match a certain field in the pattern
    const query: FilterQuery<PropertyType> = {
        $or: [
            { name: locationPattern },
            { description: locationPattern },
            { 'location.street': locationPattern },
            { 'location.city': locationPattern },
            { 'location.state': locationPattern },
            { 'location.zipcode': locationPattern },
        ]
    }

    // Check if there is a property type and if the property type is not "All"
    if (propertyType && propertyType !== "All") {
        const propertyTypePattern = new RegExp(propertyType, 'i');
        query.type = propertyTypePattern;
    }

    const queryResults = await Property.find(query).lean<PropertyType[]>();
    const properties = convertToSerializableObject(queryResults);

    return (
        <>
            <section className="bg-blue-700 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start">
                    <PropertySearchForm />
                </div>
            </section>
            <section className="px-4 py-6">
                <div className="container xl lg:container mx-auto px-4 py-6">
                    <Link href='/properties' className="flex items-center underline-offset-4 text-blue-500 hover:underline hover:cursor-pointer mb-8">
                        <FaArrowAltCircleLeft className="mr-2 mb-1" />Back to Properties
                    </Link>
                    <h1 className="text-xl mb-4 font-bold">Search Results:</h1>
                    {properties.length === 0 ? (<p className="text-lg">No search results found😔</p>) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {properties.map((property: PropertyType) => (
                                <PropertyCard key={property._id} property={property} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default PropertySearchResult;