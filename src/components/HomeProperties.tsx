import PropertyCard from "@/components/PropertyCard";
import properties from "../../properties.json"
import Link from "next/link";

const HomeProperties = () => {
    const recentProperties = properties.slice(0, 3);

    return (
        <>
            <section className="px-4 py-6">
                <div className="container-xl lg:container mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold text-blue-500 text-center mb-10 ">Recent Properties</h1>
                    {properties.length === 0 ? (<p>No properties found😔</p>) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recentProperties.map((property) => (
                                <PropertyCard key={property._id} property={property} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="m-auto max-w-sm my-6 px-6">
                <Link href='/properties' className="block text-white bg-black rounded-xl py-4 px-6 text-center hover:bg-gray-700"> View All Properties</Link>
            </section>
        </>
    )
}

export default HomeProperties