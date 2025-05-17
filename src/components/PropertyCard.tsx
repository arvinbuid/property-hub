import Link from "next/link"
import Image from "next/image"
import { FaBed, FaBath, FaRulerCombined, FaMoneyBill, FaMapMarker } from 'react-icons/fa';
import { PropertyType } from "../../types/property";

type PropertyCardProps = {
    property: PropertyType;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
    const { type, name, location, beds, baths, square_feet, rates } = property;
    const { city, state } = location;


    const getDisplayRate = () => {
        if (rates.monthly) {
            return `₱${rates.monthly.toLocaleString()}/mo`;
        } else if (rates.weekly) {
            return `₱${rates.weekly.toLocaleString()}/wk`;
        } else if (rates.nightly) {
            return `₱${rates.nightly.toLocaleString()}/night`;
        }
    }

    return (
        <div className="rounded-xl shadow-md relative">
            <Image
                src={property.images[0]}
                alt="Property Image"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto rounded-t-xl"
                priority
            />
            <div className="p-4">
                <div className="text-left md:text-center lg:text-left mb-6">
                    <div className="text-gray-600">{type}</div>
                    <h3 className="text-xl font-bold">{name}</h3>
                </div>
                <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
                    {getDisplayRate()}
                </h3>

                <div className="flex justify-center gap-4 text-gray-500 mb-4">
                    <p>
                        <FaBed className="inline mr-0 lg:mr-1" /> {beds} {' '}
                        <span className="inline">Beds</span>
                    </p>
                    <p>
                        <FaBath className="inline mr-0 lg:mr-1" /> {baths} {' '}
                        <span className="inline">Baths</span>
                    </p>
                    <p>
                        <FaRulerCombined className="inline mr-0 lg:mr-1" /> {square_feet}
                        <span className="inline">sqft</span>
                    </p>
                </div>

                <div
                    className="flex justify-center gap-4 text-green-900 text-sm mb-4"
                >
                    <p><FaMoneyBill className="inline mr-1" /> Weekly</p>
                    <p><FaMoneyBill className="inline mr-1" /> Monthly</p>
                </div>

                <div className="border border-gray-100 mb-5"></div>

                <div className="flex flex-col lg:flex-row justify-between mb-4">
                    <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                        <FaMapMarker className="mt-1 text-orange-700" />
                        <span className="text-orange-700"> {city} {state} </span>
                    </div>
                    <Link
                        href={`/properties/${property._id}`}
                        className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PropertyCard