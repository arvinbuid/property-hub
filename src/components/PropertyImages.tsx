'use client'

import Image from "next/image";

import { Gallery, Item } from 'react-photoswipe-gallery'

interface PropertyImagesProps {
    images: string[];
}

const PropertyImages = ({ images }: PropertyImagesProps) => {
    return (
        <Gallery>
            <section className="bg-blue-50 p-4">
                <div className="container mx-auto">
                    {images.length === 1 ? (
                        <Item
                            original={images[0]}
                            thumbnail={images[1]}
                            width="1000"
                            height="600"
                        >
                            {({ ref, open }) => (
                                <Image
                                    src={images[0]}
                                    alt="Property Image"
                                    width={1800}
                                    height={400}
                                    className="object-cover h-[400px] mx-auto rounded-xl"
                                    priority
                                    ref={ref}
                                    onClick={open}
                                />
                            )}
                        </Item>

                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {images.map((image, index) => (
                                <div key={index} className={images.length % 2 === 1 && index === images.length - 1 ? "col-span-1 lg:col-span-2" : "col-span-1"} >
                                    <Item
                                        original={image}
                                        thumbnail={image}
                                        width="1000"
                                        height="600"
                                    >
                                        {({ ref, open }) => (
                                            <Image
                                                src={image}
                                                alt="Property Image"
                                                width={1024}
                                                height={768}
                                                className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
                                                priority
                                                ref={ref}
                                                onClick={open}
                                            />
                                        )}
                                    </Item>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section >
        </Gallery>
    );
}

export default PropertyImages;