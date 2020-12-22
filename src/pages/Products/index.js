import React from "react";
import { Container } from "reactstrap";
// import "antd/dist/antd.css";

import { Row, Col, Pagination } from "antd";
import "./style.scss";
import Filters from "../../components/Filters";
import ProductCard from "../../components/ProductCard";

export default function ProductList(props) {
  return (
    <Container>
      <Row>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          <Filters />
        </Col>
        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
          <div
            style={{
              marginTop: "16px",
              paddingTop: "8px",
              marginBottom: "16px",
            }}
          >
            <Row justify="space-around">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </Row>
            <Row justify="center">
              <Pagination defaultCurrent={1} total={50} />
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
