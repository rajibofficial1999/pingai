import { createContext } from "react";

export type ThemeType = "dark" | "light" | "system";

type ThemeProviderState = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);
