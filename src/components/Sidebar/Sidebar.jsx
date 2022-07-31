import "./Sidebar.css";

import LocationList from "../LocationList/LocationList";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import SearchIcon from "../icons/SearchIcon";

const Sidebar = ({
  location,
  setLocation,
  searchedLocations,
  weatherType,
  cloudy,
  humidity,
  windSpeed,
  onSearchLocation,
}) => {
  return (
    <aside className="sidebar">
      <form onSubmit={onSearchLocation} className="search-form">
        <input
          autoFocus
          type="text"
          placeholder="Search location"
          className="input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button className="search-button">
          <SearchIcon width={24} />
        </button>
      </form>

      {searchedLocations.length > 0 && (
        <LocationList locations={searchedLocations} />
      )}

      {weatherType && (
        <WeatherDetails
          cloudy={cloudy}
          humidity={humidity}
          windSpeed={windSpeed}
        />
      )}
    </aside>
  );
};

export default Sidebar;
