import { MessageType } from "../../types/message";

interface MessageCardProps {
    message: MessageType;
}

const MessageCard = ({ message }: MessageCardProps) => {
    const { email, phone, body, property, createdAt } = message;
    return (
        <div className="space-y-4">
            <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
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
                    className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md"
                >
                    Mark As Read
                </button>
                <button className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md">
                    Delete
                </button>
            </div>
        </div>
    );
}

export default MessageCard;