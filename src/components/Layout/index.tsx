import React from "react";
import { Link, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import MenuIcon from "@mui/icons-material/Menu";
import { HeaderCustom } from "./styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import routesConfig from "../../routes/routes";
import Button from "@mui/material/Button";

const Layout: React.FC = () => {
  const routes = routesConfig[0].children;
  return (
    <>
      <AppBar position="static">
        <Toolbar style={{ background: "#1e1e1e", width: "100%" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <div>
              <HeaderCustom>
                Pokédex
                {<CatchingPokemonIcon style={{ marginLeft: "0.75rem" }} />}
              </HeaderCustom>
            </div>
          </Typography>
          {routes.map((item) => (
            <Button
              variant="outlined"
              style={{ marginLeft: "1rem" }}
              startIcon={item.icon}
            >
              <Link style={{ color: "white" }} to={item.path}>
                <span>{item.name}</span>
              </Link>
            </Button>
          ))}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box mt={2}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default Layout;
