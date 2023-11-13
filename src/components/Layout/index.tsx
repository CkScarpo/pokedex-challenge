import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Container,
  Box,
  Drawer,
  List,
  ListItem,
  useTheme,
  ThemeProvider,
  CssBaseline,
  createTheme,
  Switch,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import routesConfig from "../../routes/routes";
import { HeaderCustom } from "./styles";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const Layout: React.FC = () => {
  const routes = routesConfig[0].children;
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const [mode, setMode] = useState<"light" | "dark">("light");

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const customTheme = createTheme({
    ...theme,
    palette: {
      mode,
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <ColorModeContext.Provider value={{ toggleColorMode }}>
        <AppBar position="fixed">
          <Toolbar style={{ background: "#1e1e1e", width: "100%" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleDrawerOpen}
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
            <Box>
              <Switch
                sx={{ ml: 1 }}
                color="default"
                onChange={toggleColorMode}
                checked={theme.palette.mode === "dark"}
                icon={<LightModeIcon />}
                checkedIcon={<DarkModeIcon />}
              />
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerClose}>
          <List>
            {routes.map((item) => (
              <ListItem key={item.path} onClick={handleDrawerClose}>
                <Button startIcon={item.icon}>
                  <Link
                    style={{ color: "black", textDecoration: "none" }}
                    to={item.path}
                  >
                    <span>{item.name}</span>
                  </Link>
                </Button>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Container maxWidth="lg">
          <Box mt={2}>
            <Outlet />
          </Box>
        </Container>
      </ColorModeContext.Provider>
    </ThemeProvider>
  );
};

export default Layout;
