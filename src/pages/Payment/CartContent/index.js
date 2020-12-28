import React, { useState } from "react";
import PropTypes from "prop-types";
import "./index.scss";
import { Container, Row, Col } from "reactstrap";
import { DeleteOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Button, Select, InputNumber } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addLikeList, removeProduct } from "../../../slice/likelist.slice";
import axios from "axios";
import { setCart } from "../../../slice/cart.slice";
import { useHistory } from "react-router-dom";
import { notifiError, notifiSuccess } from "../../../utils/notification";

const { Option } = Select;

function CartContent(props) {
  const [heart, setHeart] = useState("false");
  const cart = useSelector((state) => state.cart);
  const likeList = useSelector((state) => state.likeList);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const history = useHistory();

  const [amountBy, setAmountBy] = useState(1);
  const handleChangeMount = (e) => {
    console.log(e);
    // setAmountBy(e);
  };

  const handleHeart = (pd, type = true) => {
    if (type) {
      dispatch(addLikeList(pd.productId));
    } else {
      dispatch(removeProduct(pd.productId._id));
    }
  };

  const _deleteOne = (pd) => {
    const data = cart.filter((pr) => pr.productId._id !== pd.productId._id);
    axios
      .patch(
        "http://localhost:3001/user/cart",
        { cart: data },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        dispatch(setCart(data));
        notifiSuccess("Notify", res.data.msg);
      });
    // .catch((err) => notifiError("Notify", err.response.data.msg));
  };
  return (
    <div className="cart__pay">
      <div className="header__cart">GIỎ HÀNG</div>
      {cart.length > 0 ? (
        <div className="left__detail">
          {cart.map((pd, i) => (
            <div className="details__cart " key={pd.productId._id}>
              {/* <Container className="container"> */}
              {/* <Row className="details__cart"> */}
              {/* <Col className="col" xs="9"> */}
              <div className="img_detail__cart">
                <div className="logo">
                  <img src={pd.productId.images[0]} alt="" />
                </div>
                <div className="detail">
                  <div className="detail__content">
                    <div className="name">{pd.productId.name}</div>
                    <div className="price">
                      <b>Giá: </b>
                      {pd.productId.salePrice} VND
                    </div>
                  </div>
                  <div className="size-amount">
                    <div className="size">
                      <div>
                        <span>Size</span>
                      </div>
                      <Select
                        labelInValue
                        defaultValue={{ value: "size" }}
                        style={{ width: 120 }}
                      >
                        {pd.productId.sizes.map((size) => (
                          <Option
                            value={size.sizeId._id}
                            selected={size.sizeId._id === pd.sizeId}
                          >
                            {size.sizeId.name}
                          </Option>
                        ))}
                      </Select>
                    </div>
                    <div className="amount">
                      <div>
                        <span>Số lượng</span>
                      </div>
                      <InputNumber
                        min={1}
                        max={10}
                        defaultValue={1}
                        onChange={(e) => handleChangeMount(e)}
                        // placeholder="Số lượng"
                      />
                      {/* <Select
                        labelInValue="Số lượng"
                        defaultValue={{ value: "số lượng" }}
                        style={{ width: 120, fontWeight: "normal" }}
                      >
                        {pd.productId.sizes.map((size) => (
                          <Option
                            value={size.sizeId._id}
                            selected={size.sizeId._id === pd.sizeId}
                          >
                            {size.sizeId.name}
                          </Option>
                        ))}
                      </Select> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* </Col>
            <Col> */}
              <div className="action">
                <div className="price__status">
                  <div className="price__action">
                    {pd.productId.salePrice} VND
                  </div>
                  <div className="status">Còn hàng</div>
                </div>
                <div className="btnAction">
                  <div className="heartBtn">
                    {likeList.some((ll) => ll._id === pd.productId._id) ? (
                      <Button
                        // type="default"
                        onClick={() => handleHeart(pd, false)}
                      >
                        <HeartFilled style={{ color: "red" }} />
                      </Button>
                    ) : (
                      <Button
                        // type="default"
                        onClick={() => handleHeart(pd, true)}
                      >
                        <HeartOutlined />
                      </Button>
                    )}
                  </div>
                  <div className="deleteBtn">
                    <Button type="primary" onClick={() => _deleteOne(pd)}>
                      <DeleteOutlined />
                    </Button>
                  </div>
                </div>
              </div>
              {/* </Col>
          </Row>
        </Container> */}
            </div>
          ))}
        </div>
      ) : (
        <h3>Chưa có sản phẩm nào được thêm vào giỏ hàng</h3>
      )}
    </div>
  );
}

export default CartContent;
