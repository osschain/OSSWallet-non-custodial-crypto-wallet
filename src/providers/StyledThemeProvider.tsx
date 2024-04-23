import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from "react";
import { DefaultTheme, ThemeProvider } from "styled-components/native";

import { lightTheme, darkTheme } from "@/themes";

type StyledThemeType = {
  toggleTheme: () => void;
  theme: DefaultTheme;
};

const StyledThemeContext = createContext<StyledThemeType>({
  toggleTheme: () => {},
  theme: lightTheme,
});

type modes = "light" | "dark";

const StyledThemeProvider = ({ children }: PropsWithChildren) => {
  const [currentMode, setCurrentMode] = useState<modes>("light");

  const toggleTheme = () => {
    setCurrentMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = currentMode === "light" ? lightTheme : darkTheme;

  return (
    <StyledThemeContext.Provider value={{ toggleTheme, theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledThemeContext.Provider>
  );
};

export const useStyledTheme = () => useContext(StyledThemeContext);

export default StyledThemeProvider;
