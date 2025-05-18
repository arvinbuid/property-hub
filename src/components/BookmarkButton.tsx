'use client';

import toast from "react-hot-toast";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";

import { FaBookmark } from "react-icons/fa";
import { PropertyType } from "../../types/property";
import { useSession } from "next-auth/react";
import { bookmarkProperty } from "@/app/actions/bookmarkProperty";
import { useEffect, useState } from "react";

interface BookmarkButtonProps {
    property: PropertyType;
    initialIsBookmarked: boolean;
}

const BookmarkButton = ({ property, initialIsBookmarked }: BookmarkButtonProps) => {
    const { data: session } = useSession();
    const userId = session?.user?.id;

    const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);

    useEffect(() => {
        if (!userId) return;


        checkBookmarkStatus(property._id).then((res) => {
            if (res.error) return toast.error(res.error);
            if (res.isBookmarked) {
                setIsBookmarked(res.isBookmarked);
            }
        })
    }, [userId, property._id])

    const handleBookmarkClick = async () => {
        if (!userId) {
            toast.error("You need to be logged in to bookmark a property.");
            return;
        }

        bookmarkProperty(property._id).then((res) => {
            if (res.error) return toast.error(res.error);

            if (res.message) {
                setIsBookmarked(res.isBookmarked);
                toast.success(res.message);
            }
        })
    }

    return (
        <>
            {!isBookmarked ? (
                <button
                    className="bg-blue-500 hover:bg-blue-600 transition-colors text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
                    onClick={handleBookmarkClick}
                >
                    <FaBookmark className="mr-2" /> Bookmark Property
                </button>
            ) : (
                <button
                    className="bg-red-500 hover:bg-red-600 transition-colors text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
                    onClick={handleBookmarkClick}
                >
                    <FaBookmark className="mr-2" /> Remove Bookmark
                </button>
            )}
        </>
    );
}

export default BookmarkButton;