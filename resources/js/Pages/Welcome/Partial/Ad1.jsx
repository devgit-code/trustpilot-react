import React, { useState, useEffect } from 'react';
import image1 from '../../../../images/Sir1.jpg'
import image2 from '../../../../images/Sir2.jpg'
import image3 from '../../../../images/sir3.jpg'
import image4 from '../../../../images/sir4.jpg'
import image5 from '../../../../images/sir5.jpg'
import image6 from '../../../../images/sirmain.jpg'

const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
];

const ImageFlipGrid = () => {
    const [currentImages, setCurrentImages] = useState([0, 1, 2]); // Index of images displayed in each column
    const columnCount = 3; // Number of columns
    const animationDelay = 1000; // 1 second delay between each column flip

    useEffect(() => {
        const intervals = [];

        // Loop through each column and set a staggered interval for the image flip
        for (let i = 0; i < columnCount; i++) {
            intervals.push(
                setInterval(() => {
                    setCurrentImages((prev) => {
                        // Update only the current column index to show the next image
                        const newImages = [...prev];
                        newImages[i] = (newImages[i] + columnCount) % images.length;
                        return newImages;
                    });
                }, animationDelay * (i + 1)) // Stagger the delay for each column
            );
        }

        return () => intervals.forEach(clearInterval); // Clear intervals on cleanup
    }, []);

    return (
        <div className="bg-[#f5e0d7] p-8 rounded-lg flex space-x-4">
            <div className="flex flex-col space-y-4">
                <h2 className="text-2xl font-bold">Help millions make the right choice</h2>
                <p className="text-lg">Share your experience on Trustpilot, where real reviews make a difference.</p>
                <button className="bg-black text-white py-2 px-4 rounded-lg mt-4">Login or Sign Up</button>
            </div>

            <div className="grid grid-cols-3 gap-4 flex-grow">
                {Array.from({ length: columnCount }).map((_, colIndex) => (
                    <div
                        key={colIndex}
                        className="relative w-3/4 aspect-[3/4] overflow-hidden rounded-lg"
                        style={{ animation: `flip 1s ease-in-out ${animationDelay * colIndex}ms forwards` }}
                    >
                        <img
                            src={images[currentImages[colIndex]]}
                            alt=""
                            className="absolute w-full h-full object-cover rounded-lg transition-opacity duration-1000 ease-in-out"
                            style={{
                                opacity: currentImages[colIndex] % 2 === 0 ? 1 : 0,
                            }}
                        />
                        <img
                            src={images[(currentImages[colIndex] + 1) % images.length]}
                            alt=""
                            className="absolute w-full h-full object-cover rounded-lg transition-opacity duration-1000 ease-in-out"
                            style={{
                                opacity: currentImages[colIndex] % 2 === 0 ? 0 : 1,
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageFlipGrid;
