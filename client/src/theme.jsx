import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Define the theme
const theme = createTheme({
  typography: {
    // fontFamily: "Cinzel, Roboto Serif, Arial, sans-serif",
  },
  components: {
    // Custom Buttons
    MuiButton: {
      variants: [
        // Custom Contained Button
        {
          props: { variant: "contained", color: "custom" },
          style: {
            borderRadius: "2px",
            letterSpacing: "1px",
            boxShadow: "none",
            padding: "8px 4px",
            fontSize: "1rem",
            fontFamily: '"Roboto Serif", serif',
            fontWeight: "600 !important",
            width: "100%",
            maxHeight: "47px",
            background: "#a16149",
            color: "#fff",
            "&:hover": {
              boxShadow: "none",
              background: "#8c4e3d",
            },
            "@media (max-width:768px)": {
              padding: "8px 2px",
              fontSize: "0.875rem",
            },
            "@media (max-width:600px)": {
              padding: "8px 2px",
              fontSize: "0.75rem",
            },
          },
        },
        // Custom Outlined Button
        {
          props: { variant: "outlined", color: "custom" },
          style: {
            borderRadius: "2px",
            letterSpacing: "1px",
            boxShadow: "none",
            padding: "8px 4px",
            fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem" },
            fontFamily: '"Roboto Serif", serif',
            fontWeight: "600 !important",
            border: "2px solid #a16149",
            color: "#a16149",
            width: "100%",
            maxHeight: "47px",
            // margin: "auto 5px",
            "&:hover": {
              color: "white",
              borderColor: "#8c4e3d",
              background: "#a16149",
              boxShadow: "none",
            },
            "@media (max-width:768px)": {
              padding: "8px 2px",
              fontSize: "0.875rem",
            },
            "@media (max-width:600px)": {
              padding: "8px 2px",
              fontSize: "0.75rem",
            },
          },
        },
      ],
    },
    // Custom Icon Buttons
    MuiIconButton: {
      variants: [
        // Contained Icon Button
        {
          props: { variant: "contained", color: "custom" },
          style: {
            borderRadius: "2px", // Square shape
            boxShadow: "none",
            background: "#a16149",
            color: "#fff",
            maxWidth: "47px",
            maxHeight: "47px",
            // margin: "auto 5px",

            "&:hover": {
              boxShadow: "none",
              background: "#8c4e3d",
            },
          },
        },
        // Outlined Icon Button
        {
          props: { variant: "outlined", color: "custom" },
          style: {
            borderRadius: "2px", // Square shape
            boxShadow: "none",
            border: "2px solid #a16149",
            color: "#a16149",
            width: { xs: "20px !important", sm: "20px", md: "1rem" },
            height: { xs: "20px !important", sm: "20px", md: "20px" },
            marginRight: "5px",
            "&:hover": {
              color: "white",
              borderColor: "#8c4e3d",
              background: "#a16149",
              boxShadow: "none",
            },
            // "@media (max-width:600px)": {
            //   width: "40px",
            //   height: "40px",
            // },
          },
        },
      ],
    },
  },
});

const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
