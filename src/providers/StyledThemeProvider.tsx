import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useEffect,
} from "react";
import { DefaultTheme, ThemeProvider } from "styled-components/native";

import { lightTheme, darkTheme } from "@/themes";

type StyledThemeType = {
  toggleTheme: () => void;
  theme: DefaultTheme;
  currentMode: modes | null;
};

const StyledThemeContext = createContext<StyledThemeType>({
  toggleTheme: () => {},
  theme: lightTheme,
  currentMode: null,
});

type modes = "light" | "dark";

const StyledThemeProvider = ({ children }: PropsWithChildren) => {
  const [currentMode, setCurrentMode] = useState<modes>("light");

  useEffect(() => {
    const bootAsync = async () => {
      const theme = await AsyncStorage.getItem("theme");

      if (theme) {
        setCurrentMode(theme as unknown as modes);
      }
    };

    bootAsync();
  }, []);

  useEffect(() => {
    const bootAsync = async () => {
      await AsyncStorage.setItem("theme", currentMode);
    };

    bootAsync();
  }, [currentMode]);

  const toggleTheme = () => {
    setCurrentMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = currentMode === "light" ? lightTheme : darkTheme;

  return (
    <StyledThemeContext.Provider value={{ toggleTheme, theme, currentMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledThemeContext.Provider>
  );
};

export const useStyledTheme = () => useContext(StyledThemeContext);

export default StyledThemeProvider;
