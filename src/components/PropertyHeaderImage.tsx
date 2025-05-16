import Image from "next/image";

interface PropertyHeaderImageProps {
    image: string;
    name: string;
}

const PropertyHeaderImage = ({ image, name }: PropertyHeaderImageProps) => {
    return (
        <section>
            <div className="container-xl m-auto">
                <div className="grid grid-cols-1">
                    <Image
                        src={image}
                        alt={name}
                        width={500}
                        height={500}
                        className="object-cover h-[400px] w-full"
                    />
                </div>
            </div>
        </section>
    );
}

export default PropertyHeaderImage;