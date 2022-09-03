import { useEffect, useState } from "react";
import axios from "axios";

const Country = (props) => {
  const [local, setLocal] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${props.selected[0].latlng[0]}&lon=${props.selected[0].latlng[1]}&&appid=${props.apiKey}`
      )
      .then((response) => setLocal(response.data));
  }, []);

  console.log(local);
  console.log(Object.keys(local).length);
  console.log(local.weather[0].icon);

  if (Object.keys(local).length > 0) {
    return (
      <div>
        <h1>{props.selected[0].name.common}</h1>
        <p>capital {props.selected[0].capital}</p>
        <p>area {props.selected[0].area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.entries(props.selected[0].languages).map((language) => (
            <li key={language[0]}>{language[1]}</li>
          ))}
        </ul>
        <img src={props.selected[0].flags.svg} width="150" height="150" />
        <h1>Whether in {props.selected[0].capital}</h1>
        <p>temperature {(local.main.temp - 273.15).toFixed(2)}</p>
        <img
          src={`https://openweathermap.org/img/wn/${local.weather[0].icon}.png`}
        />
        <p>wind {local.wind.speed} m/s</p>
      </div>
    );
  }
};

export default Country;
