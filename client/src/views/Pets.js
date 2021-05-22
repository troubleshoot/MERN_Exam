import React, { useEffect, useState } from "react";

import { Link } from "@reach/router";
import axios from "axios";

const Pets = (props) => {
  const [pets, setPets] = useState([]);

  /* 
  Empty arr as second argument means this will only happen on the first render
  of this component.
  */
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pets")
      .then((res) => {
        setPets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (pToDel) => {
    axios
      .delete("http://localhost:8000/api/pets/" + pToDel._id)
      .then((res) => {
        const filteredPets = pets.filter((p) => {
          return p !== pToDel;
        });

        // Update state to remove the item so the component re-renders.
        setPets(filteredPets);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <table>
      <h1>Pet Shelter</h1>
      <h3>These pets are looking for a good home</h3>
      <Link to="/pets/new">add a pet to the shelter</Link>
      <div>
      <th>Name</th>
      <th>Type</th>
      <th>Actions</th>
      {pets.map((p) => {
        return (
          <tr>
            <td>{p.name}</td>
            <td>{p.type}</td>
            <td><Link to={`/pets/${p._id}`}>details</Link>{" "} 
              | <Link to={`/pets/${p._id}/edit`}>edit</Link>{" "}</td>
          </tr>
        );
      })}
      </div>
    </table>
  );
};

export default Pets;