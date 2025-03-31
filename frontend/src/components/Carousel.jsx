import { useState, useEffect } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import noimage from "../assets/noimage.jpg";

const Carousel = ({ photos = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (photos.length || 1));
  };

  const prevSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? (photos.length ? photos.length - 1 : 0) : prevIndex - 1
    );
  };

  const handleMouseMove = (e) => {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 30;
    const y = ((e.clientY - top) / height - 0.5) * -30;
    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      className="relative overflow-hidden h-[40vh] w-full bg-gray-100 border border-slate-300 rounded-lg shadow-lg"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `rotateY(${rotation.x}deg) rotateX(${rotation.y}deg)`,
        transition: "transform 0.05s linear",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Image Wrapper */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          width: `${photos.length ? photos.length * 100 : 100}%`,
          transform: `translateX(-${(currentIndex / (photos.length || 1)) * 100}%)`,
        }}
      >
        {(photos.length ? photos : [noimage]).map((image, index) => (
          <div
            key={index}
            className="h-[40vh] w-full flex items-center justify-center bg-slate-50 bg-opacity-20"
          >
            <img
              className="h-full w-full object-cover"
              src={image}
              alt={`Slide ${index}`}
            />
          </div>
        ))}
      </div>

      {/* Previous Button */}
      {photos.length > 1 && (
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 w-10 h-10 text-gray-700 bg-white bg-opacity-50 hover:bg-opacity-100 rounded-full shadow-md flex items-center justify-center"
        >
          <GrPrevious className="w-6 h-6" />
        </button>
      )}

      {/* Next Button */}
      {photos.length > 1 && (
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 w-10 h-10 text-gray-700 bg-white bg-opacity-50 hover:bg-opacity-100 rounded-full shadow-md flex items-center justify-center"
        >
          <GrNext className="w-6 h-6" />
        </button>
      )}

      {/* Label */}
      <p className="absolute top-0 left-0 text-white font-semibold bg-black bg-opacity-50 px-3 py-1 rounded-br-lg">
        Images
      </p>
    </div>
  );
};

export default Carousel;
