import { React, memo } from "react";
import PropTypes from "prop-types";
import Image from "../../constant/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { HeartOutlined } from "@ant-design/icons";
import { Container, Row, Col } from "reactstrap";
import "./index.scss";

import CartContent from "./CartContent";
import OrderConent from "./OrderContent";

Payment.propTypes = {};

function Payment(props) {
  const { price } = props;
  return (
    <>
      {/* <div className="desktop_payment">
        <div className="container__pay">
          <CartContent />
          <OrderConent />
        </div>
      </div> */}
      <Container>
        <Row>
          <Col lg="8" sm="12">
            <CartContent />
          </Col>
          <Col lg="4" sm="12">
            <OrderConent />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default memo(Payment);
