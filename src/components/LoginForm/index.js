import React from "react";
import PropTypes from "prop-types";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { css } from "aphrodite";
import routesNames from "../../constants/routesNames";
import commonStyles from "../../styles/common";
import styles from "./styles";

class LoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const { form, handleSubmit } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        handleSubmit(values);
      }
    });
  };

  render() {
    const { form, loading, error } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSubmit} className={css(styles.loginForm)}>
        <div className={css(styles.errorWrap)}>
          {error ? (
            <p className={css(styles.error, commonStyles.error)}>{error}</p>
          ) : (
            <span />
          )}
        </div>
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: false
          })(
            <Checkbox disabled>
              <span className={css(commonStyles.linkColor)}>Remember me</span>
            </Checkbox>
          )}
          <a
            className={css(styles.loginFormForgot, commonStyles.linkDisabled)}
            href={routesNames.Dummy}
          >
            Forgot password
          </a>
          <Button
            type="danger"
            htmlType="submit"
            className={css(styles.loginFormButton)}
            loading={loading}
          >
            Log in
          </Button>
          <a
            className={css(commonStyles.linkDisabled)}
            href={routesNames.Dummy}
          >
            register now!
          </a>
        </Form.Item>
      </Form>
    );
  }
}

LoginForm.defaultProps = {
  form: () => undefined,
  getFieldDecorator: () => undefined,
  validateFields: () => undefined,
  error: null
};

LoginForm.propTypes = {
  form: PropTypes.oneOfType([PropTypes.object]),
  getFieldDecorator: PropTypes.func,
  validateFields: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export const NormalLoginForm = Form.create({ name: "normal_login" })(LoginForm);
