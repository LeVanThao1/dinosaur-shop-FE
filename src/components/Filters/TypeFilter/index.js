import React, { memo } from "react";
import { Collapse } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setTypeProducts } from "../../../slice/menu.slice";
import { setTypeProductFT } from "../../../slice/products.slice";

function TypeFilter(props) {
	/*
    @state = {key: {name, state}}
  */
	const dispatch = useDispatch();
	const { filter } = useSelector((state) => state.products);
	const { typeProducts } = useSelector((state) => state.menu);
	const { typeProduct } = filter;

	React.useEffect(() => {
		axios
			.get("http://localhost:3001/api/type_products")
			.then(({ data }) => {
				dispatch(setTypeProducts(data));
			})
			.catch((err) => console.error(err));
	}, []);

	const handleClick = (e) => {
		let key = e.target.id;
		dispatch(setTypeProductFT(key === typeProduct ? "" : key));
	};

	return (
		<Collapse ghost expandIconPosition="right">
			<Collapse.Panel header="Types" key="1">
				<ul>
					{typeProducts.map((td, i) => (
						<li
							className={
								td._id === typeProduct
									? "item current"
									: "item "
							}
							key={i}
							id={td._id}
							onClick={(e) => handleClick(e)}
						>
							{td.name}
							{/* <span>X</span> */}
						</li>
					))}
				</ul>
			</Collapse.Panel>
		</Collapse>
	);
}
export default memo(TypeFilter);
