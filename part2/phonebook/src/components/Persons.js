import React from "react";
const Persons = (props) => {
  if (props.filteredPersons.length > 0) {
    return (
      <div>
        {props.filteredPersons.map((person) => (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        {props.persons.map((person) => (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        ))}
      </div>
    );
  }
};

export default Persons;
