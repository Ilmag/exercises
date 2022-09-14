const Persons = (props) => {
  // const removeItem = () => {
  //   console.log("clicked");
  // };
  if (props.filteredPersons.length > 0) {
    return (
      <div>
        {props.filteredPersons.map((person) => (
          <p key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={() => props.removeItem(person.id)}>delete</button>
          </p>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        {props.persons.map((person) => (
          <p key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={() => props.removeItem(person.id)}>delete</button>
          </p>
        ))}
      </div>
    );
  }
};

export default Persons;
