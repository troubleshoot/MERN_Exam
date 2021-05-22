import { Link, Redirect, Router } from "@reach/router";

import "./App.css";

import Pets from "./views/Pets";
import Pet from "./views/Pet";
import NewPet from "./views/NewPet";
import EditPet from "./views/EditPet";

function App() {
  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      {/* <nav style={{ textAlign: "center" }}>
        <Link to="/pets">Pets</Link>{" "}
        <Link to="/pets/new">New Pet</Link>
        <hr />
      </nav> */}

      <Router>
        <Redirect from="/" to="/pets" noThrow="true" />
        <Pets path="/pets" />
        <Pet path="/pets/:id" />
        <NewPet path="/pets/new" />
        <EditPet path="/pets/:id/edit" />
      </Router>
    </div>
  );
}

export default App;