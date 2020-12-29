import { React, memo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HeartOutlined } from "@ant-design/icons";
import { Container, Row, Col } from "reactstrap";
import "./index.scss";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import CartContent from "./CartContent";
import OrderConent from "./OrderContent";
import axios from "axios";
import { setCart } from "../../slice/cart.slice";
import { notifiError, notifiSuccess } from "../../utils/notification";
import { useHistory } from "react-router-dom";
Payment.propTypes = {};

function Payment(props) {
  const { price } = props;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const history = useHistory();
  const _deleteCart = () => {
    axios
      .patch(
        "http://localhost:3001/user/cart",
        { cart: [] },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        dispatch(setCart([]));
        notifiSuccess("Notify", res.data.msg);
      })
      .catch((err) => {
        notifiError("Notify", err.response.data.msg);
      });
  };

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
            <div className="btn btn-delete-back">
              <Button                
                className="btn__delete"
                onClick={_deleteCart}
              >
                XOÁ HẾT
              </Button>
              <Button
                className="btn__back"
                onClick={() => history.push("/products")}
              >
                QUAY LẠI MUA HÀNG
              </Button>
            </div>
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
