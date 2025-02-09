import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "@/lib/store";
import { ThemeProvider } from "@/components/ThemeProvider.tsx";
import { Toaster } from "@/components/ui/toaster";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="theme">
    <Provider store={store}>
      <PersistGate loading={<h1>loading...</h1>} persistor={persistor}>
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ThemeProvider>
);
