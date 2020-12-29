import React, { memo, useEffect } from "react";
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
import { setLoading } from "../../slice/loading.slice";
import { notifiError, notifiSuccess } from "../../utils/notification";
import { useHistory } from "react-router-dom";
import API from "../../axios";
Payment.propTypes = {};

function Payment(props) {
	// const { price } = props;
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const history = useHistory();
	const cart = useSelector((state) => state.cart);
	const auth = useSelector((state) => state.auth);
	const loading = useSelector((state) => state.loading);

	useEffect(() => {
		if (auth.isLogged) {
			dispatch(setLoading(true));
			API("user/cart", "GET", token)
				.then((res) => {
					dispatch(setCart(res.data.cart));
					dispatch(setLoading(false));
				})
				.catch((err) => {
					dispatch(setLoading(false));
					console.error(err);
				});
		}
	}, [auth.user.cart]);
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
			<Container>
				<Row>
					<Col lg="8" sm="12">
						<div className="header__cart">GIỎ HÀNG</div>
						{cart &&
							cart?.map((pd, i) => (
								<CartContent pd={pd} key={pd._id} />
							))}
						<div className="btn btn-delete-back">
							<Button
								type="primary"
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
