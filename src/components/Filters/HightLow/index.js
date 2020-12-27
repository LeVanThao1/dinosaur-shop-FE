import React from "react";
import { Collapse } from "antd";
import axios from "axios";
import { setSortPrice } from "../../../slice/products.slice";
import { useDispatch, useSelector } from "react-redux";

export default function HightLow(props) {
	/*
    @state = {[key]: {name, state}}
  */
	const dispatch = useDispatch();
	const { filter } = useSelector((state) => state.products);
	const { sortPrice } = filter;

	const handleClick = (e) => {
		let key = e.target.id;
		dispatch(setSortPrice(key === sortPrice.split("=")[1] ? "" : key));
	};

	return (
		<Collapse ghost expandIconPosition="right">
			<Collapse.Panel header="SortPrice" key="1">
				<ul>
					<li
						className={
							"salePrice" === sortPrice.split("=")[1]
								? "item current"
								: "item"
						}
						id={"salePrice"}
						onClick={(e) => handleClick(e)}
					>
						Low Hight
					</li>
					<li
						className={
							"-salePrice" === sortPrice.split("=")[1]
								? "item current"
								: "item"
						}
						id={"-salePrice"}
						onClick={(e) => handleClick(e)}
					>
						Hight Low
					</li>
				</ul>
			</Collapse.Panel>
		</Collapse>
	);
}
