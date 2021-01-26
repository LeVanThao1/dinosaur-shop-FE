import React, { memo } from "react";
import { Collapse } from "antd";
import axios from "axios";
import { setSortPrice } from "../../../slice/products.slice";
import { useDispatch, useSelector } from "react-redux";

function HightLow(props) {
	/*
    @state = {[key]: {name, state}}
  */
	const dispatch = useDispatch();
	const { filter } = useSelector((state) => state.products);
	const { sortPrice } = filter;

	const handleClick = (e) => {
		let key = e.target.id;
		dispatch(setSortPrice(key === sortPrice ? "" : key));
	};

	return (
		<Collapse ghost expandIconPosition="right">
			<Collapse.Panel header="SortPrice" key="1">
				<ul>
					<li
						className={
							"asc" === sortPrice ? "item current" : "item"
						}
						id={"asc"}
						onClick={(e) => handleClick(e)}
					>
						Low High
					</li>
					<li
						className={
							"des" === sortPrice ? "item current" : "item"
						}
						id={"des"}
						onClick={(e) => handleClick(e)}
					>
						High Low
					</li>
				</ul>
			</Collapse.Panel>
		</Collapse>
	);
}
export default memo(HightLow);
