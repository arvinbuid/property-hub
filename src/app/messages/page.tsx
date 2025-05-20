import connectDB from "../../../config/database";
import Message from "../../../models/Message";
import MessageCard from "@/components/MessageCard";

import { getSessionUser } from "../../../utils/getSessionUser";
import { MessageType } from "../../../types/message";
import { convertToSerializableObject } from "../../../utils/convertToObject";

const MessagePage = async () => {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error("User ID is required!");
    }

    const { userId } = sessionUser;

    const readMessages = await Message.find({ recipient: userId, read: true })
        .populate('sender', 'name')
        .populate('property', 'name')
        .sort({ createdAt: -1 })
        .lean();

    const unreadMessages = await Message.find({ recipient: userId, read: false })
        .populate('sender', 'name')
        .populate('property', 'name')
        .sort({ createdAt: -1 })
        .lean();

    const messages = [...unreadMessages, ...readMessages,].map((messageDoc) => {
        const message = convertToSerializableObject(messageDoc);
        message.sender = convertToSerializableObject(message.sender);
        message.property = convertToSerializableObject(message.property);
        return message as MessageType;
    });

    return (
        <section className="bg-blue-50">
            <div className="container m-auto py-24 max-w-6xl">
                <div
                    className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
                >
                    <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
                    <div className="space-y-4">
                        {messages.length === 0 ? (
                            <p>You have no messages.</p>
                        ) : (
                            messages.map((message) => (
                                <MessageCard key={message._id} message={message} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MessagePage;