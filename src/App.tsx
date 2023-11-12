import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routesConfig from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FavoriteProvider } from "./context/FavoriteContext";

const router = createBrowserRouter(routesConfig);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// staleTime: Infinity,
//       retry: 10,
//       retryDelay: 1000,

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoriteProvider>
        <RouterProvider router={router} />;
      </FavoriteProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
