import React from "react";
import PropTypes from "prop-types";
import { Select, Spin } from "antd";
import { css } from "aphrodite";

import styles from "./styles";

const { Option } = Select;

export const SearchBox = props => {
  const { style, onSearch, onChange, placeholder, loading, data } = props;
  return (
    <div className={css(styles.container)}>
      <Select
        showSearch
        allowClear
        showArrow={false}
        placeholder={placeholder}
        notFoundContent={null}
        filterOption={false}
        onSearch={onSearch}
        onChange={onChange}
        style={style}
      >
        {loading && (
          <Option disabled key="op-loader">
            <Spin size="small" />
          </Option>
        )}
        {data.map(d => (
          <Option key={d.name}>{d.name}</Option>
        ))}
      </Select>
    </div>
  );
};

SearchBox.defaultProps = {
  placeholder: "",
  loading: false,
  data: [],
  style: {}
};

SearchBox.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object]),
  onSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  loading: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.array])
};
