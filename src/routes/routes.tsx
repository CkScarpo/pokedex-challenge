import Layout from "../components/Layout";
import HomePage from "../pages/Home";

const routesConfig = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        name: "Inicio",
        icon: "",
        element: <HomePage />,
      },
    ],
  },
];

export default routesConfig;
