// LocationCard.jsx
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function LocationCard({
  title,
  description,
  markerIcon,
  imageSrc,
  altText,
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="pb-3 text-3xl font-bold text-teal-600">{title}</h4>
      <p className="pb-6 text-gray-600">{description}</p>
      <h4 className="pb-3 text-2xl font-bold text-gray-800 flex items-center gap-1">
        <FaMapMarkerAlt className="text-orange-700" />
        <span>{markerIcon}</span>
      </h4>
      <div className="relative overflow-hidden max-h-[350px] h-auto rounded-md shadow-lg">
        <img
          className="w-full h-full object-cover bg-center"
          src={imageSrc}
          alt={altText}
        />
      </div>
    </div>
  );
}
