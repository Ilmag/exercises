const List = ({ selected }) => {
  const openCountryView = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  console.log(selected);

  return (
    <div>
      {selected.map((country) => (
        <p key={country.tld}>
          {country.name.common}
          <button onClick={() => openCountryView(country.maps.googleMaps)}>
            show
          </button>
        </p>
      ))}
    </div>
  );
};

export default List;
