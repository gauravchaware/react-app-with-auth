import { StyleSheet } from "aphrodite";

export default StyleSheet.create({
  content: {
    height: "100vh",
    display: "flex"
  },
  formContainer: {
    margin: "auto",
    width: "400px",
    padding: "30px",
    backgroundColor: "black",
    boxSizing: "border-box"
  },
  formContainerSmall: {
    "@media (max-width: 600px)": {
      width: "300px"
    }
  }
});
