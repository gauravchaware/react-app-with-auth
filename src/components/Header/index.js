import React from "react";
import PropTypes from "prop-types";
import { css } from "aphrodite";
import styles from "./styles";

export const Header = props => {
  const { children, style } = props;
  return <div className={css(styles.header, style)}>{children}</div>;
};

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};
