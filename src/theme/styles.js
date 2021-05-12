import { createMuiTheme } from '@material-ui/core/styles';

// https://material-ui.com/customization/default-theme/?expend-path=$.palette
export default createMuiTheme({
  container: {
    maxWidth: "1140px",
    margin: "0 auto"
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 900,
      md: 960,
      lg: 1280,
      xl: 1920,
    }
  },
  palette: {
    primary: {
      // dark automatic calculated
      main: "#86C8F8",
      contrastText: '#FFFFFF',
    },
    secondary: {
      // dark automatic calculated
      main: "#EECE74",
      contrastText: '#FFFFFF',
    },
    semantics: {
      red: {
        100: "#F8d2c9",
        200: "#F19883",
        300: "#FF5833",
      },
      amber: {
        100: "#FFF8E7",
        200: "#FFE29D",
        300: "#FFCF5C",
      },
      pink: {
        100: "#FFEAF8",
        200: "#FFCAEE",
        300: "#FF8CDA",
      },
      green: {
        100: "#D0F1DE",
        200: "#8BDCAD",
        300: "#00C48C",
      }
    },
    neutrals: {
      100: "#FFFFFF",
      110: "#FCFCFD",
      120: "#FAFAF9",
      200: "#F7F7FA",
      300: "#EEEEEE",
      400: "#C8C9CC",
      500: "#6F7072",
      600: "#040621",
    },
    divider: "rgba(0, 0, 0, 0.12)",
    dividerDark: "rgba(0, 0, 0, 0.04)",
    dividerLight: "rgb(255, 255, 255)",
    gradients: {
      dark0: "linear-gradient(0deg,rgba(0,0,0,0.6),rgba(0,0,0,0.4))",
      dark90: "linear-gradient(90deg,rgba(0,0,0,0.6),rgba(0,0,0,0.4))",
      dark180: "linear-gradient(180deg,rgba(0,0,0,0.6),rgba(0,0,0,0.4))",
      default0: "linear-gradient(0deg,#86C8F8,#F7F7FA)",
      default90: "linear-gradient(90deg,#86C8F8,#F7F7FA)",
      default180: "linear-gradient(180deg,#86C8F8,#F7F7FA)",
      secondary0: "linear-gradient(0deg,#86C8F8,#EECE74)",
      secondary90: "linear-gradient(90deg,#86C8F8,#EECE74)",
      secondary180: "linear-gradient(180deg,#86C8F8,#EECE74)",
    },
    text: {
      primary: "#040621",
      secondary: "#FFFFFF",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    },
    background: {
      paper: "#F7F7FA",
      default: "#FFFFFF"
    }
  },
  typography: {
    useNextVariants: true,
    h1: {
      color: "#040621",
      fontFamily: "'IBM Plex Sans', 'Helvetica Neue', 'Arial', sans-serif",
    },
    h2: {
      color: "#040621",
      fontFamily: "'IBM Plex Sans', 'Helvetica Neue', 'Arial', sans-serif",
    },
    h3: {
      color: "#040621",
      fontFamily: "'IBM Plex Sans', 'Helvetica Neue', 'Arial', sans-serif",
    },
    h4: {
      color: "#040621",
      fontFamily: "'IBM Plex Sans', 'Helvetica Neue', 'Arial', sans-serif",
    },
    h5: {
      color: "#040621",
      fontFamily: "'IBM Plex Sans', 'Helvetica Neue', 'Arial', sans-serif",
    },
    h6: {
      color: "#040621",
      fontFamily: "'IBM Plex Sans', 'Helvetica Neue', 'Arial', sans-serif",
    },
    body1: {
      color: "#6F7072",
    },
    caption: {
      color: "#6F7072",
    },
    subtitle1:{
      fontFamily: "'IBM Plex Sans', 'Helvetica Neue', 'Arial', sans-serif",
    },
    subtitle2: {
      color: "#6F7072",
    },    
  },
  shape: {
    borderRadius: 5,
    border: 2,
  },
  button: {
    padding: "18px 26px"
  },
});