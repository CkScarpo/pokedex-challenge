import { CatchingPokemon, Favorite } from "@mui/icons-material";
import Layout from "../components/Layout";
import FavoritePage from "../pages/Favorite";
import HomePage from "../pages/Home";

const routesConfig = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        name: "Pokemons",
        icon: <CatchingPokemon />,
        element: <HomePage />,
      },
      {
        path: "/favoritos",
        name: "Favoritos",
        icon: <Favorite />,
        element: <FavoritePage />,
      },
    ],
  },
];

export default routesConfig;
