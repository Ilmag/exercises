const Filter = (props) => {
  return (
    <div>
      number shown on
      <input value={props.filterNumber} onChange={props.handleFilterNumber} />
    </div>
  );
};

export default Filter;
