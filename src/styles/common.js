import { StyleSheet } from "aphrodite";
import colors from "./colors";

export default StyleSheet.create({
  linkColor: {
    color: colors.brandSecondary
  },
  linkDisabled: {
    color: colors.brandSecondary,
    cursor: "not-allowed"
  },
  error: {
    color: colors.brandError
  }
});
