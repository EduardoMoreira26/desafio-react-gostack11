import React, { useState, useEffect } from "react";

import api from "./services/api"; 

import "./styles.css";

function App() {


  const [repositories, setRepositories] = useState([]);

 useEffect(() => {
   api.get("repositories").then(response => {
     setRepositories(response.data);
   });
 }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post("repositories", {
      title: "Backend com PHP",
      url: "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs",
      techs: "PHP, HTML, CSS, ...",
      likes: 0,
    });

    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);

  }

  async function handleRemoveRepository(id) {
    
    const response = await api.delete("repositories");

    console.log(response);

    // const repositorie = response.splice(id);
    // setRepositories([...repositories, repositorie])
  }

  return (
    <div>

      <ul data-testid="repository-list">

        {repositories.map((repositorie) => 
        <li key={repositorie.id}>{repositorie.title}
          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li>
        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
