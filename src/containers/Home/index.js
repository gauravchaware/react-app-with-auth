/* eslint-disable camelcase */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from "loadsh";
import { css } from "aphrodite";
import { Descriptions, List } from "antd";
import { setPlanet } from "../../actions";
import styles from "./styles";

const data = [
  "React application containing all latest packages and started with create-react-app.",
  "Contains authentication flow, search and details about star wars planets.",
  "Developed to be use as foundation and quick start for complex application.",
  "Includes Eslint and Pretier with standerd configuration of Airbnb.",
  "Routing, Redux, Redux-Saga, AntD.",
  "Api service consumed with axios and interceptors added for global error handling.",
  "Popular CssInJs used."
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { setPlanet } = this.props;
    setPlanet({});
  }

  render() {
    const { selectedPlanet } = this.props;
    if (_.isEmpty(selectedPlanet)) {
      const intro = (
        <>
          <h3>Developed by Gaurav Chaware</h3>
          <h4>Senior Software Engineer</h4>
        </>
      );
      return (
        <div className={css(styles.content)}>
          <h2 className={css(styles.title)}>Welcome to Star Wars</h2>
          <List
            size="small"
            header={intro}
            footer={null}
            bordered
            dataSource={data}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </div>
      );
    }
    const {
      population,
      gravity,
      climate,
      surface_water,
      terrain,
      rotation_period,
      orbital_period,
      diameter
    } = selectedPlanet;
    return (
      <div className={css(styles.content)}>
        <Descriptions title={`Planet Info: ${selectedPlanet.name}`}>
          <Descriptions.Item label="Population">{population}</Descriptions.Item>
          <Descriptions.Item label="Surface water">
            {surface_water}
          </Descriptions.Item>
          <Descriptions.Item label="Gravity">{gravity}</Descriptions.Item>
          <Descriptions.Item label="Climate">{climate}</Descriptions.Item>
          <Descriptions.Item label="Terrain">{terrain}</Descriptions.Item>
          <Descriptions.Item label="Rotation period">
            {rotation_period}
          </Descriptions.Item>
          <Descriptions.Item label="Orbital period">
            {orbital_period}
          </Descriptions.Item>
          <Descriptions.Item label="Diameter">{diameter}</Descriptions.Item>
        </Descriptions>
      </div>
    );
  }
}

Home.defaultProps = {
  selectedPlanet: {}
};

Home.propTypes = {
  selectedPlanet: PropTypes.oneOfType([PropTypes.object]),
  setPlanet: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    selectedPlanet: _.get(state, "common.selectedPlanet", {})
  };
};

export default connect(mapStateToProps, { setPlanet })(Home);
