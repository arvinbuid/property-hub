'use client'

import { PropertyType } from "../../types/property";
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon, WhatsappShareButton, WhatsappIcon, LinkedinShareButton, LinkedinIcon, } from "react-share";

interface ShareButtonsProps {
    property: PropertyType;
}

const ShareButtons = ({ property }: ShareButtonsProps) => {
    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

    return (
        <>
            <h3 className="text-center font-bold pt-2 text-lg">Share This Property:</h3>
            <div className="flex justify-center items-center gap-4">
                <FacebookShareButton url={shareUrl} hashtag={`#${property.type.replace('/\s/g', '')}ForRent.`}>
                    <FacebookIcon size={40} round={true} />
                </FacebookShareButton >
                <TwitterShareButton url={shareUrl} title={property.name} hashtags={[`${property.type.replace('/\s/g', '')}ForRent🏢`]}>
                    <TwitterIcon size={40} round={true} />
                </TwitterShareButton>
                <WhatsappShareButton url={shareUrl} title={property.name} separator="::">
                    <WhatsappIcon size={40} round={true} />
                </WhatsappShareButton>
                <LinkedinShareButton url={shareUrl} title={property.name} summary={property.description}>
                    <LinkedinIcon size={40} round={true} />
                </LinkedinShareButton>

            </div>
        </>
    );
}

export default ShareButtons;