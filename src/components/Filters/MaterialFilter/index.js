import React from "react";
import { Collapse } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMaterialFT } from "../../../slice/products.slice";
import { setMaterials } from "../../../slice/menu.slice";

export default function MaterialFilter(props) {
	/*
    @state = {key: {name, state}}
  */
	const dispatch = useDispatch();
	const { filter } = useSelector((state) => state.products);
	const { materials } = useSelector((state) => state.menu);
	const { material } = filter;

	React.useEffect(() => {
		axios
			.get("http://localhost:3001/api/materials")
			.then(({ data }) => {
				dispatch(setMaterials(data));
			})
			.catch((err) => console.error(err));
	}, []);

	const handleClick = (e) => {
		let key = e.target.id;
		dispatch(setMaterialFT(key === material.split("=")[1] ? "" : key));
	};

	return (
		<Collapse ghost expandIconPosition="right">
			<Collapse.Panel header="Materials" key="1">
				<ul>
					{materials.map((mt, i) => (
						<li
							className={
								mt._id === material.split("=")[1]
									? "item current"
									: "item"
							}
							key={i}
							id={mt._id}
							onClick={(e) => handleClick(e)}
						>
							{mt.name}
							{/* <span>X</span> */}
						</li>
					))}
				</ul>
			</Collapse.Panel>
		</Collapse>
	);
}
