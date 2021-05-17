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
      main: "#85BCE4",
      contrastText: '#FFFFFF',
    },
    secondary: {
      // dark automatic calculated
      main: "#E86866",
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
      200: "#F9FDFF",
      300: "#F1F9FD",
      400: "#DFF1FA",
      500: "#BBDFF3",
      600: "#6F7072",
      700: "#021220",
    },
    // neutrals: {
    //   100: "#FFFFFF",
    //   110: "#FCFCFD",
    //   120: "#FAFAF9",
    //   200: "#F7F7FA",
    //   300: "#EEEEEE",
    //   400: "#C8C9CC",
    //   500: "#6F7072",
    //   600: "#021220",
    // },
    divider: "rgba(0, 0, 0, 0.12)",
    dividerDark: "rgba(0, 0, 0, 0.04)",
    dividerLight: "rgb(255, 255, 255)",
    gradients: {
      dark0: "linear-gradient(0deg,rgba(0,0,0,0.6),rgba(0,0,0,0.4))",
      dark90: "linear-gradient(90deg,rgba(0,0,0,0.6),rgba(0,0,0,0.4))",
      dark180: "linear-gradient(180deg,rgba(0,0,0,0.6),rgba(0,0,0,0.4))",
      default0: "linear-gradient(0deg,#85BCE4,#F9FDFF)",
      default90: "linear-gradient(90deg,#85BCE4,#F9FDFF)",
      default180: "linear-gradient(180deg,#85BCE4,#F9FDFF)",
      default270: "linear-gradient(270deg,#85BCE4,#F9FDFF)",
      secondary0: "linear-gradient(0deg,#85BCE4,#E86866)",
      secondary90: "linear-gradient(90deg,#85BCE4,#E86866)",
      secondary180: "linear-gradient(180deg,#85BCE4,#E86866)",
    },
    text: {
      primary: "#021220",
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
      color: "#021220",
      fontFamily: "'IBM Plex Sans', 'Helvetica Neue', 'Arial', sans-serif",
    },
    h2: {
      color: "#021220",
      fontFamily: "'IBM Plex Sans', 'Helvetica Neue', 'Arial', sans-serif",
    },
    h3: {
      color: "#021220",
      fontFamily: "'IBM Plex Sans', 'Helvetica Neue', 'Arial', sans-serif",
    },
    h4: {
      color: "#021220",
      fontFamily: "'IBM Plex Sans', 'Helvetica Neue', 'Arial', sans-serif",
      textTransform: "uppercase"
    },
    h5: {
      color: "#021220",
      fontFamily: "'IBM Plex Sans', 'Helvetica Neue', 'Arial', sans-serif",
    },
    h6: {
      color: "#021220",
      fontFamily: "'IBM Plex Sans', 'Helvetica Neue', 'Arial', sans-serif",
      fontWeight: 400
    },
    body1: {
      color: "#6F7072",
    },
    caption: {
      color: "#6F7072",
    },
    subtitle1: {
      fontFamily: "'IBM Plex Sans', 'Helvetica Neue', 'Arial', sans-serif",
      fontWeight: 500
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
  overrides: {
    MuiInputBase: {
      input: {
        borderRadius: 5,
      },
      root: {
        borderRadius: 5,
        color: "#FFFFFF"
      }
    },
    MuiOutlinedInput: {
      input: {
        color: "#FFFFFF"
      }, 
      root: {
        '& $notchedOutline' : {
          borderColor: "#FFFFFF",
        },
        '&:hover:not($disabled):not($focused):not($error) $notchedOutline' : {
          borderColor: "#85BCE4", // primary
        }
      },
    },
  }
});