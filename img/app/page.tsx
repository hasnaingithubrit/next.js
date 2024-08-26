"use client"

import { useState, useEffect } from "react";

export default function ImageGenerator() {
    const [text, setText] = useState("");
    const [url, setUrl] = useState("");
    const [loader, setLoader] = useState(false);
    const [images, setImages] = useState([]);
    const [email, setEmail] = useState("");
    const [emailSubmitted, setEmailSubmitted] = useState(false);

    useEffect(() => {
        // Preload a default AI-generated image for the header
        async function fetchDefaultImage() {
            try {
                const input = { inputs: "futuristic AI art" };
                const result = await query(input);
                setUrl(result);
            } catch (error) {
                console.error("Error loading default image:", error);
            }
        }
        fetchDefaultImage();
    }, []);

    const query = async (data: { inputs: string }) => {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
            {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.blob();
        const output = URL.createObjectURL(result);
        return output;
    };

    const onClickHandler = async () => {
        try {
            setLoader(true);
            const input = { inputs: text };
            const result = await query(input);
            setUrl(result);
            setImages([...images, result]);
        } catch (error) {
            console.error("Error generating image:", error);
        } finally {
            setLoader(false);
        }
    };

    const onEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Email submitted:", email);
        setEmailSubmitted(true);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">

            {/* Header */}
            <header className="relative w-full h-64 overflow-hidden">
                {url && (
                    <img
                        src={url}
                        alt="AI-generated"
                        className="absolute inset-0 object-cover w-full h-full"
                    />
                )}
                <div className="relative z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                    <h1 className="text-5xl font-bold text-white">Image-Generator</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-md p-6 bg-white bg-opacity-70 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
                        NextGen Image Generator
                    </h1>
                    <p className="text-gray-600 text-center mb-4">
                        Generate stunning images with the power of Stable Diffusion.
                    </p>
                    <textarea
                        id="message"
                        rows={4}
                        className="w-full p-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Describe your image here..."
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button
                        onClick={onClickHandler}
                        type="button"
                        className="w-full mt-4 py-3 text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Generate
                    </button>

                    {loader && (
                        <div className="flex justify-center mt-4">
                            <svg
                                aria-hidden="true"
                                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {images.map((image, index) => (
                        <div key={index} className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <img
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                                src={image}
                                alt={`Generated ${index}`}
                            />
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="md:w-1/2">
                        <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
                        <p className="mb-4">
                            Subscribe to receive updates and news.
                        </p>
                        {emailSubmitted ? (
                            <p className="text-green-400">Thank you for subscribing!</p>
                        ) : (
                            <form onSubmit={onEmailSubmit} className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full p-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-r-lg text-sm text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    Subscribe
                                </button>
                            </form>
                        )}
                    </div>
                    <div className="text-center mt-6 md:mt-0">
                        <p>&copy; 2024 Image-Generator. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
