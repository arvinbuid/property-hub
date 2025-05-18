'use client';

import { FaBookmark } from "react-icons/fa";
import { PropertyType } from "../../types/property";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { bookmarkProperty } from "@/app/actions/bookmarkProperty";

interface BookmarkButtonProps {
    property: PropertyType;
}

const BookmarkButton = ({ property }: BookmarkButtonProps) => {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const handleBookmarkClick = async () => {
        if (!userId) {
            toast.error("You need to be logged in to bookmark a property.");
            return;
        }

        bookmarkProperty(property._id).then((res) => {
            if (res.error) return toast.error(res.error);
            if (res.message) return toast.success(res.message);
        })
    }

    return (
        <button
            className="bg-blue-500 hover:bg-blue-600 transition-colors text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
            onClick={handleBookmarkClick}
        >
            <FaBookmark className="mr-2" /> Bookmark Property
        </button>
    );
}

export default BookmarkButton;