'use client'

import toast from "react-hot-toast";
import markMessageAsRead from "@/app/actions/markMessageAsRead";
import deleteMessage from "@/app/actions/deleteMessage";
import useGlobalContext from "../../hooks/useGlobalContext";

import { MessageType } from "../../types/message";
import { useState } from "react";

interface MessageCardProps {
    message: MessageType;
}

const MessageCard = ({ message }: MessageCardProps) => {
    const { email, phone, body, property, createdAt } = message;
    const [isRead, setIsRead] = useState(message.read);

    const { setUnreadMessageCount } = useGlobalContext()

    const handleMarkAsReadClick = async () => {
        const read = await markMessageAsRead(message._id);

        setIsRead(read);
        setUnreadMessageCount(prevCount => read ? prevCount - 1 : prevCount + 1);
        toast.success(`Message marked as ${read ? 'read' : 'new'}`)
    }

    const handleDeleteMessageClick = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this message?");

        if (!confirmDelete) return;

        setUnreadMessageCount(prevCount => isRead ? prevCount : prevCount - 1);
        await deleteMessage(message._id);
        toast.success('Message deleted successfully.');
    }

    return (
        <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
            {!isRead && <div className="hidden md:block absolute top-2 right-2 bg-yellow-500 text-white text-sm p-2 rounded-md ">
                New
            </div>}
            <h2 className="text-xl mb-4">
                <span className="font-bold">Property Inquiry:</span>{' '}
                {property.name}
            </h2>
            <p className="text-gray-700">
                {body}
            </p>

            <ul className="mt-4">
                <li><strong>Name:</strong> John Doe</li>

                <li>
                    <strong>Reply Email:</strong>{' '}
                    <a href={`mailto:${email}`} className="text-blue-500">{email}</a>
                </li>
                <li>
                    <strong>Reply Phone:</strong>{' '}
                    <a href={`tel:${phone}`} className="text-blue-500">{phone}</a>
                </li>
                <li><strong>Received: </strong>{new Date(createdAt).toLocaleString()}</li>
            </ul>
            <button
                className={`${!isRead ? 'bg-green-500' : 'bg-blue-500'} mt-4 mr-3 text-white py-1 px-3 rounded-md`}
                onClick={handleMarkAsReadClick}
            >
                {!isRead ? 'Mark As Read' : 'Mark As New'}
            </button>
            <button
                className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
                onClick={handleDeleteMessageClick}
            >
                Delete
            </button>
        </div>
    );
}

export default MessageCard;