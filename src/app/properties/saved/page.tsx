import PropertyCard from "@/components/PropertyCard";
import User from "../../../../models/User";
import { getSessionUser } from "../../../../utils/getSessionUser";
import { PropertyType } from "../../../../types/property";

const SavedPropertiesPage = async () => {
    const session = await getSessionUser();

    const userId = session?.userId;

    if (!userId) return null;

    const { bookmarks } = await User.findById(userId).populate("bookmarks");

    return (
        <section className="px-6 py-6">
            <div className="container lg:container m-auto px-4 py-6">
                <h1 className="text-2xl mb-4">Saved Properties</h1>
                {bookmarks.length === 0 ? (<p>No saved properties.</p>) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookmarks.map((property: PropertyType) => (
                            <PropertyCard key={property._id} property={property} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default SavedPropertiesPage;