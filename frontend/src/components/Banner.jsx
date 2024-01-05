import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="flex items-center justify-center h-96 bg-fixed bg-parallax bg-cover">
      <h1 className=" text-white text-center text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light uppercase">
        share your adventures
      </h1>
    </div>
  );
}
