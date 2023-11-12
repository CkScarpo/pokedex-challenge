import { getAllPokemons } from "../../services/api";
import Grid from "@mui/material/Grid";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Container, LinearProgress } from "@mui/material";
import PokedexCard from "../../components/PokedexCard";

const HomePage: React.FC = () => {
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["getAllPokemons"],
    queryFn: getAllPokemons,
  });

  return (
    <>
      {isRefetching && (
        <LinearProgress variant="indeterminate" color="secondary" />
      )}
      <Container>
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
          </>
        ) : (
          <div>
            <CircularProgress />
          </div>
        )}
      </Container>
    </>
  );
};

export default HomePage;
