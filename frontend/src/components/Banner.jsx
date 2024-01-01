import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="w-full h-screen mb-3 relative">
      <img
        className="top-0 left-0 w-full h-screen object-cover"
        src="../public/assets/banner.jpg"
        alt=""
      />
      <div className="absolute left-0 w-full h-screen" />
      <div className="absolute top-0 w-full h-full flex flex-col justify-center items-center text-white">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light">
            Read and share your adventures
          </h1>
        </div>
      </div>
    </div>
  );
}
