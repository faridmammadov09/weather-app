import "./LocationList.css";

const LocationList = ({ locations }) => {
  return (
    <div className="searched-locations">
      <h4 className="searched-locations-title">Latest searched locations</h4>

      <ul className="location-list">
        {locations.map((location, index) => (
          <li className="location-item" key={index}>
            {location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationList;
