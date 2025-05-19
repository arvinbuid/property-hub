'use client'

import toast from "react-hot-toast";
import addMessage, { State } from "@/app/actions/addMessage";

import { FaPaperPlane } from "react-icons/fa";
import { PropertyType } from "../../types/property";
import { useSession } from "next-auth/react";
import { useActionState, useEffect } from "react";

interface PropertyContactFormProps {
    property: PropertyType
}

const initialState: State = {
    submitted: false,
    error: ''
}

const PropertyContactForm = ({ property }: PropertyContactFormProps) => {
    const { data: session } = useSession();

    const [state, formAction, isPending] = useActionState(addMessage, initialState);

    useEffect(() => {
        if (state.error) {
            toast.error(state.error);
        } else if (state.submitted) {
            toast.success("Your message has been sent successfully.");
        }
    }, [state])

    if (state.submitted) {
        return <p className="text-green-500 mt-6 mb-4 text-center">Your message has been sent successfully.</p>
    }

    return (
        session && (
            <div className="mt-4 md:mt-0 bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
                <form action={formAction}>
                    {/* Hidden inputs */}
                    <input type="hidden" id="recipient" name="recipient" defaultValue={property.owner} />
                    <input type="hidden" id="property" name="property" defaultValue={property._id} />

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="name"
                        >
                            Name:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="phone"
                        >
                            Phone:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phone"
                            name="phone"
                            type="text"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="body"
                        >
                            Message:
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                            id="body"
                            name="body"
                            placeholder="Enter your message"
                        ></textarea>
                    </div>
                    <div>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                            type="submit"
                            disabled={isPending}
                        >
                            {!isPending && <FaPaperPlane className="mr-2" />} {isPending ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </form>
            </div>
        )
    );
}

export default PropertyContactForm;