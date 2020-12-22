import React, { useState } from "react";
import PropTypes from "prop-types";
import "./index.scss";
import { Container, Row, Col } from "reactstrap";
import { DeleteOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addLikeList, removeProduct } from "../../../slice/likelist.slice";
import axios from "axios";
import { setCart } from "../../../slice/cart.slice";
import { useHistory } from "react-router-dom";
function CartContent(props) {
	const [heart, setHeart] = useState("false");
	const cart = useSelector((state) => state.cart);
	const likeList = useSelector((state) => state.likeList);
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const history = useHistory();

	const handleHeart = (pd, type = true) => {
		if (type) {
			console.log(likeList.some((lk) => lk._id !== pd.productId._id));
			dispatch(addLikeList(pd.productId));
		} else {
			dispatch(removeProduct(pd.productId._id));
		}
	};
	const _deleteCart = () => {
		axios
			.patch(
				"http://localhost:3001/user/cart",
				{ cart: [] },
				{
					headers: { Authorization: token },
				}
			)
			.then((res) => dispatch(setCart([])))
			.catch((err) => console.log);
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
										<div className="name">
											{pd.productId.name}
										</div>
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
											<select name="size" id="size">
												{pd.productId.sizes.map(
													(size) => (
														<option
															value={
																size.sizeId._id
															}
															selected={
																size.sizeId
																	._id ===
																pd.sizeId._id
															}
														>
															{size.sizeId.name}
														</option>
													)
												)}
											</select>
										</div>
										<div className="amount">
											<div>
												<span>Số lượng</span>
											</div>
											<select name="size" id="size">
												<option
													value="1"
													disabled="true"
												>
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
									<div className="price__action">
										{pd.productId.salePrice} VND
									</div>
									<div className="status">Còn hàng</div>
								</div>
								<div className="btnAction">
									<div className="heartBtn">
										{likeList.some(
											(ll) => ll._id === pd.productId._id
										) ? (
											<Button
												// type="default"
												onClick={() =>
													handleHeart(pd, false)
												}
											>
												<HeartFilled
													style={{ color: "red" }}
												/>
											</Button>
										) : (
											<Button
												// type="default"
												onClick={() =>
													handleHeart(pd, true)
												}
											>
												<HeartOutlined />
											</Button>
										)}
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
				</div>
			) : (
				<h3>Chưa có sản phẩm nào được thêm vào giỏ hàng</h3>
			)}
		</div>
	);
}

export default CartContent;
