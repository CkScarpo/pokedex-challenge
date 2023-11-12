import React, { useState } from "react";
import { PokemonDetail } from "../@types/getAllPokemons";

interface FavoritesContextProps {
  favorites: PokemonDetail[];
  setFavorites: React.Dispatch<React.SetStateAction<PokemonDetail[]>>;
}

export const FavoritesContext = React.createContext<FavoritesContextProps>({
  favorites: [],
  setFavorites: () => {},
});

interface headerProps {
  children: React.ReactNode;
}

export const FavoriteProvider: React.FC<headerProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<PokemonDetail[]>([]);
  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
