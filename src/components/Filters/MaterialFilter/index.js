import React, { memo } from "react";
import { Collapse } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMaterialFT } from "../../../slice/products.slice";
import { setMaterials } from "../../../slice/menu.slice";
import { useTranslation } from "react-i18next";

function MaterialFilter(props) {
	/*
    @state = {key: {name, state}}
  */
	const { t } = useTranslation();
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
		dispatch(setMaterialFT(key === material ? "" : key));
	};

	return (
		<Collapse ghost expandIconPosition="right">
			<Collapse.Panel header={t("products.material")} key="1">
				<ul>
					{materials.map((mt, i) => (
						<li
							className={
								mt._id === material ? "item current" : "item"
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
export default memo(MaterialFilter);
