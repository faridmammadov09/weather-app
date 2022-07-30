const WeatherDetails = ({ cloudy, humidity, windSpeed }) => {
  return (
    <div className="weather-details">
      <h4 className="weather-details-title">Weather Details</h4>

      <ul className="weather-details-list">
        <li className="weather-details-item">
          <div>Cloudy</div>
          <div>{cloudy}%</div>
        </li>
        <li className="weather-details-item">
          <div>Humidity</div>
          <div>{humidity}%</div>
        </li>
        <li className="weather-details-item">
          <div>Wind</div>
          <div>{windSpeed} km/h</div>
        </li>
        <li className="weather-details-item">
          <div>Rain</div>
          <div>0 mm</div>
        </li>
      </ul>
    </div>
  );
};

export default WeatherDetails;
