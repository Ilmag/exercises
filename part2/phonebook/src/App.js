import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import phoneServices from "./services/phones";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    phoneServices.getAll().then((data) => setPersons(data));
  }, []);

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const addNewPerson = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    if (
      persons.filter((person) => person.name === newPerson.name).length === 0
    ) {
      phoneServices
        .create(newPerson)
        .then((person) => setPersons(persons.concat(person)));
      setNewName("");
      setNewNumber("");
      setNotification(`Added ${newPerson.name}.`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } else {
      const personsID = persons.filter(
        (person) => person.name === newPerson.name
      )[0].id;
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        phoneServices
          .update(personsID, newPerson)
          .then((returned) =>
            setPersons(
              persons.map((person) =>
                person.id !== personsID ? person : returned
              )
            )
          );
        setNewName("");
        setNewNumber("");
        setNotification(`${newPerson.name}s number changed.`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    }
  };

  const removePerson = (id) => {
    const personsName = persons.filter((person) => person.id === id)[0].name;
    const restPersons = persons.filter((person) => person.id !== id);
    if (window.confirm(`Delete ${personsName}?`)) {
      phoneServices.remove(id).then(setPersons(restPersons));
    }
  };

  return (
    <div>
      <h2> Phonebook </h2>
      <Notification notification={notification} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonForm
        addNewPerson={addNewPerson}
        handleNewName={handleNewName}
        newName={newName}
        handleNewNumber={handleNewNumber}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} removePerson={removePerson} />
    </div>
  );
};

export default App;
