import { useEffect, useState } from "react";

const localCache = {};

export const useBreedList = (animal) => {
  const [breedList, setBreedList] = useState([]);

  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    const getBreedList = async () => {
      setBreedList([]);
      setStatus("loading");
      const breedListResponse = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const jsonBreedList = await breedListResponse.json();
      localCache[animal] = jsonBreedList.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    };

    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      getBreedList();
    }
  }, [animal]);

  return [breedList, status];
};
