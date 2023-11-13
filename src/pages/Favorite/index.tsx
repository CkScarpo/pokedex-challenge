/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { FavoritesContext } from "../../context/FavoriteContext";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PokedexCard from "../../components/PokedexCard";
import Button from "@mui/material/Button";

const FavoritePage: React.FC = () => {
  const { favorites, setFavorites } = useContext(FavoritesContext);
  useEffect(() => {
    localStorage.getItem("favorite")
      ? setFavorites(JSON.parse(`${localStorage.getItem("favorite")}`))
      : setFavorites([...favorites]);
  }, []);

  return (
    <>
      <Container>
        <div>
          <Grid container spacing={2}>
            {favorites?.map((pokeDetails) => (
              <>
                {!pokeDetails.name.length ? (
                  <Button variant="contained" style={{ marginTop: "200px" }}>
                    Adicone algum Pokemon como favorio para ele aparecer aqui
                  </Button>
                ) : (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={pokeDetails.name}
                  >
                    <PokedexCard pokemon={pokeDetails} />
                  </Grid>
                )}
              </>
            ))}
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default FavoritePage;
