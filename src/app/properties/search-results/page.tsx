import Property from "../../../../models/Property";

import { FilterQuery } from "mongoose";
import { convertToSerializableObject } from "../../../../utils/convertToObject";
import { PropertyType } from "../../../../types/property";

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
        <div>Search Result</div>
    );
}

export default PropertySearchResult;