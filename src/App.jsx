import { useEffect, useRef, useState } from "react";
import moment from "moment";
import LocationList from "./components/LocationList/LocationList";
import WeatherDetails from "./components/WeatherDetails/WeatherDetails";
import SearchIcon from "./components/icons/SearchIcon";
import ClearBg from "./assets/clear.avif";
import RainyBg from "./assets/rainy.jpg";
import CloudyBg from "./assets/cloudy.jpg";
import SmokeBg from "./assets/smoke.webp";
import ThunderStormBg from "./assets/thunderstorm.webp";
import MistBg from "./assets/mist.jpg";
import FogBg from "./assets/fog.webp";
import HazeBg from "./assets/haze.jpg";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "0b81ccab0886a5f97c4c6b7ac9b1018c";

const backgrounds = {
  Clear: ClearBg,
  Clouds: CloudyBg,
  Rain: RainyBg,
  Smoke: SmokeBg,
  Thunderstorm: ThunderStormBg,
  Mist: MistBg,
  Fog: FogBg,
  Haze: HazeBg,
};

function App() {
  const [cityName, setCityName] = useState("Search for a location");
  const [weatherType, setWeatherType] = useState("");
  const [temp, setTemp] = useState("");
  const [cloudy, setCloudy] = useState("0");
  const [humidity, setHumidity] = useState("0");
  const [windSpeed, setWindSpeed] = useState("0");
  const [location, setLocation] = useState("");
  const [searchedLocations, setSearchedLocations] = useState([]);
  const [icon, setIcon] = useState("");

  const inputRef = useRef(null);

  const handleSearchLocation = (e) => {
    e.preventDefault();

    if (!location) {
      alert("Please enter a location name");
      return;
    }

    getWeatherData();

    if (searchedLocations.length === 5) {
      setSearchedLocations((state) => {
        return [state.shift(), ...state];
      });
    }

    setSearchedLocations((state) => [...state, location]);
    setLocation("");
  };

  const getWeatherData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}?q=${location}&APPID=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === "404") {
        alert(data.message);
        return;
      }

      setCityName(data.name);
      setWeatherType(data.weather[0].main);
      setTemp(data.main.temp);
      setCloudy(data.clouds.all);
      setHumidity(data.main.humidity);
      setWindSpeed(data.wind.speed);
      setIcon(data.weather[0].icon);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div
      className="container"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, .1), rgba(0, 0, 0, .6)),url(${backgrounds[weatherType]})`,
        backgroundSize: "cover",
      }}
    >
      <div className="left">
        <div className="logo">the.weather</div>
        <div className="weather-info-container">
          {temp && <div className="celsius">{Math.round(temp)}°</div>}
          <div className="place-info">
            <div className="location">{cityName}</div>
            <div className="date">
              {moment().format("HH:mm -  dddd, D MMM YYYY")}
            </div>
          </div>

          {weatherType && (
            <div className="weather-type">
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={`${weatherType} icon`}
                className="weather-type-icon"
              />
              <p>{weatherType}</p>
            </div>
          )}
        </div>
      </div>
      <div className="right">
        <form onSubmit={handleSearchLocation} className="search-form">
          <input
            type="text"
            placeholder="Search location"
            className="input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            ref={inputRef}
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
      </div>
    </div>
  );
}

export default App;
