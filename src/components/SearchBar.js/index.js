import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { SearchOutlined } from "@ant-design/icons";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { setTextSearchFT } from "../../slice/products.slice";
import { Input } from "antd";
import { useHistory, useLocation } from "react-router-dom";

SearchBar.propTypes = {};

function SearchBar(props) {
	const { filter } = useSelector((state) => state.products);
	const { textSearch } = filter;
	const dispatch = useDispatch();
	// const [value, setValue] = useState("");
	const location = useLocation();
	const history = useHistory();

	const _onChange = (e) => {
		e.preventDefault();
		// setValue(e.target.value);
		dispatch(setTextSearchFT(e.target.value));
	};

	const _onClick = () => {
		if (location.pathname !== "/products") history.push("/products");
	};
	return (
		<div className="search-content">
			<div className="input">
				<Input
					// type="text"
					name="search"
					id="search"
					placeholder="Search"
					value={textSearch}
					onChange={_onChange}
					onPressEnter={_onClick}
					autoFocus
				/>
			</div>
			<div className="icon">
				<SearchOutlined className="icon-search" onClick={_onClick} />
			</div>
		</div>
	);
}

export default memo(SearchBar);
