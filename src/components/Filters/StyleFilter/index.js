import React, { memo } from "react";
import { Collapse } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setStyles } from "../../../slice/menu.slice";
import { setStyleFT } from "../../../slice/products.slice";
import { useTranslation } from "react-i18next";

function StyleFilter(props) {
	/*
    @state = {[key]: {name, state}}
  */
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const { filter } = useSelector((state) => state.products);
	const { styles } = useSelector((state) => state.menu);
	const { style } = filter;

	React.useEffect(() => {
		axios
			.get("http://localhost:3001/api/styles")
			.then(({ data }) => {
				dispatch(setStyles(data));
			})
			.catch((err) => console.error(err));
	}, []);

	const handleClick = (e) => {
		let key = e.target.id;
		dispatch(setStyleFT(key === style ? "" : key));
	};

	return (
		<Collapse ghost expandIconPosition="right">
			<Collapse.Panel header={t("products.style")} key="1">
				<ul>
					{styles.map((st, i) => (
						<li
							className={
								st._id === style ? "item current" : "item"
							}
							key={i}
							id={st._id}
							onClick={(e) => handleClick(e)}
						>
							{st.name}
							{/* <span>X</span> */}
						</li>
					))}
				</ul>
			</Collapse.Panel>
		</Collapse>
	);
}
export default memo(StyleFilter);
