import { getAllPokemons } from "../../services/api";
import { experimentalStyled as styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Container, LinearProgress } from "@mui/material";
import PokedexCard from "./components/PokedexCard";

// import { Container } from './styles';

const HomePage: React.FC = () => {
  //const [pokemons, setPokemons] = useState<IGetPokemonList[]>([]);

  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["getAllPokemons"],
    queryFn: getAllPokemons,
  });

  // useEffect(() => {
  //   getAllPokemons().then((response) => setPokemons(response.results));
  // }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

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
                  <Grid item xs={2} lg={4} key={pokeDetails.name}>
                    <Card variant="outlined">
                      <CardMedia
                        sx={{ height: 100 }}
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          <Item>{pokeDetails.name}</Item>
                          <PokedexCard pokemon={pokeDetails} />
                        </Typography>
                      </CardContent>
                    </Card>
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
