import React, { useEffect, useState } from "react";

import { Link, navigate } from "@reach/router";

import axios from "axios";

const EditPet = (props) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [skillOne, setSkillOne] = useState("");
  const [skillTwo, setSkillTwo] = useState("");
  const [skillThree, setSkillThree] = useState("");
  const [errors, setErrors] = useState(null);

  /* 
  Empty arr as second argument means this will only happen on the first render
  of this component.
  Get the current data from DB to pre-fill input boxes.
  */
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pets/" + props.id)
      .then((res) => {
        setName(res.data.name);
        setType(res.data.type);
        setDescription(res.data.description);
        setSkillOne(res.data.skillOne);
        setSkillTwo(res.data.skillTwo);
        setSkillThree(res.data.skillThree);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPet = {
      name: name,
      type: type,
      description: description,
      skillOne: skillOne,
      skillTwo: skillTwo,
      skillThree: skillThree,

    };

    axios
      .put("http://localhost:8000/api/pets/" + props.id, newPet)
      .then((res) => {
        navigate("/pets/" + props.id);
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div>
      <h1>Pet Shelter</h1>
      <h3>Edit {name}</h3>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div>
          <label>Name: </label>
          {errors?.name && (
            <span style={{ color: "red" }}>{errors?.name?.message}</span>
          )}
          <input
            onChange={(event) => {
              setName(event.target.value);
            }}
            type="text"
            value={name}
          />
        </div>

        <div>
          <label>Type: </label>
          {errors?.name && (
            <span style={{ color: "red" }}>{errors?.type?.message}</span>
          )}
          <input
            onChange={(event) => {
              setType(event.target.value);
            }}
            type="text"
            value={type}
          />
        </div>

        <div>
          <label>Description: </label>
          {errors?.name && (
            <span style={{ color: "red" }}>{errors?.description?.message}</span>
          )}
          <input
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            type="text"
            value={description}
          />
        </div>

        <p>Skills(Optional):</p>

        <div>
          <label>Skill 1: </label>
          {errors?.skillOne && (
            <span style={{ color: "red" }}>
              {errors?.skillOne?.pet}
            </span>
          )}
          <input
            onChange={(event) => {
              setSkillOne(event.target.value);
            }}
            type="text"
            value={skillOne}
          />
        </div>

        <div>
          <label>Skill 2: </label>
          {errors?.skillTwo && (
            <span style={{ color: "red" }}>
              {errors?.skillTwo?.pet}
            </span>
          )}
          <input
            onChange={(event) => {
              setSkillTwo(event.target.value);
            }}
            type="text"
            value={skillTwo}
          />
        </div>
        
        <div>
          <label>Skill 3: </label>
          {errors?.skillThree && (
            <span style={{ color: "red" }}>
              {errors?.skillThree?.pet}
            </span>
          )}
          <input
            onChange={(event) => {
              setSkillThree(event.target.value);
            }}
            type="text"
            value={skillThree}
          />
        </div>
        <button>Edit Pet</button>
      </form>
      <Link to="/pets">back to home</Link>
    </div>
  );
};

export default EditPet;