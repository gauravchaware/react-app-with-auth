import { StyleSheet } from "aphrodite";
import colors from "../../styles/colors";

export default StyleSheet.create({
  header: {
    backgroundColor: colors.brandPrimary,
    display: "flex",
    flexWrap: "wrap",
    alignContent: "center",
    paddingLeft: "30px",
    paddingRight: "30px"
  },
  headerSmall: {
    "@media (max-width: 600px)": {
      paddingLeft: "10px",
      paddingRight: "10px"
    }
  },
  leftContent: {
    width: "30%"
  },
  leftContentSmall: {
    "@media (max-width: 600px)": {
      display: "none"
    }
  },
  middleContent: {
    height: "70px",
    width: "40%",
    padding: "20px"
  },
  middleContentSmall: {
    "@media (max-width: 600px)": {
      width: "70%"
    }
  },
  rightContent: {
    width: "30%"
  },
  link: {
    verticalAlign: "middle",
    float: "right",
    textDecoration: "none",
    padding: "20px"
  },
  searchBox: {
    width: "100%"
  }
});
