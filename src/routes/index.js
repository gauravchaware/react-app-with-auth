import React, { Component } from "react";
import PropTypes from "prop-types";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import asyncComponent from "../hoc/asyncComponent";
import Layout from "../hoc/Layout";
import Logout from "../containers/Logout";
import RouteNames from "../constants/routesNames";
import { logout, authSuccess } from "../actions";
import { history } from "../store";

// load component asynchronously, helps to avoid unnecessary loading of containers
const asyncHome = asyncComponent(() => {
  return import("../containers/Home");
});

const asyncAuth = asyncComponent(() => {
  return import("../containers/Auth");
});

class Routes extends Component {
  componentDidMount() {
    this.authCheckState(); // check for login expiration
  }

  authCheckState = () => {
    // eslint-disable-next-line no-shadow
    const { logout, authSuccess } = this.props;
    const token = localStorage.getItem("token");
    if (!token) {
      logout();
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        logout();
      } else {
        const userId = localStorage.getItem("userId");
        authSuccess(token, userId);
        this.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        );
      }
    }
  };

  checkAuthTimeout = expirationTime => {
    setTimeout(() => {
      logout();
    }, expirationTime * 1000);
  };

  render() {
    const { isAuthenticated } = this.props;

    let routes = (
      <Switch>
        <Route path={RouteNames.SignIn} exact component={asyncAuth} />
        <Redirect to={RouteNames.SignIn} />
      </Switch>
    );

    if (isAuthenticated) {
      routes = (
        <Layout>
          <Switch>
            <Route path={RouteNames.Home} exact component={asyncHome} />
            <Route path={RouteNames.Logout} component={Logout} />
            <Redirect to={RouteNames.Home} />
          </Switch>
        </Layout>
      );
    }
    return <ConnectedRouter history={history}>{routes}</ConnectedRouter>;
  }
}

Routes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  authSuccess: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps, {
  logout,
  authSuccess
})(Routes);
