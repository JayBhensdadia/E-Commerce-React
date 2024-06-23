import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import { Provider } from "react-redux";
import { store } from "./state/store.ts";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/sonner.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="jb-ui-theme">
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster position="bottom-left" closeButton={true} />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
);
