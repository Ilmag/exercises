const Notification = ({ notification }) => {
  const noteStyle = {
    backgroundColor: "#c0c4c1",
    backgroundColorOpacity: 0.6,
    color: "green",
    borderColor: "green",
    borderStyle: "solid",
    borderWidth: "px",
    height: "40px",
    marginBottom: "10px",
    borderRadius: "5px",
    paddingBottom: "15px",
    paddingLeft: "5px",
  };

  const noStyle = {};

  if (notification === null) {
    return null;
  } else {
    return (
      <div style={noteStyle}>
        <h3>{notification}</h3>
      </div>
    );
  }
};

export default Notification;
