import Image from "next/image";

import { FaBed, FaBath, FaRulerCombined, FaMoneyBill, FaMapMarker } from 'react-icons/fa';
import { PropertyType } from "../../types/property";
import Link from "next/link";

interface FeaturedPropertyCardProps {
    property: PropertyType;
}

const FeaturedPropertyCard = ({ property }: FeaturedPropertyCardProps) => {
    const { name, type, location, beds, baths, square_feet, rates, images } = property;

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
        <div className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row">
            <Image
                src={images[0]}
                alt=""
                width={800}
                height={400}
                className="w-full h-auto bg-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl md:w-2/4"
            />
            <div className="w-full xl:w-2/4 p-6">
                <h3 className="text-xl font-bold">{name}</h3>
                <div className="text-gray-600 mb-4">{type}</div>
                <h3
                    className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right"
                >
                    {getDisplayRate()}
                </h3>
                <div className="flex justify-center gap-4 text-gray-500 mb-4">
                    <p className="flex items-center gap-1">
                        <FaBed className="mr-1" /> {beds}
                        <span className="inline">Beds</span>
                    </p>
                    <p className="flex items-center gap-1">
                        <FaBath className="mr-1" /> {baths}
                        <span className="inline">Baths</span>
                    </p>
                    <p className="flex items-center gap-1">
                        <FaRulerCombined className="mr-1" />{square_feet}
                        <span className="inline">sqft</span>
                    </p>
                </div>

                <div
                    className="flex justify-center gap-4 text-green-900 text-sm mb-4"
                >
                    {rates.nightly && <p className="flex items-center gap-2"><FaMoneyBill /> Nightly</p>}
                    {rates.weekly && <p className="flex items-center gap-2"><FaMoneyBill /> Weekly</p>}
                    {rates.monthly && <p className="flex items-center gap-2"><FaMoneyBill /> Monthly</p>}
                </div>

                <div className="border border-gray-200 mb-5"></div>

                <div className="flex flex-col lg:flex-row justify-between">
                    <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                        <FaMapMarker className="text-lg text-orange-700" />
                        <span className="text-orange-700"> {location.city} {location.state}</span>
                    </div>
                    <Link href={`/properties/${property._id}`} className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm">
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default FeaturedPropertyCard;