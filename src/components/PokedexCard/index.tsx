import { useContext } from "react";
import Card from "@mui/material/Card";
import { PokemonDetail } from "../../@types/getAllPokemons";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import { Favorite } from "@mui/icons-material";
import { FavoritesContext } from "../../context/FavoriteContext";

interface PokemonDetailProps {
  pokemon: PokemonDetail;
}

const PokedexCard: React.FC<PokemonDetailProps> = ({ pokemon }) => {
  const { favorites, setFavorites } = useContext(FavoritesContext);

  const addFavorite = () => {
    setFavorites([...favorites, pokemon]);
  };

  const removeFavorite = () => {
    setFavorites(
      favorites.filter((pokeFavorite) => pokeFavorite.name !== pokemon.name)
    );
  };

  const isFavorite = favorites.some((fav) => fav.name === pokemon.name);

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          alt={pokemon.name}
          height="140"
          image={pokemon.sprites.front_default}
          title={pokemon.name}
        />
        <CardHeader
          title={pokemon.name}
          subheader={pokemon.types.map((type) => type.type.name).join(", ")}
        />
        <CardActions disableSpacing>
          <IconButton
            onClick={() => (isFavorite ? removeFavorite() : addFavorite())}
            aria-label="add to favorites"
          >
            <Favorite color={isFavorite ? "error" : `disabled`} />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default PokedexCard;
