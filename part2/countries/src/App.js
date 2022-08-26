import { useEffect, useState } from "react";
import axios from "axios";

const Country = (props) => {
  return (
    <div>
      <h1>{props.countries[0].name.common}</h1>
      <p>capital {props.countries[0].capital}</p>
      <p>area {props.countries[0].area}</p>
      <h4>languages:</h4>
      <ul>
        {Object.entries(props.countries[0].languages).map((language) => (
          <li key={language[0]}>{language[1]}</li>
        ))}
      </ul>
      <img src={props.countries[0].flags.svg} width="150" height="150" />
    </div>
  );
};

const Header = (props) => {
  return (
    <div>
      <p> find country </p>
      <input value={props.selectCountry} onChange={props.handleSelectCountry} />
    </div>
  );
};

const App = () => {
  const [data, setData] = useState([]);
  const [selectCountry, setSelectCountry] = useState("select country");
  const [countries, setCountries] = useState([]);

  const handleSelectCountry = (e) => {
    setSelectCountry(e.target.value);
    const selected = data.filter((country) =>
      country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setCountries(selected);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setData(response.data);
    });
  }, []);

  const openCountryView = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  console.log(countries);

  if (countries.length === 0) {
    return (
      <Header
        selectCountry={selectCountry}
        handleSelectCountry={handleSelectCountry}
      />
    );
  } else if (countries.length <= 10 && countries.length !== 1) {
    return (
      <div>
        <Header
          selectCountry={selectCountry}
          handleSelectCountry={handleSelectCountry}
        />
        {countries.map((country) => (
          <>
            <p key={country.tld}>
              {country.name.common}{" "}
              <button onClick={() => openCountryView(country.maps.googleMaps)}>
                show
              </button>
            </p>
          </>
        ))}
      </div>
    );
  } else if (countries.length > 10) {
    return (
      <div>
        <Header
          selectCountry={selectCountry}
          handleSelectCountry={handleSelectCountry}
        />
        <p>Too many matches</p>
      </div>
    );
  } else if (countries.length === 1) {
    return (
      <div>
        <Header
          selectCountry={selectCountry}
          handleSelectCountry={handleSelectCountry}
        />
        <Country countries={countries} />
      </div>
    );
  }
};

export default App;
