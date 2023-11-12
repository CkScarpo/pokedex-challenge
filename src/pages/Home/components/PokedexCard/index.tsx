import Card from "@mui/material/Card";
import { PokemonDetail } from "../../../../@types/getAllPokemons";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import { Favorite } from "@mui/icons-material";

interface PokemonDetailProps {
  pokemon: PokemonDetail;
}

const PokedexCard: React.FC<PokemonDetailProps> = ({ pokemon }) => {
  console.log(pokemon);
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
            onClick={
              () => {}
              // isFavorite ? removePokemonFromFavorites() : addPokemonToFavorite()
            }
            aria-label="add to favorites"
          >
            <Favorite color={`error`} />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default PokedexCard;
