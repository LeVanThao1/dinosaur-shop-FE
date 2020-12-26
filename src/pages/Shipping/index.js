import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

import { Container, Row, Col } from "reactstrap";
import ShippingForm from "./ShippingForm";
import ShippingDetail from "./ShippingDetail";

function Shipping(props) {
  return (
    <>
      {/* <div className="desktop_shipping">
        <div className="container"></div>
      </div> */}
      <Container>
        <Row>
          <Col xs="12" sm="12" lg="8">
            <ShippingForm />
          </Col>
          <Col xs="12" sm="12" lg="4">
            <ShippingDetail />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Shipping;
