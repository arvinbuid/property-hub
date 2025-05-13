import { FaCheck, FaTimes, FaBed, FaBath, FaRulerCombined, FaMapMarker } from "react-icons/fa";
import { PropertyType } from "../../types/property";

interface PropertyDetailsProps {
    property: PropertyType;
}

const PropertyDetails = ({ property }: PropertyDetailsProps) => {
    const { name, type, description, location, beds, baths, square_feet, amenities, rates } = property;
    const { street, city, state, zipcode } = location;
    const { nightly, weekly, monthly } = rates;

    return (
        <main>
            <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{type}</div>
                <h1 className="text-3xl font-bold mb-4">{name}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                    <FaMapMarker className="text-md text-orange-700 mr-2 mt-1" />
                    <p className="text-orange-700">
                        {street} {city} {state} {zipcode}
                    </p>
                </div>

                <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">Rates & Options</h3>
                <div className="flex flex-col md:flex-row justify-around">
                    {/* Nightly */}
                    <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">Nightly</div>
                        <div className="text-2xl font-bold">
                            {nightly ? <p className="text-xl lg:text-2xl font-bold text-blue-500">₱{nightly.toLocaleString()}</p> : (
                                <FaTimes className="text-red-500" />
                            )}
                        </div>
                    </div>
                    {/* Weekly */}
                    <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">Weekly</div>
                        <div className="text-2xl font-bold">
                            {weekly ? <p className="text-xl lg:text-2xl font-bold text-blue-500">₱{weekly.toLocaleString()}</p> : (
                                <FaTimes className="text-red-500" />
                            )}
                        </div>
                    </div>
                    {/* Monthly */}
                    <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">Monthly</div>
                        <div className="text-2xl font-bold">
                            {monthly ? <p className="text-xl lg:text-2xl font-bold text-blue-500">₱{monthly.toLocaleString()}</p> : (
                                <FaTimes className="text-red-500" />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6">Description & Details</h3>
                <div className="flex flex-col items-center md:flex-row justify-center gap-5 text-blue-500 mb-4 text-lg lg:text-xl md:space-x-9 text-nowrap py-3 md:py-2">
                    <p>
                        <FaBed className="inline-block mr-0 lg:mr-1" /> <span>{beds}</span> {''}
                        <span className="inline">Beds</span>
                    </p>
                    <p>
                        <FaBath className="inline-block mr-0 lg:mr-1" /> {baths} {''}
                        <span className="inline">Baths</span>
                    </p>
                    <p>
                        <FaRulerCombined className="inline-block mr-0 lg:mr-1" /> {square_feet.toLocaleString()}
                        <span className="inline">sqft</span>
                    </p>
                </div>
                <p className="text-gray-500 mb-4">
                    {description}
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6">Amenities</h3>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
                    {amenities.map((amenity, index) => (
                        <li key={index}>
                            <FaCheck className="inline-block text-green-600 mr-2" /> {amenity}
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}

export default PropertyDetails;