import { useEffect, useState } from "react";
import axios from "axios";
import Country from "./components/Country";
import Header from "./components/Header";
import List from "./components/List";

const App = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [toFind, setToFind] = useState("select country");
  const [allCountries, setAllCountries] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setAllCountries(response.data);
    });
  }, []);

  const handleFindCountry = (e) => {
    console.log(e.target.value);
    setToFind(e.target.value);
    setSelected(
      allCountries.filter((country) =>
        country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  console.log(allCountries);
  console.log(selected);

  if (selected.length === 1) {
    return (
      <div>
        <Header toFind={toFind} handleFindCountry={handleFindCountry} />
        <Country selected={selected} apiKey={apiKey} />
      </div>
    );
  } else if (selected.length > 1 && selected.length <= 10) {
    return (
      <div>
        <Header toFind={toFind} handleFindCountry={handleFindCountry} />
        <List selected={selected} />
      </div>
    );
  } else if (selected.length > 10) {
    return (
      <div>
        <Header toFind={toFind} handleFindCountry={handleFindCountry} />
        <p>too many matches, specify another filter</p>
      </div>
    );
  }

  return <Header toFind={toFind} handleFindCountry={handleFindCountry} />;
};

export default App;
