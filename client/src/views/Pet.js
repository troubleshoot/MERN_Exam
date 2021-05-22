import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link, navigate } from "@reach/router";

const Pet = (props) => {
  const [p, setMsg] = useState({});

  const handleDelete = () => {
    axios
      .delete("http://localhost:8000/api/pets/" + props.id)
      .then((res) => {
        navigate("/pets");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* 
  Get the current data from DB to display.
  */
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pets/" + props.id)
      .then((res) => {
        console.log(res);
        setMsg(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);

  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      <h1>Pet Shelter</h1>
      <h3>Details about: {p.name}</h3>
      <h5>Pet Type: {p.type}</h5>
      <h5>Pet Description: {p.description}</h5>
      <h5>Pet Skills: {p.skillOne}, {p.skillTwo}, {p.skillThree}</h5>
      <div>
        <button
          onClick={(event) => {
            handleDelete();
          }}
        >
          Adopt {p.name}
        </button>
      </div>
      <hr />
      <Link to="/pets">back to home</Link>
    </div>
  );
};

export default Pet;