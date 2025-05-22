import PropertyCard from "@/components/PropertyCard";
import connectDB from "../../../config/database";
import Property from "../../../models/Property";
import Pagination from "@/components/Pagination";

const PropertiesPage = async (props: {
    searchParams: Promise<{
        page: number,
        pageSize: number
    }>
}) => {
    const { page = 1, pageSize = 9 } = await props.searchParams;
    await connectDB();

    const skip = (page - 1) * pageSize;
    const total = await Property.countDocuments({});

    const properties = await Property.find({}).skip(skip).limit(pageSize);

    const showPagination = total > pageSize;

    return (
        <section className="px-4 py-6">
            <div className="container-xl lg:container mx-auto px-4 py-6">
                {properties.length === 0 ? (<p>No properties found😔</p>) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {properties.map((property) => (
                            <PropertyCard key={property._id} property={property} />
                        ))}
                    </div>
                )}
            </div>
            {showPagination && (
                <Pagination page={Number(page)} pageSize={Number(pageSize)} totalItems={Number(total)} />
            )}
        </section>
    )
}

export default PropertiesPage