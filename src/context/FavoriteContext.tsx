import React, { useState } from "react";
import { PokemonDetail } from "../@types/getAllPokemons";

interface FavoriteContextProps {
  favorites: PokemonDetail[];
  setFavorites: React.Dispatch<React.SetStateAction<PokemonDetail[]>>;
}

const FavoriteContext = React.createContext<FavoriteContextProps>({
  favorites: [],
  setFavorites: () => {},
});

interface headerProps {
  children: React.ReactNode;
}

export const FavoriteProvider: React.FC<headerProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<PokemonDetail[]>([]);
  return (
    <FavoriteContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};
