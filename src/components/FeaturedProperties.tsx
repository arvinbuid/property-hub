import connectDB from "../../config/database";
import Property from "../../models/Property";
import { PropertyType } from "../../types/property";
import FeaturedPropertyCard from "./FeaturedPropertyCard";

const FeaturedProperties = async () => {
    await connectDB();

    const properties = await Property.find({
        is_featured: true
    }).lean<PropertyType[]>();

    return (
        <section className="bg-blue-50 mt-4 md:mt-10 px-4 pt-6 pb-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
                    Featured Properties
                </h2>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {properties.map((property) => (
                        <FeaturedPropertyCard key={property._id} property={property} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturedProperties;