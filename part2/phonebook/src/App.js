import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phoneServices from "./services/phones.js";
import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterNumber, setFilterNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    phoneServices.getAll().then((initialData) => setPersons(initialData));
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

  const removeItem = (id) => {
    const personsName = persons.filter((person) => person.id === id)[0].name;
    if (window.confirm(`Delete ${personsName}?`)) {
      setPersons(persons.filter((person) => person.id !== id));
      axios
        .delete(`${baseUrl}/${id}`)
        .then((response) => console.log(response));
    }
  };

  const addNewPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (persons.map((person) => person.name).includes(newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
    } else {
      phoneServices.create(newPerson).then((returnedData) => {
        setPersons(persons.concat(returnedData));
        setNewName("");
        setNewNumber("");
        setFilteredPersons(persons.concat(returnedData));
      });
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
      <Persons
        filteredPersons={filteredPersons}
        persons={persons}
        removeItem={removeItem}
      />{" "}
    </div>
  );
};

export default App;

// axios
//       .delete(`${baseUrl}/${id}`)
//       .then(console.log(persons))
//       .then(setPersons(persons.filter((person) => person.id !== id)))
//       .then(console.log(persons))
//       .then(setFilteredPersons(persons));
