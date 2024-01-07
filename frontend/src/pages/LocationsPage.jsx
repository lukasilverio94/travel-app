import BackButton from "../components/BackButton";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchForm from "../components/api/SearchForm";
import VenueList from "../components/api/VenueList";

// Components

const apiKey = "fsq317bfrgGeFKS7DDCGMcyScOq7G+Yuh8BY4mBqVCelq5M=";

export default function LocationsPage() {
  useEffect(() => {
    getUserLocation();
  }, []);

  //Change the query by input
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  //Check documentation: https://www.w3schools.com/jsref/met_geo_getcurrentposition.asp
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation(`${latitude},${longitude}`);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  };

  //Get Venues (places)
  const getVenues = async () => {
    setIsLoading(true);

    try {
      const searchParams = new URLSearchParams({
        query,
        ll: userLocation, //latitude & longitude that we set at getUserLocation func
        open_now: "true",
        sort: "DISTANCE",
      });

      const response = await axios.get(
        `https://api.foursquare.com/v3/places/search?${searchParams}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: apiKey,
          },
        }
      );

      setVenues(response.data.results);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //Handle Search Click
  const handleSearchClick = () => {
    getVenues();
    setSearchPerformed(true);
  };
  const [query, setQuery] = useState("");
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  return (
    <div className="container ms-auto w-full py-5 d-flex flex-column mt-20 lg:px-4 min-h-screen mb-12">
      <div className="my-2">
        <BackButton />
      </div>
      <SearchForm
        query={query}
        handleInputChange={handleInputChange}
        handleSearchClick={handleSearchClick}
      />
      {/* Loading while wait request */}
      {isLoading && <p>Loading...</p>}
      {/* Venues List Component */}
      {venues.length > 0 && <VenueList venues={venues} />}
      {searchPerformed && !isLoading && query && venues.length === 0 && (
        <p>No venues found. Try a different search.</p>
      )}
    </div>
  );
}
