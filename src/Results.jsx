import React from "react";

import { Pet } from "./Pet";

export const Results = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h1>Pets not found</h1>
      ) : (
        pets.map((pet) => (
          <Pet
            animal={pet.animal}
            key={pet.id}
            name={pet.name}
            breed={pet.breed}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
            id={pet.id}
          />
        ))
      )}
    </div>
  );
};
