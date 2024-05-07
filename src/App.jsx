import { useRoutes } from "react-router-dom";
import routeConfige from "./router/routes";

import "./App.css";

function App() {
  const router = useRoutes(routeConfige);
  return router;
}

export default App;
