import { useNavigate } from "react-router-dom";
import videoBg from "../../assets/bg_video.mp4"; // Add your video file in assets folder

const HomePoster = () => {
  const navigate = useNavigate();

  return (
    <section className="h-[120vh] sm:h-[90vh] lg:h-[100vh] relative overflow-hidden">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="relative z-10 h-full w-full flex justify-center items-center p-4 sm:p-6">
        <div className="flex w-full max-w-6xl mx-auto flex-col sm:flex-row gap-8 sm:gap-12 items-center text-center sm:text-left">

          {/* Text Content */}
          <div className="flex flex-col items-center sm:items-center w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
            Empowering <span className="text-blue-700 font-serif">Brokers</span> to Connect, Close & Succeed!
            </h1>

            {/* Shiny Transition Line */}
            <div className="relative my-4 w-[60%] sm:w-[40%] mx-auto">
              <div className="absolute inset-0 border-t-2 border-white opacity-30"></div>
              <div className="absolute inset-0 border-t-2 border-blue-700 opacity-50 animate-shine"></div>
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl text-white max-w-2xl">
              Your premier destination for property listings. Explore, discover, and find your dream property effortlessly with our cutting-edge platform.
            </p>

            {/* Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button
                className="text-white bg-slate-700 px-6 py-3 rounded-lg hover:bg-slate-800 w-full sm:w-auto"
                type="button"
                onClick={() => navigate("/listings")}
              >
                Search Property
              </button>
              <button
                className="text-white bg-blue-600 px-6 py-3 rounded-lg hover:bg-green-800 w-full sm:w-auto"
                type="button"
                onClick={() => navigate("/start")}
              >
                Add Property
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePoster;
