import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export const Context = React.createContext();

export const Provider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const [favLoading, setFavLoading] = useState(true);

  //Function to get saved Favourites
  const getFavourites = async () => {
    let savedFavourites = await SecureStore.getItemAsync('favourites');

    if (savedFavourites != null) {
      savedFavourites = JSON.parse(savedFavourites);
      setFavourites(savedFavourites);
      setFavLoading(false);
    } else {
      setFavLoading(false);
    }
  };

  const saveFavourites = () => {
    const newFaves = JSON.stringify(favourites);
    SecureStore.setItemAsync('favourites', newFaves);
  };

  useEffect(() => {
    //Code to delete for testing
    //SecureStore.deleteItemAsync('favourites');
    getFavourites();
  }, []);

  return (
    <Context.Provider value={{ favourites, setFavourites, saveFavourites }}>
      {children}
    </Context.Provider>
  );
};
