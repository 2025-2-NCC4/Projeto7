import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252", 
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#ccd1e0",
          200: "#99a3c2",
          300: "#6674a3",
          400: "#334685",
          500: "#001866", // Azul escuro da logo
          600: "#001352",
          700: "#000e3d",
          800: "#000a29",
          900: "#000514",
        },
        greenAccent: {
          100: "#d6f5e6",
          200: "#adebcd",
          300: "#85e2b5",
          400: "#5cd89c",
          500: "#33ce83", // Verde da logo
          600: "#29a569",
          700: "#1f7c4f",
          800: "#145234",
          900: "#0a291a",
        },
        yellowAccent: {
          100: "#fff2cc",
          200: "#ffe599",
          300: "#ffd866",
          400: "#ffcb33",
          500: "#ffbe00", // Amarelo da logo
          600: "#cc9800",
          700: "#997200",
          800: "#664c00",
          900: "#332600",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#ccd9ff",
          200: "#99b3ff",
          300: "#668cff",
          400: "#3366ff",
          500: "#0040ff", // Azul mais vibrante
          600: "#0033cc",
          700: "#002699",
          800: "#001a66",
          900: "#000d33",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#000514",
          200: "#000a29",
          300: "#000e3d",
          400: "#f2f0f0", // mantido manualmente
          500: "#001866",
          600: "#334685",
          700: "#6674a3",
          800: "#99a3c2",
          900: "#ccd1e0",
        },
        greenAccent: {
          100: "#0a291a",
          200: "#145234",
          300: "#1f7c4f",
          400: "#29a569",
          500: "#33ce83",
          600: "#5cd89c",
          700: "#85e2b5",
          800: "#adebcd",
          900: "#d6f5e6",
        },
        yellowAccent: {
          100: "#332600",
          200: "#664c00",
          300: "#997200",
          400: "#cc9800",
          500: "#ffbe00",
          600: "#ffcb33",
          700: "#ffd866",
          800: "#ffe599",
          900: "#fff2cc",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#000d33",
          200: "#001a66",
          300: "#002699",
          400: "#0033cc",
          500: "#0040ff",
          600: "#3366ff",
          700: "#668cff",
          800: "#99b3ff",
          900: "#ccd9ff",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};