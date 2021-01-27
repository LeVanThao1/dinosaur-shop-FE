import React, { memo } from "react";
import { Collapse } from "antd";
import axios from "axios";
import { setSortPrice } from "../../../slice/products.slice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function HightLow(props) {
	/*
    @state = {[key]: {name, state}}
  */
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { filter } = useSelector((state) => state.products);
	const { sortPrice } = filter;

	const handleClick = (e) => {
		let key = e.target.id;
		dispatch(setSortPrice(key === sortPrice ? "" : key));
	};

	return (
		<Collapse ghost expandIconPosition="right">
			<Collapse.Panel header={t("products.sortPrice")} key="1">
				<ul>
					<li
						className={
							"asc" === sortPrice ? "item current" : "item"
						}
						id={"asc"}
						onClick={(e) => handleClick(e)}
					>
						{t("products.low-high")}
					</li>
					<li
						className={
							"des" === sortPrice ? "item current" : "item"
						}
						id={"des"}
						onClick={(e) => handleClick(e)}
					>
						{t("products.high-low")}
					</li>
				</ul>
			</Collapse.Panel>
		</Collapse>
	);
}
export default memo(HightLow);
