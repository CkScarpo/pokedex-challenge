import React, { useState } from "react";
import { PokemonDetail } from "../@types/getAllPokemons";

interface PaginationContextProps {
  Paginations: PokemonDetail[];
  setPaginations: React.Dispatch<React.SetStateAction<PokemonDetail[]>>;
}

const PaginationContext = React.createContext<PaginationContextProps>({
  Paginations: [],
  setPaginations: () => {},
});

interface headerProps {
  children: React.ReactNode;
}

export const PaginationProvider: React.FC<headerProps> = ({ children }) => {
  const [Paginations, setPaginations] = useState<PokemonDetail[]>([]);
  return (
    <PaginationContext.Provider value={{ Paginations, setPaginations }}>
      {children}
    </PaginationContext.Provider>
  );
};
