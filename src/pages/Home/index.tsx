import { getAllPokemons } from "../../services/api";
import Grid from "@mui/material/Grid";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Container,
  LinearProgress,
  TextField,
} from "@mui/material";
import PokedexCard from "../../components/PokedexCard";
import { CustomDiv } from "./styles";
import { useEffect, useState } from "react";

const HomePage: React.FC = () => {
  const [page, setPage] = useState<number>(12);

  useEffect(() => {
    localStorage.getItem("page")
      ? setPage(JSON.parse(`${localStorage.getItem("page")}`))
      : setPage(12);
  }, []);

  const handleClick = () => {
    if (!isPlaceholderData) {
      setPage((pg: number) => pg + 12);
      localStorage.setItem("page", JSON.stringify(page + 12));
    }
  };

  const { data, isLoading, isRefetching, refetch, isPlaceholderData } =
    useQuery({
      queryKey: ["getAllPokemons", page],
      queryFn: () => getAllPokemons(page),
      placeholderData: keepPreviousData,
    });

  return (
    <>
      <Container>
        <CustomDiv>
          <Autocomplete
            disablePortal
            options={
              data?.results.map((pokemon) => ({
                label: `${pokemon.name} - ${pokemon.types
                  .map((typ) => typ.type.name)
                  .join(", ")}`,
              })) || []
            }
            sx={{ width: 300 }}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <li {...props}>
                <div>{option.label}</div>
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Pesquisar por Pokémon"
                variant="outlined"
              />
            )}
          />

          <Button
            variant="outlined"
            style={{ marginTop: "3rem" }}
            onClick={() => {
              localStorage.removeItem("page");
              localStorage.setItem("page", JSON.stringify(12));
              setPage(12);
              refetch();
            }}
          >
            Carregar lista incial de Pokemons
          </Button>
        </CustomDiv>
        {!isLoading ? (
          <>
            <Grid container spacing={2}>
              {data?.results.map((pokeDetails) => (
                <>
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
                </>
              ))}
            </Grid>
            <CustomDiv>
              <Button
                variant="contained"
                disabled={!data?.next}
                onClick={() => handleClick()}
              >
                Carregar mais Pokemons
              </Button>
            </CustomDiv>
          </>
        ) : (
          <CircularProgress />
        )}
        {isRefetching && (
          <LinearProgress
            style={{ marginTop: "1rem" }}
            variant="indeterminate"
            color="secondary"
          />
        )}
      </Container>
    </>
  );
};

export default HomePage;
