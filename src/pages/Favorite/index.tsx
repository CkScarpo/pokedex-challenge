import React, { useContext } from "react";
import { FavoritesContext } from "../../context/FavoriteContext";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PokedexCard from "../../components/PokedexCard";

const FavoritePage: React.FC = () => {
  const { favorites } = useContext(FavoritesContext);
  return (
    <>
      <Container>
        <div>
          <Grid container spacing={2}>
            {favorites?.map((pokeDetails) => (
              <>
                <Grid item xs={12} sm={6} md={4} lg={3} key={pokeDetails.name}>
                  <PokedexCard pokemon={pokeDetails} />
                </Grid>
              </>
            ))}
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default FavoritePage;
