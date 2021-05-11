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
      200: "#F7F7FA",
      300: "#EEEEEE",
      400: "#C8C9CC",
      500: "#6F7072",
      600: "#040621",
    },
    divider: "rgba(0, 0, 0, 0.12)",
    dividerDark: "rgba(0, 0, 0, 0.04)",
    dividerLight: "rgba(255, 255, 255, 0.12)",
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
      fontWeight: 600,
      fontStyle: "normal",
      fontSize: "28px",
      lineHeight: "37px",
      letterSpacing: "normal",
      '@media (min-width:600px)': {
        fontSize: "36px",
        lineHeight: "47px",
      }
    },
    h2: {
      color: "#040621",
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", \"sans-serif\"",
      fontWeight: 600,
      fontStyle: "normal",
      fontSize: "18px",
      lineHeight: "normal",
      letterSpacing: "normal",
      '@media (min-width:600px)': {
        fontWeight: 700,
        fontSize: "21px",
        lineHeight: "28px",
      }
    },
    h3: {
      color: "#040621",
      fontFamily: "'IBM Plex Sans', 'Helvetica Neue', 'Arial', sans-serif",
      fontWeight: 600,
      fontStyle: "normal",
      fontSize: "17px",
      lineHeight: "22px",
      letterSpacing: "normal",
    },
    h4: {
      color: "#040621",
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", \"sans-serif\"",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "20px",
      letterSpacing: "normal",
    },
    body1: {
      color: "#6F7072",
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", \"sans-serif\"",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "15px",
      lineHeight: "normal",
      letterSpacing: "normal",
      '@media (min-width:600px)': {
        fontSize: "18px",
        lineHeight: "27px",
      }
    },
    body2: {
      color: "#040621",
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", \"sans-serif\"",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "15px",
      lineHeight: "21px",
      letterSpacing: "normal",
    },
    button: {
      color: "#040621",
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", \"sans-serif\"",
      fontWeight: 500,
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "normal",
      letterSpacing: "normal",
    },
    button2: {
      color: "#FFFFFF",
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", \"sans-serif\"",
      fontWeight: 500,
      fontStyle: "normal",
      fontSize: "12px",
      lineHeight: "16px",
      letterSpacing: "normal",
    },
    caption: {
      color: "#040621",
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", \"sans-serif\"",
      fontWeight: 500,
      fontStyle: "normal",
      fontSize: "14px",
      lineHeight: "16px",
      textDecoration: "underline",
      letterSpacing: "normal",
    },
    caption2: {
      color: "#040621",
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", \"sans-serif\"",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "11px",
      lineHeight: "13px",
      letterSpacing: "normal",
    },
    small: {
      color: "#040621",
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", \"sans-serif\"",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "12px",
      lineHeight: "18px",
      letterSpacing: "normal",
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