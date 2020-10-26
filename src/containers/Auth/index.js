import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "loadsh";
import { css } from "aphrodite";
import { NormalLoginForm } from "../../components";
import { postAuth } from "../../actions";
import styles from "./styles";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = values => {
    // eslint-disable-next-line no-shadow
    const { postAuth } = this.props;
    const postAuthData = {
      requestData : values,
      onSuccess: this.postAuthSuccess,
      onError: this.postAuthFailuer
    }
    postAuth(postAuthData);
  };

  postAuthSuccess = (res) => {
    console.log('@@ Result postAuthSuccess res', res);
  }

  postAuthFailuer = (error) => {
    console.log('@@ Error postAuthFailuer res', error);
  }

  render() {
    const { loading, error } = this.props;
    return (
      <div className={css(styles.content)}>
        <div className={css(styles.formContainer, styles.formContainerSmall)}>
          <NormalLoginForm
            handleSubmit={this.handleSubmit}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    );
  }
}

Auth.defaultProps = {
  error: ""
};

Auth.propTypes = {
  postAuth: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

const mapStateToProps = state => {
  return {
    isAuthenticated: _.get(state, "auth.token", null) !== null,
    loading: _.get(state, "auth.loading", false),
    error: _.get(state, "auth.error", "")
  };
};

export default connect(mapStateToProps, { postAuth })(Auth);
