import React, { memo } from "react";
import { Collapse } from "antd";
import axios from "axios";
import { setCategogyFT } from "../../../slice/products.slice";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../../slice/menu.slice";

function CategoryFilter(props) {
	/*
    @state = {[key]: {name, state}}
  */
	const dispatch = useDispatch();
	const { filter } = useSelector((state) => state.products);
	const { categories } = useSelector((state) => state.menu);
	const { category } = filter;
	React.useEffect(() => {
		axios
			.get("http://localhost:3001/api/categories")
			.then(({ data }) => {
				dispatch(setCategories(data));
			})
			.catch((err) => console.error(err));
	}, []);

	const handleClick = (e) => {
		let key = e.target.id;
		dispatch(setCategogyFT(key === category ? "" : key));
	};

	return (
		<Collapse ghost expandIconPosition="right">
			<Collapse.Panel header="Categories" key="1">
				<ul>
					{categories.map((ct, i) => (
						<li
							className={
								ct._id === category ? "item current" : "item"
							}
							key={i}
							id={ct._id}
							onClick={(e) => handleClick(e)}
						>
							{ct.name}
							{/* <span>X</span> */}
						</li>
					))}
				</ul>
			</Collapse.Panel>
		</Collapse>
	);
}
export default memo(CategoryFilter);
