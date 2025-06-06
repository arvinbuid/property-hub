'use client'

import toast from "react-hot-toast";
import updateProperty, { State } from "@/app/actions/updateProperty";

import { useActionState, useEffect } from "react";
import { PropertyType } from "../../types/property";
import { useRouter } from "next/navigation";

interface PropertyEditFormProps {
    property: PropertyType;
}

const initialState: State = {
    success: false,
    message: '',
    redirect: ''
}

const PropertyEditForm = ({ property }: PropertyEditFormProps) => {
    const [state, formAction, isPending] = useActionState(updateProperty, initialState);
    const router = useRouter();

    const { name, type, description, location, beds, baths, square_feet, amenities, rates, seller_info } = property;
    const { street, city, state: location_state, zipcode } = location;
    const { nightly, weekly, monthly } = rates;
    const { name: seller_name, email, phone } = seller_info;


    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            toast.success(state.message);
        } else {
            toast.error(state.message);
        }

        if (state.redirect) router.push(state.redirect);
    }, [state, router]);


    return (
        <form action={formAction}>
            {/* Hidden input to pass the property ID */}
            <input type="hidden" name="propertyId" value={property._id} />

            <h2 className="text-2xl md:text-3xl text-center font-semibold mb-10 md:mb-8">
                Edit Property
            </h2>

            <div className="mb-4">
                <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Property Type</label>
                <select
                    id="type"
                    name="type"
                    className="border rounded w-full py-2 px-3"
                    defaultValue={type}
                    required
                >
                    <option value="Apartment">Apartment</option>
                    <option value="Condo">Condo</option>
                    <option value="House">House</option>
                    <option value="CabinOrCottage">Cabin or Cottage</option>
                    <option value="Room">Room</option>
                    <option value="Studio">Studio</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Listing Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={name}
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="eg. Beautiful Apartment In Miami"
                    required
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="description"
                    className="block text-gray-700 font-bold mb-2">Description</label>
                <textarea
                    id="description"
                    name="description"
                    defaultValue={description}
                    className="border rounded w-full py-2 px-3"
                    rows={4}
                    placeholder="Add an optional description of your property"
                ></textarea>
            </div>

            <div className="mb-4 bg-blue-50 p-4">
                <label className="block text-gray-700 font-bold mb-2">Location</label>
                <input
                    type="text"
                    id="street"
                    name="location.street"
                    defaultValue={street}
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Street"
                />
                <input
                    type="text"
                    id="city"
                    name="location.city"
                    defaultValue={city}
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="City"
                    required
                />
                <input
                    type="text"
                    id="state"
                    name="location.state"
                    defaultValue={location_state}
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="State"
                    required
                />
                <input
                    type="text"
                    id="zipcode"
                    name="location.zipcode"
                    defaultValue={zipcode}
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Zipcode"
                />
            </div>

            <div className="mb-4 flex flex-wrap">
                <div className="w-full sm:w-1/3 pr-2">
                    <label htmlFor="beds" className="block text-gray-700 font-bold mb-2">Beds</label>
                    <input
                        type="number"
                        id="beds"
                        name="beds"
                        defaultValue={beds}
                        className="border rounded w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="w-full sm:w-1/3 px-2">
                    <label htmlFor="baths" className="block text-gray-700 font-bold mb-2">Baths</label>
                    <input
                        type="number"
                        id="baths"
                        name="baths"
                        defaultValue={baths}
                        className="border rounded w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="w-full sm:w-1/3 pl-2">
                    <label
                        htmlFor="square_feet"
                        className="block text-gray-700 font-bold mb-2">Square Feet</label>
                    <input
                        type="number"
                        id="square_feet"
                        name="square_feet"
                        defaultValue={square_feet}
                        className="border rounded w-full py-2 px-3"
                        required
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div>
                        <input
                            type="checkbox"
                            id="amenity_wifi"
                            name="amenities"
                            value="Wifi"
                            defaultChecked={amenities.includes("Wifi")}
                            className="mr-2"
                        />
                        <label htmlFor="amenity_wifi">Wifi</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="amenity_kitchen"
                            name="amenities"
                            value="Full kitchen"
                            defaultChecked={amenities.includes("Full kitchen")}
                            className="mr-2"
                        />
                        <label htmlFor="amenity_kitchen">Full kitchen</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="amenity_washer_dryer"
                            name="amenities"
                            value="Washer & Dryer"
                            defaultChecked={amenities.includes("Washer & Dryer")}
                            className="mr-2"
                        />
                        <label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="amenity_free_parking"
                            name="amenities"
                            value="Free Parking"
                            defaultChecked={amenities.includes("Free Parking")}
                            className="mr-2"
                        />
                        <label htmlFor="amenity_free_parking">Free Parking</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="amenity_pool"
                            name="amenities"
                            value="Swimming Pool"
                            defaultChecked={amenities.includes("Swimming Pool")}
                            className="mr-2"
                        />
                        <label htmlFor="amenity_pool">Swimming Pool</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="amenity_hot_tub"
                            name="amenities"
                            value="Hot Tub"
                            defaultChecked={amenities.includes("Hot Tub")}
                            className="mr-2"
                        />
                        <label htmlFor="amenity_hot_tub">Hot Tub</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="amenity_24_7_security"
                            name="amenities"
                            value="24/7 Security"
                            defaultChecked={amenities.includes("24/7 Security")}
                            className="mr-2"
                        />
                        <label htmlFor="amenity_24_7_security">24/7 Security</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="amenity_wheelchair_accessible"
                            name="amenities"
                            value="Wheelchair Accessible"
                            defaultChecked={amenities.includes("Wheelchair Accessible")}
                            className="mr-2"
                        />
                        <label htmlFor="amenity_wheelchair_accessible"
                        >Wheelchair Accessible</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="amenity_elevator_access"
                            name="amenities"
                            value="Elevator Access"
                            defaultChecked={amenities.includes("Elevator Access")}
                            className="mr-2"
                        />
                        <label htmlFor="amenity_elevator_access">Elevator Access</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="amenity_dishwasher"
                            name="amenities"
                            value="Dishwasher"
                            defaultChecked={amenities.includes("Dishwasher")}
                            className="mr-2"
                        />
                        <label htmlFor="amenity_dishwasher">Dishwasher</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="amenity_gym_fitness_center"
                            name="amenities"
                            value="Gym/Fitness Center"
                            defaultChecked={amenities.includes("Gym/Fitness Center")}
                            className="mr-2"
                        />
                        <label htmlFor="amenity_gym_fitness_center"
                        >Gym/Fitness Center</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="amenity_air_conditioning"
                            name="amenities"
                            value="Air Conditioning"
                            defaultChecked={amenities.includes("Air Conditioning")}
                            className="mr-2"
                        />
                        <label htmlFor="amenity_air_conditioning">Air Conditioning</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="amenity_balcony_patio"
                            name="amenities"
                            value="Balcony/Patio"
                            defaultChecked={amenities.includes("Balcony/Patio")}
                            className="mr-2"
                        />
                        <label htmlFor="amenity_balcony_patio">Balcony/Patio</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="amenity_smart_tv"
                            name="amenities"
                            value="Smart TV"
                            defaultChecked={amenities.includes("Smart TV")}
                            className="mr-2"
                        />
                        <label htmlFor="amenity_smart_tv">Smart TV</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="amenity_coffee_maker"
                            name="amenities"
                            value="Coffee Maker"
                            defaultChecked={amenities.includes("Coffee Maker")}
                            className="mr-2"
                        />
                        <label htmlFor="amenity_coffee_maker">Coffee Maker</label>
                    </div>
                </div>
            </div>

            <div className="mb-4 bg-blue-50 p-4">
                <label className="block text-gray-700 font-bold mb-2">Rates (Leave blank if not applicable)</label>
                <div
                    className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center">
                        <label htmlFor="weekly_rate" className="mr-2">Weekly</label>
                        <input
                            type="number"
                            id="weekly_rate"
                            name="rates.weekly"
                            defaultValue={weekly}
                            className="border rounded w-full py-2 px-3"
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="monthly_rate" className="mr-2">Monthly</label>
                        <input
                            type="number"
                            id="monthly_rate"
                            name="rates.monthly"
                            defaultValue={monthly}
                            className="border rounded w-full py-2 px-3"
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="nightly_rate" className="mr-2">Nightly</label>
                        <input
                            type="number"
                            id="nightly_rate"
                            name="rates.nightly"
                            defaultValue={nightly}
                            className="border rounded w-full py-2 px-3"
                        />
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <label
                    htmlFor="seller_name"
                    className="block text-gray-700 font-bold mb-2">Seller Name</label>
                <input
                    type="text"
                    id="seller_name"
                    name="seller_info.name"
                    defaultValue={seller_name}
                    className="border rounded w-full py-2 px-3"
                    placeholder="Name"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="seller_email"
                    className="block text-gray-700 font-bold mb-2"
                >Seller Email</label>
                <input
                    type="email"
                    id="seller_email"
                    name="seller_info.email"
                    defaultValue={email}
                    className="border rounded w-full py-2 px-3"
                    placeholder="Email address"
                    required
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="seller_phone"
                    className="block text-gray-700 font-bold mb-2">Seller Phone</label>
                <input
                    type="tel"
                    id="seller_phone"
                    name="seller_info.phone"
                    defaultValue={phone}
                    className="border rounded w-full py-2 px-3"
                    placeholder="Phone"
                />
            </div>

            <div>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline transition-colors"
                    type="submit"
                    disabled={isPending}
                >
                    {isPending ? 'Updating...' : 'Update Property'}
                </button>
            </div>
        </form>
    );
}

export default PropertyEditForm;