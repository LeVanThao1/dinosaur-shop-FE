import React from "react";
import { Collapse } from "antd";

import axios from "axios";

export default function StateFilter() {
	/*
    @state = {[key]: {name, state}}
  */
	const [state, setState] = React.useState({});

	// React.useEffect(() => {
	// 	axios
	// 		.get("http://localhost:3001/api/materials")
	// 		.then(({ data }) => {
	// 			setState(
	// 				data.reduce((accumulator, { _id, name }) => {
	// 					accumulator[_id] = { name, state: false };
	// 					return accumulator;
	// 				}, {})
	// 			);
	// 		})
	// 		.catch((err) => console.error(err));
	// }, []);

	// // React.useEffect(() => {
	// // 	console.log(state);
	// // });

	// const fill = () => {
	// 	const result = [];
	// 	for (let key in state) {
	// 		result.push(
	// 			<li
	// 				className={state[key].state ? "current" : ""}
	// 				key={key}
	// 				id={key}
	// 				onClick={(e) => handleClick(e)}
	// 			>
	// 				{state[key].name}
	// 				{/* <span>X</span> */}
	// 			</li>
	// 		);
	// 	}
	// 	return result;
	// };

	// const handleClick = (e) => {
	// 	let key = e.target.id;
	// 	let stateKeyAfter = !state[key].state;
	// 	let newState = { ...state };
	// 	for (let key in newState) {
	// 		newState[key].state = false;
	// 	}
	// 	newState[key].state = stateKeyAfter;
	// 	setState({ ...newState });
	// };

	return (
		<Collapse ghost expandIconPosition="right">
			<Collapse.Panel header="State" key="1">
				{/* <ul>{fill()}</ul> */}
			</Collapse.Panel>
		</Collapse>
	);
}
