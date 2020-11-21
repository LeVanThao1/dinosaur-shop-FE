import React, { useState } from "react";
import PropTypes from "prop-types";
import { SearchOutlined } from "@ant-design/icons";
import "./index.scss";

SearchBar.propTypes = {};

function SearchBar(props) {
  const [value, setValue] = useState("");

  const _onChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  return (
    <div className="search-content">
      <div className="input">
        <input
          type="text"
          placeholder="Search"
          value={value}
          onChange={_onChange}
          autoFocus
        />
      </div>
      <div className="icon">
        <SearchOutlined className="icon-search" />
      </div>
    </div>
  );
}

export default SearchBar;
