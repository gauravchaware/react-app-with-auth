import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from "loadsh";
import debounce from "lodash/debounce";
import { css } from "aphrodite";
import { Link, withRouter } from "react-router-dom";
import { getPlanets, setPlanet } from "../../actions";
import { Header, SearchBox } from "../../components";
import RouteNames from "../../constants/routesNames";
import commonStyles from "../../styles/common";
import styles from "./styles";

class Layout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSearch = debounce(this.onSearch, 800);
  }

  onSearch = value => {
    // eslint-disable-next-line no-shadow
    const { getPlanets } = this.props;
    getPlanets(value);
  };

  onChange = name => {
    // eslint-disable-next-line no-shadow
    const { planetData, setPlanet } = this.props;
    const planet = _.find(planetData, { name });
    setPlanet(planet);
  };

  render() {
    const {
      children,
      location,
      isAuthenticated,
      planetData,
      loading
    } = this.props;
    const { pathname } = location;
    let menu = pathname !== RouteNames.SignIn ? "Login" : "Home";
    let menuLink =
      pathname !== RouteNames.SignIn ? RouteNames.SignIn : RouteNames.Home;
    if (isAuthenticated) {
      menu = pathname !== RouteNames.SignIn ? "Logout" : "Home";
      menuLink =
        pathname !== RouteNames.SignIn ? RouteNames.Logout : RouteNames.Home;
    }
    return (
      <>
        <Header style={[styles.header, styles.headerSmall]}>
          <div className={css(styles.leftContent, styles.leftContentSmall)} />
          <div className={css(styles.middleContent, styles.middleContentSmall)}>
            {pathname !== RouteNames.SignIn && (
              <SearchBox
                style={{ width: "100%" }}
                onSearch={this.onSearch}
                onChange={this.onChange}
                placeholder="type to search planets"
                data={planetData}
                loading={loading}
              />
            )}
          </div>
          <div className={css(styles.rightContent)}>
            <Link
              to={menuLink}
              className={css(styles.link, commonStyles.linkColor)}
            >
              {menu}
            </Link>
          </div>
        </Header>
        {children}
      </>
    );
  }
}

Layout.defaultProps = {
  pathname: ""
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  location: PropTypes.oneOfType([PropTypes.object]).isRequired,
  planetData: PropTypes.oneOfType([PropTypes.array]).isRequired,
  pathname: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  getPlanets: PropTypes.func.isRequired,
  setPlanet: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    planetData: _.get(state, "common.planetData", []),
    loading: _.get(state, "common.loading", false)
  };
};

export default withRouter(
  connect(mapStateToProps, { getPlanets, setPlanet })(Layout)
);
