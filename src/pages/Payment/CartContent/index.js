import React, { useState } from "react";
import PropTypes from "prop-types";
import "./index.scss";
import { Container, Row, Col } from "reactstrap";
import {
  DeleteOutlined,
  HeartOutlined,
  HeartFilled,
  HeartTwoTone,
} from "@ant-design/icons";
import { Button } from "antd";

function CartContent(props) {
  const [heart, setHeart] = useState("false");

  const handleHeart = () => {
    setHeart(!heart);
  };
  const { price } = props;

  const imageProduct1 =
    "https://ananas.vn/wp-content/uploads/pro_vintas_A61040_1.jpg";
  return (
    <div className="cart__pay">
      <div className="header__cart">GIỎ HÀNG</div>
      <div className="left__detail">
        <div className="details__cart ">
          {/* <Container className="container"> */}
          {/* <Row className="details__cart"> */}
          {/* <Col className="col" xs="9"> */}
          <div className="img_detail__cart">
            <div className="logo">
              <img src={imageProduct1} alt="" />
            </div>
            <div className="detail">
              <div className="detail__content">
                <div className="name">
                  Urbas Unsettling - Low Top - Starlight/Lavender
                </div>
                <div className="price">
                  <b>Giá: </b>
                  {price}500.000 VND
                </div>
              </div>
              <div className="size-amount">
                <div className="size">
                  <div>
                    <span>Size</span>
                  </div>
                  <select name="size" id="size">
                    <option value="35" disabled="true">
                      35
                    </option>
                    <option value="35">36</option>
                    <option value="35">37</option>
                    <option value="35">38</option>
                    <option value="35">39</option>
                    <option value="35">40</option>
                    <option value="35">41</option>
                    <option value="35">42</option>
                    <option value="35">43</option>
                  </select>
                </div>
                <div className="amount">
                  <div>
                    <span>Số lượng</span>
                  </div>
                  <select name="size" id="size">
                    <option value="1" disabled="true">
                      1
                    </option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* </Col>
            <Col> */}
          <div className="action">
            <div className="price__status">
              <div className="price__action">{price}500.000 VND</div>
              <div className="status">Còn hàng</div>
            </div>
            <div className="btnAction">
              <div className="heartBtn">
                <Button type="default" onClick={handleHeart}>
                  {heart === true ? (
                    <HeartOutlined />
                  ) : (
                    <HeartTwoTone twoToneColor="#f00" />
                  )}
                  {/* <HeartOutlined
                    // style={{
                    //   backgroundColor:
                    //     heart === true ? "#f15e2c" : "tranparent",
                    // }}
                    onClick={handleHeart}
                  /> */}
                </Button>
              </div>
              <div className="deleteBtn">
                <Button type="primary">
                  <DeleteOutlined />
                </Button>
              </div>
            </div>
          </div>
          {/* </Col>
          </Row>
        </Container> */}
        </div>
        <div className="btn btn-delete-back">
          <Button type="primary" className="btn__delete">
            XOÁ HẾT
          </Button>
          <Button className="btn__back">QUAY LẠI MUA HÀNG</Button>
        </div>
      </div>
    </div>
  );
}

export default CartContent;
