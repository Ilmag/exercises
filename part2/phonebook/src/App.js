import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterNumber, setFilterNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterNumber = (e) => {
    setFilterNumber(e.target.value);
    if (e.target.value.length > 0) {
      setFilteredPersons(
        persons.filter((person) =>
          person.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setFilteredPersons(persons);
    }
  };

  const addNewPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };
    if (persons.map((person) => person.name).includes(newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
      setFilteredPersons(persons.concat(newPerson));
    }
  };

  return (
    <div>
      <h2> Phonebook </h2>{" "}
      <div>
        <Filter
          filterNumber={filterNumber}
          handleFilterNumber={handleFilterNumber}
        />{" "}
      </div>{" "}
      <div>
        <h3> add a new </h3>{" "}
        <PersonForm
          addNewPerson={addNewPerson}
          newName={newName}
          handleNewName={handleNewName}
          newNumber={newNumber}
          handleNewNumber={handleNewNumber}
        />{" "}
      </div>{" "}
      <h3> Numbers </h3>{" "}
      <Persons filteredPersons={filteredPersons} persons={persons} />{" "}
    </div>
  );
};

export default App;
