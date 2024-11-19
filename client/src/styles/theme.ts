import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // Can be toggled to 'dark' dynamically if needed
    primary: {
      main: "#1976d2", // Blue as the primary color
    },
    secondary: {
      main: "#ff5722", // Orange for secondary actions
    },
    background: {
      default: "#f5f5f5", // Light background for main pages
      paper: "#ffffff", // White for cards and modals
    },
    text: {
      primary: "#333333", // Default text color
      secondary: "#666666", // Muted text color
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    button: {
      textTransform: "none", // Removes uppercase transformation for buttons
      fontWeight: 500,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1976d2", // Matches the primary palette
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Adds rounded corners to buttons
          textTransform: "none",
          padding: "10px 16px",
        },
        containedPrimary: {
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            backgroundColor: "#1565c0", // Darker shade for hover
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16, // Rounded corners for cards
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "1rem", // Consistent spacing for form fields
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h4: {
          marginBottom: "1rem", // Adds spacing below headers
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 120,
          height: 120,
          margin: "0 auto",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
  spacing: 8, // Default spacing unit, used for consistent padding and margins
});

export default theme;
