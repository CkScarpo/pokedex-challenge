import { getAllPokemons } from "../../services/api";
import Grid from "@mui/material/Grid";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  LinearProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import PokedexCard from "../../components/PokedexCard";
import { CustomDiv } from "./styles";
import { useEffect, useState } from "react";
import { PokemonDetail } from "../../@types/getAllPokemons";

const HomePage: React.FC = () => {
  const [page, setPage] = useState<number>(12);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const { data: Search } = useQuery({
    queryKey: ["getAllPokemons", 1280],
    queryFn: () => getAllPokemons(1280),
  });

  const handlePokemonSelect = (pokemon: PokemonDetail) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Container>
        <CustomDiv>
          <div>
            <Autocomplete
              disablePortal
              options={
                Search?.results.map((pokemon) => ({
                  label: `${pokemon.name} - ${pokemon.types
                    .map((typ) => typ.type.name)
                    .join(", ")}`,
                  value: pokemon,
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
              onChange={(event, value) =>
                value && handlePokemonSelect(value.value)
              }
            />

            <Modal open={isModalOpen} onClose={handleCloseModal}>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {selectedPokemon && (
                  <Card>
                    <CardContent>
                      <Typography variant="h4">
                        Pokémon: {selectedPokemon.name}
                      </Typography>
                      <Typography variant="body1">
                        Tipo:{" "}
                        {selectedPokemon.types
                          .map((typ) => typ.type.name)
                          .join(", ")}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </div>
            </Modal>
          </div>

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
            Recarregar lista incial de Pokemons
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
