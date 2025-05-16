'use client'

import Image from "next/image";

import { PropertyType } from "../../types/property";
import { useState } from "react";
import Link from "next/link";

interface ProfilePropertiesProps {
    properties: PropertyType[];
}

const ProfileProperties = ({ properties: initialProperties }: ProfilePropertiesProps) => {
    const [properties] = useState(initialProperties);
    return (
        <>
            {
                properties.map((property, index) => (
                    <div key={index} className="mb-10">
                        <Link href="/">
                            <Image
                                className="h-32 w-full rounded-md object-cover"
                                src={property.images[0]}
                                alt="Property 1"
                                width={1000}
                                height={400}
                            />
                        </Link>
                        <div className="mt-2">
                            <p className="text-lg font-semibold">{property.name}</p>
                            <p className="text-gray-600">Address: {property.location.street} {property.location.city} {property.location.state} {property.location.zipcode}</p>
                        </div>
                        <div className="mt-2">
                            <Link
                                href="/properties/edit"
                                className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                            >
                                Edit
                            </Link>
                            <button
                                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                                type="button"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    );
}

export default ProfileProperties;