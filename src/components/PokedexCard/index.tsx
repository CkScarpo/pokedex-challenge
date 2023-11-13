/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { PokemonDetail } from "../../@types/getAllPokemons";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import { Favorite } from "@mui/icons-material";
import { FavoritesContext } from "../../context/FavoriteContext";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getPokemonTypeDetail } from "../../services/api";
import { ListItem } from "@mui/material";
import { ColumnList } from "./styles";

interface PokemonDetailProps {
  pokemon: PokemonDetail;
}

const PokedexCard: React.FC<PokemonDetailProps> = ({ pokemon }) => {
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);

  useEffect(() => {
    localStorage.getItem("favorite")
      ? setFavorites(JSON.parse(`${localStorage.getItem("favorite")}`))
      : setFavorites([...favorites]);
  }, []);

  useEffect(() => {
    const fetchWeaknesses = async () => {
      try {
        if (pokemon.types.length > 0) {
          const weaknessesArray: string[] = [];

          for (const type of pokemon.types) {
            const typeUrl: string = type.type.url;

            const typeId = typeUrl.split("/").reverse()[1];
            const typeDetailsResponse = await getPokemonTypeDetail(typeId);

            const weaknessesForType: string[] =
              typeDetailsResponse?.damage_relations?.double_damage_from.map(
                (weakness: any) => weakness.name
              ) || [];

            weaknessesArray.push(...weaknessesForType);
          }

          setWeaknesses(weaknessesArray);
        } else {
          console.log("O Pokémon não tem tipos.");
        }
      } catch (error) {
        console.error("Erro ao obter fraquezas do Pokémon:", error);
      }
    };

    fetchWeaknesses();
  }, [pokemon.types]);

  const addFavorite = () => {
    setFavorites([...favorites, pokemon]);
    localStorage.setItem("favorite", JSON.stringify([...favorites, pokemon]));
  };

  const removeFavorite = () => {
    setFavorites(
      favorites.filter((pokeFavorite) => pokeFavorite.name !== pokemon.name)
    );

    const favoritesString = localStorage.getItem("favorite");
    const favoritesArray: PokemonDetail[] = JSON.parse(favoritesString || "[]");

    const dynamicIndex = 0;

    if (dynamicIndex >= 0 && dynamicIndex < favoritesArray.length) {
      favoritesArray.splice(dynamicIndex, 1);

      localStorage.setItem("favorite", JSON.stringify(favoritesArray));
    }
  };

  const isFavorite = favorites.some((fav) => fav.name === pokemon.name);

  return (
    <>
      <Card style={{ marginTop: "7rem", minHeight: "500px" }}>
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
        <CardContent>
          {weaknesses.length > 0 && (
            <>
              <Typography variant="subtitle2">Fraquezas:</Typography>
              <ColumnList>
                {weaknesses.map((weakness, index) => (
                  <ListItem key={index}>{weakness}</ListItem>
                ))}
              </ColumnList>
            </>
          )}
        </CardContent>
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
