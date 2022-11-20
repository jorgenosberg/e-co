import { createRoot } from "react-dom/client";

import App from "./App";

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <MuiThemeProvider>
      <App />
  </MuiThemeProvider>
);
