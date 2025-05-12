import Link from 'next/link'
import { FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
    return (
        <section className="bg-blue-50 min-h-screen flex-grow">
            <div className="container m-auto max-w-lg md:max-w-xl py-24">
                <div className="bg-white px-6 py-24 mb-4 shadow-md rounded-md border m-4 md:m-0 space-y-4">
                    <div className="flex justify-center">
                        <FaExclamationTriangle className='text-7xl md:text-8xl text-red-600 mb-2' />
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl md:text-3xl font-bold mt-4 mb-2">Page Not Found</h1>
                        <p className="text-gray-500 text-md md:text-xl mb-10">
                            The page you are looking for does not exist.
                        </p>
                        <Link
                            href="/"
                            className="bg-blue-700 text-md md:text-lg hover:bg-blue-800 text-white font-bold py-4 px-6 rounded"
                        >Go Home</Link>
                    </div>
                </div>
            </div>
            <div className="flex-grow"></div>
        </section>
    )
}