import { useState } from "react";
import ClearBg from "./assets/clear.avif";
import RainyBg from "./assets/rainy.jpg";
import CloudyBg from "./assets/cloudy.jpg";
import SmokeBg from "./assets/smoke.webp";
import ThunderStormBg from "./assets/thunderstorm.webp";
import MistBg from "./assets/mist.jpg";
import FogBg from "./assets/fog.webp";
import HazeBg from "./assets/haze.jpg";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "0b81ccab0886a5f97c4c6b7ac9b1018c";

const background = {
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

  const handleSearchLocation = (e) => {
    e.preventDefault();

    if (!location) {
      alert("Please enter a location name");
      return;
    }

    getWeatherData();

    if (searchedLocations.length === 5) {
      setSearchedLocations((state) => {
        const newArr = [...state];
        newArr.shift();

        return newArr;
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      {weatherType && (
        <div className="bg-image">
          <img src={background[weatherType]} alt="background image" />
        </div>
      )}

      <Main
        temp={temp}
        cityName={cityName}
        icon={icon}
        weatherType={weatherType}
      />

      <Sidebar
        location={location}
        setLocation={setLocation}
        searchedLocations={searchedLocations}
        weatherType={weatherType}
        cloudy={cloudy}
        humidity={humidity}
        windSpeed={windSpeed}
        onSearchLocation={handleSearchLocation}
      />
    </div>
  );
}

export default App;
