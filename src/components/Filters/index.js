import React from "react";

import { Row, Col, Divider } from "antd";
import "./style.scss";

import CategoryFilter from "./CategoryFilter";
import MaterialFilter from "./MaterialFilter";
import StateFilter from "./StateFilter";
import StyleFilter from "./StyleFilter";
import TypeFilter from "./TypeFilter";
import PriceFilter from "./PriceFilter";
import HightLow from "./HightLow";

// const dividerStyles = { borderTop: "2px solid grey" };

export default function Filters(props) {
	return (
		<>
			<Row>
				<Col xs={24} sm={24} md={24} lg={24} xl={24}>
					<Row>
						<Col xs={12} sm={12} md={24} lg={24} xl={24}>
							<HightLow />
							{/* <Divider style={dividerStyles} /> */}
						</Col>
						<Col xs={12} sm={12} md={24} lg={24} xl={24}>
							<CategoryFilter />
							{/* <Divider style={dividerStyles} /> */}
						</Col>
						<Col xs={12} sm={12} md={24} lg={24} xl={24}>
							<StyleFilter />
							{/* <Divider style={dividerStyles} /> */}
						</Col>
					</Row>
					<Row>
						<Col xs={12} sm={12} md={24} lg={24} xl={24}>
							<StateFilter />
							{/* <Divider style={dividerStyles} /> */}
						</Col>

						<Col xs={12} sm={12} md={24} lg={24} xl={24}>
							<TypeFilter />
							{/* <Divider style={dividerStyles} /> */}
						</Col>
					</Row>
					<Row>
						<Col xs={12} sm={12} md={24} lg={24} xl={24}>
							<MaterialFilter />
							{/* <Divider style={dividerStyles} /> */}
						</Col>
					</Row>
				</Col>
			</Row>
			<PriceFilter />
		</>
	);
}
