import Link from "next/link"
import Image from "next/image"
import { FaBed, FaBath, FaRulerCombined, FaMoneyBill, FaMapMarker } from 'react-icons/fa';
interface PropertyCardProps {
    property: {
        _id: string;
        owner: string;
        name: string;
        type: string;
        description: string;
        location: {
            street: string;
            city: string;
            state: string;
            zipcode: string;
        };
        beds: number;
        baths: number;
        square_feet: number;
        amenities: string[];
        rates: {
            weekly?: number;
            monthly?: number;
            nightly?: number;
        };
        seller_info: {
            name: string;
            email: string;
            phone: string;
        };
        images: string[];
        is_featured: boolean;
        createdAt: string;
        updatedAt: string;
    }
}

const PropertyCard = ({ property }: PropertyCardProps) => {
    const { images, type, name, location, beds, baths, square_feet, rates } = property;
    const { city, state } = location;

    const getDisplayRate = () => {
        if (rates.monthly) {
            return `$${rates.monthly}/mo`;
        } else if (rates.weekly) {
            return `$${rates.weekly}/wk`;
        } else if (rates.nightly) {
            return `$${rates.nightly}/night`;
        }
    }

    return (
        <div className="rounded-xl shadow-md relative">
            <Image
                src={`/images/properties/${images[0]}`}
                alt=""
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
                        <FaBed className="md:hidden lg:inline mr-1" /> {beds} {' '}
                        <span className="md:hidden lg:inline">Beds</span>
                    </p>
                    <p>
                        <FaBath className="md:hidden lg:inline mr-1" /> {baths} {' '}
                        <span className="md:hidden lg:inline">Baths</span>
                    </p>
                    <p>
                        <FaRulerCombined className="md:hidden lg:inline mr-1" /> {square_feet}
                        <span className="md:hidden lg:inline">sqft</span>
                    </p>
                </div>

                <div
                    className="flex justify-center gap-4 text-green-900 text-sm mb-4"
                >
                    <p><FaMoneyBill className="md:hidden lg:inline mr-1" /> Weekly</p>
                    <p><FaMoneyBill className="md:hidden lg:inline mr-1" /> Monthly</p>
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