import React, { useContext, useEffect, useState } from "react";

import { useBreedList } from "./useBreedList";
import { Pet } from "./Pet";
import { Results } from "./Results";
import { ThemeContext } from "./ThemeContext";

export const SearchParam = () => {
  //const location = "London, United Kingdom";
  const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

  //const locationRef = createRef();
  const [location, setLocation] = useState("");

  const [animal, updateAnimals] = useState("");

  const [breed, updateBreed] = useState("");

  const [pets, setPets] = useState([]);

  const [breedList] = useBreedList(animal || ANIMALS[0]);

  useEffect(() => fetchPets(), []);

  const [theme, setTheme] = useContext(ThemeContext);

  // const fetchPets = () =>{
  //   fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`).then(res=> res.json()).then(jsonResult => setPets(jsonResult.pets));
  // }
  const fetchPets = async () => {
    let requestedAnimal = animal || ANIMALS[0];
    var results = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${requestedAnimal}&location=${location}&breed=${breed}`
    );
    var jsonPets = await results.json();
    setPets(jsonPets.pets);
  };

  return (
    <div className="search-params">
      <Results pets={pets} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchPets();
        }}
      >
        <label htmlFor="location">
          Location
          {/*<input id="location" placeholder='Locations' defaultValue='London' ref={locationRef} />*/}
          <input
            id="location"
            placeholder="Locations"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
        </label>
        <label htmlFor="animals">
          <select
            id="animal"
            onChange={(e) => updateAnimals(e.target.value)}
            onBlur={(e) => updateAnimals(e.target.value)}
          >
            {ANIMALS.map((optionAnimal) => (
              <option key={optionAnimal} id={optionAnimal} value={optionAnimal}>
                {optionAnimal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          <select
            id="breed"
            disabled={!breedList.length}
            onChange={(e) => updateBreed(e.target.value)}
            onBlur={(e) => updateBreed(e.target.value)}
          >
            {breedList.map((optionBreed) => (
              <option key={optionBreed} value={optionBreed}>
                {optionBreed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button id="submitButton" style={{ backgroundColor: theme }}>
          Submit
        </button>
      </form>
    </div>
  );
};
