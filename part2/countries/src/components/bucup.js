import { useEffect, useState } from "react";
import axios from "axios";

const Local = (props) => {
  return (
    <div>
      <h1>Whether in {props.countries[0].capital}</h1>
      <p>temperature {(props.local.main.temp - 273.15).toFixed(2)}</p>
      <img
        src={`https://openweathermap.org/img/wn/${props.local.whether[0].icon}.png`}
      />
      <p>wind {props.local.wind.speed} m/s</p>
    </div>
  );
};

const Country = (props) => {
    REACT_APP_API_KEY=2d739be4e68a56edcd5f87985520a2de npm start
  const apiID = "2d739be4e68a56edcd5f87985520a2de";
  const [local, setLocal] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${props.countries[0].latlng[0]}&lon=${props.countries[0].latlng[1]}&&appid=${apiID}`
      )
      .then((response) => setLocal(response.data));
  }, []);

  console.log(apiID);
  console.log(props.countries);
  console.log(local);

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
      <Local local={local} countries={props.countries} />
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
