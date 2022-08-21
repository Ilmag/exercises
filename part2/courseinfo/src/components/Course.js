// import React from "react";

const Header = ({ name }) => {
  return <h2> {name} </h2>;
};

const Part = (props) => {
  return (
    <p>
      {" "}
      {props.name} {props.exercises}{" "}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {" "}
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}{" "}
    </div>
  );
};

const Total = ({ exercises }) => {
  return (
    <h3>
      {" "}
      total of {exercises.reduce((acc, curr) => acc + curr)}
      exersises{" "}
    </h3>
  );
};

const Course = ({ course }) => {
  const exercises = course.parts.map((part) => part.exercises);
  return (
    <div>
      <Header name={course.name} /> <Content parts={course.parts} />{" "}
      <Total exercises={exercises} />{" "}
    </div>
  );
};

export default Course;
