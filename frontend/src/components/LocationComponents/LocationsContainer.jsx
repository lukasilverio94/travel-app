// LocationsContainer.jsx
import React from "react";
import LocationCard from "./LocationCard";

export default function LocationsContainer({ locations }) {
  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-3">
      {locations.map((location, index) => (
        <LocationCard key={index} {...location} />
      ))}
    </div>
  );
}