import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import { Form } from "antd";
import { Container, Row, Col } from "reactstrap";
import ShippingForm from "./ShippingForm";
import ShippingDetail from "./ShippingDetail";

function Shipping(props) {
	const [form] = Form.useForm();
	return (
		<>
			{/* <div className="desktop_shipping">
        <div className="container"></div>
      </div> */}
			<Container>
				<Row>
					<Col xs="12" sm="12" lg="8">
						<ShippingForm form={form} />
					</Col>
					<Col xs="12" sm="12" lg="4">
						<ShippingDetail form={form} />
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Shipping;
