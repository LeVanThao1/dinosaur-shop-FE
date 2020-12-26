import React, { useRef } from "react";
import { Slider, InputNumber, Row, Col } from "antd";
import { setPriceFT } from "../../../slice/products.slice";
import { useDispatch, useSelector } from "react-redux";

export default function PriceFilter(props) {
	const dispatch = useDispatch();
	const { filter } = useSelector((state) => state.products);
	const ref = useRef(null);
	// const { min, max } = useSelector((state) => state.menu);

	const { min, max } = filter;
	// const [value, setValue] = React.useState([100000, 1000000]);
	const onChange = ([min, max]) => {
		// setValue([min, max]);
		// if (ref.current) clearTimeout(ref.current);
		// ref.current = setTimeout(() => {
		console.log(min, max);
		dispatch(setPriceFT({ min: min, max: max }));
		// }, 500);
	};

	const onChangeMin = (min) => {
		// setValue([min, value[1]]);
		console.log(min);
		dispatch(setPriceFT({ min: min, max: max }));
	};

	const onChangeMax = (max) => {
		// setValue([value[0], max]);
		dispatch(setPriceFT({ min: min, max: max }));
	};

	const onAfterChange = (value) => {
		console.log("onAfterChange: ", value);
		dispatch(setPriceFT({ min: value[0], max: value[1] }));
	};
	const formatter = (value) => {
		let str = value + "";
		let res = "";
		for (let i = 0; i < str.length; i++) {
			if (i % 3 === 0 && i) {
				res = str[str.length - 1 - i] + "." + res;
			} else {
				res = str[str.length - 1 - i] + res;
			}
		}
		return res;
	};
	return (
		<div>
			<Slider
				range
				min={0}
				max={1000000}
				step={10000}
				value={[min, max]}
				onChange={onChange}
				onAfterChange={onAfterChange}
				tipFormatter={null}
			/>
			<Row>
				<Col xs={12} sm={12} md={12} lg={12} xl={12}>
					<Row justify="center">
						<InputNumber
							min={0}
							max={max}
							onChange={onChangeMin}
							value={min}
							step={10000}
							// formatter={formatter}
							// parser={formatter}
							size="small"
						/>
					</Row>
				</Col>

				<Col xs={12} sm={12} md={12} lg={12} xl={12}>
					<Row justify="center">
						<InputNumber
							min={min}
							max={1000000}
							value={max}
							step={10000}
							onChange={onChangeMax}
							// formatter={formatter}
							size="small"
							// parser={formatter}
						/>
					</Row>
				</Col>
			</Row>
		</div>
	);
}
