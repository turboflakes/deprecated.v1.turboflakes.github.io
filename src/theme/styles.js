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
      main: "#ED1C24",
      contrastText: '#FFFFFF',
    },
    secondary: {
      // dark automatic calculated
      main: "#343434",
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
      100: "#F1F1F0",
      200: "#4D4D4D",
      300: "#343434",
      // 400: "#DFF1FA",
      // 500: "#BBDFF3",
      // 600: "#6F7072",
      // 700: "#021220",
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
      default270: "linear-gradient(270deg,#DFF1FA,#FFF)",
      secondary0: "linear-gradient(0deg,#85BCE4,#E86866)",
      secondary90: "linear-gradient(90deg,#85BCE4,#E86866)",
      secondary180: "linear-gradient(180deg,#85BCE4,#E86866)",
    },
    text: {
      primary: "#0B1317",
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
      fontFamily: "'Gilroy-Heavy', 'Helvetica Neue', 'Arial', sans-serif",
    },
    h2: {
      fontFamily: "'Gilroy-Heavy', 'Helvetica Neue', 'Arial', sans-serif",
    },
    h3: {
      fontFamily: "'Gilroy-Heavy', 'Helvetica Neue', 'Arial', sans-serif",
    },
    h4: {
      fontFamily: "'Gilroy-Heavy', 'Helvetica Neue', 'Arial', sans-serif",
    },
    h5: {
      fontFamily: "'Gilroy-Heavy', 'Helvetica Neue', 'Arial', sans-serif",
    },
    h6: {
      fontFamily: "'Roboto', sans-serif",
    },
    body1: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: "1.2rem",
    },
    caption: {
      fontFamily: "'Roboto', sans-serif",
    },
    subtitle1: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: "1.5rem",
    },
    subtitle2: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: "1rem"
    }, 
  },
  shape: {
    borderRadius: 8,
    border: 2,
  },
  button: {
    padding: "18px 26px"
  },
  overrides: {
    MuiButton: {
      outlined: {
        borderRadius: 30,
        borderWidth: 2,
        padding: `8px 16px`
      },
      contained: {
        borderRadius: 30,
        padding: `8px 16px`
      }
    },
    MuiInputBase: {
      input: {
        borderRadius: 30,
      },
    },
    MuiOutlinedInput: {
      root: {
        '&.Mui-focused $notchedOutline' :{
          borderColor: "inherit",
          borderWidth: 0,
        },
      },
      notchedOutline: {
        borderWidth: 0,
      }
    },
    MuiSelect: {
      icon: {
        color: "inherit",
      }
    },
    MuiSlider: {
      root: {
        height: 8,
      },
      mark: {
        display: "none"
      },
      markActive: {
        backgroundColor: "inherit"
      },
      markLabel: {
        color: "#DFF1FA"
      },
      markLabelActive: {
        color: "#021220"
      },
      thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        // border: '1px solid currentColor',
        marginTop: -8,
        marginLeft: -10,
        // '&:focus, &:hover, &$active': {
        //   boxShadow: 'inherit',
        // },
        '&.Mui-disabled': {
          height: 24,
          width: 24,
          backgroundColor: '#fff',
          // border: '2px solid currentColor',
          marginTop: -8,
          marginLeft: -10,
        }
      },
      track: {
        height: 8,
        borderRadius: 4,
        // backgroundColor: "#FFF"
      },
      rail: {
        height: 8,
        borderRadius: 4,
      },
      valueLabel: {
        left: 'calc(-50% + 7px)',
        top: 6,
        fontSize: "0.75rem",
        fontWeight: 600,
        '& *': {
          background: 'transparent',
          color: '#000',
        },
      },
    },
    MuiPopover: {
      paper: {
        padding: 16,
        backgroundColor: "#021220",
        color: "#FFFFFF"
      },
    },
    MuiTabs:{
      root:{
        minHeight: 32,
      },
      indicator: {
        display: "none"
      },
      flexContainer: {
        justifyContent: "flex-end"
      }
    },
    MuiTab: {
      root: {
        padding: 0,
        minHeight: 48,
        '&.MuiTab-labelIcon .MuiTab-wrapper > *:first-child': {
          marginBottom: 0
        }
      },
      
    },
    // MuiTab: {
    //   root: {
    //     '@media screen and (min-width: 900px)': {
    //       minWidth: 140,
    //     },
    //     zIndex: 1,
    //     minHeight: 32,
    //     backgroundColor: "#4D4D4D",
    //     marginRight: -32,
    //     borderTopLeftRadius: 16,
    //     borderTopRightRadius: 16,
    //     fontSize: "0.8rem",
    //     '&.Mui-selected' : {
    //       zIndex: 2,
    //       color: "#FFF",
    //       backgroundColor: "#343434",
    //       borderTopLeftRadius: 24,
    //       borderTopRightRadius: 24,
    //       opacity: 1,
    //     },
    //     '&:first-child': {
    //       borderTopLeftRadius: 24,
    //       opacity: 0.8,
    //     },
    //     '&:last-child': {
    //       zIndex: 0,
    //       borderTopRightRadius: 24,
    //       marginRight: 0,
    //       opacity: 0.8,
    //     },
    //     '&:last-child&.Mui-selected': {
    //       zIndex: 2,
    //     }
    //   },
    //   textColorInherit: {
    //     opacity: 1,
    //     color: "#F1F1F0",
    //   }      
    // }
  }
});