import "./Main.css";

import moment from "moment";

const date = moment().format("HH:mm -  dddd, D MMM YYYY");

const Main = ({ temp, cityName, icon, weatherType }) => {
  return (
    <main className="main">
      <div className="logo">the.weather</div>
      <div className="weather-info-container">
        {temp && <div className="celsius">{Math.round(temp)}°</div>}
        <div className="place-info">
          <div className="location">{cityName}</div>
          <div className="date">{date}</div>
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
    </main>
  );
};

export default Main;
