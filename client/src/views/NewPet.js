import React, { useState } from "react";

import axios from "axios";
import { navigate } from "@reach/router";
import { Link } from "@reach/router";

const NewPets = (props) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [skillOne, setSkillOne] = useState("");
  const [skillTwo, setSkillTwo] = useState("");
  const [skillThree, setSkillThree] = useState("");
  const [errors, setErrors] = useState(null);

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
      .post("http://localhost:8000/api/pets", newPet)
      .then((res) => {
        navigate("/pets");
        console.log(res);
      })
      .catch((err) => {
        /* 
        For validation errors to be caught here, you need
        res.status(400).json(err) in the controller.
        To get validation errors for the edit form, you can do the same as this
        including the conditional rendering below.
        */
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div>
      <h1>Pet Shelter</h1>
      <h3>These pets are looking for a good home</h3>
      <Link to="/pets">back to home</Link>

      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div>
          <label>Pet Name: </label>
          {errors?.name && (
            <span style={{ color: "red" }}>{errors?.name?.message}</span>
          )}
          <input
            onChange={(event) => {
              setName(event.target.value);
            }}
            type="text"
          />
        </div>

        <div>
          <label>Pet Type: </label>
          {errors?.type && (
            <span style={{ color: "red" }}>{errors?.type?.message}</span>
          )}
          <input
            onChange={(event) => {
              setType(event.target.value);
            }}
            type="text"
          />
        </div>

        <div>
          <label>Pet Description: </label>
          {errors?.description && (
            <span style={{ color: "red" }}>
              {errors?.description?.message}
            </span>
          )}
          <input
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            type="text"
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
          />
        </div>
        
        <button>Add Pet</button>
      </form>
    </div>
  );
};

export default NewPets;