import React, { useRef, useState } from "react";
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
import { changeCart } from "../../../slice/auth.slice";

const { Option } = Select;

function CartContent({ pd }) {
	const likeList = useSelector((state) => state.likeList);
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const token = useSelector((state) => state.token);
	const history = useHistory();
	const cart = useSelector((state) => state.cart);
	const [quality, setQuality] = useState(pd.amount);
	const [sizeSelect, setSizeSelect] = useState(
		pd.productId.sizes.find((size) => size.sizeId._id === pd.sizeId._id)
	);
	const refTimeout = useRef(null);

	const handleChangeMount = (value) => {
		setQuality(value);
		if (refTimeout.current) {
			clearTimeout(refTimeout.current);
		}
		refTimeout.current = setTimeout(() => {
			const data = auth.user.cart.map((pr) => {
				const tamp = { ...pr };
				if (
					pr.productId === pd.productId._id &&
					pr.sizeId === pd.sizeId._id
				)
					tamp.amount = value;
				return tamp;
			});
			if (auth.isLogged) {
				axios
					.patch(
						"http://localhost:3001/user/cart",
						{ cart: data },
						{
							headers: { Authorization: token },
						}
					)
					.then((res) => {
						dispatch(changeCart(data));
						notifiSuccess("Notify", res.data.msg);
					})
					.catch((err) =>
						notifiError("Notify", err.response.data.msg)
					);
			}
		}, 500);
	};

	const handleChangeSize = (select) => {
		setSizeSelect(
			pd.productId.sizes.find((size) => size.sizeId._id === select.value)
		);

		const cartNew = auth.user.cart.map((cart) => {
			const tamp = { ...cart };
			if (
				cart.productId === pd.productId._id &&
				cart.sizeId === pd.sizeId._id
			) {
				tamp.sizeId = select.value;
				tamp.amount = quality;
			}
			return tamp;
		});
		if (auth.isLogged) {
			axios
				.patch(
					"http://localhost:3001/user/cart",
					{
						cart: cartNew,
					},
					{ headers: { Authorization: token } }
				)
				.then((res) => {
					notifiSuccess("Notify", "Change size success");
					dispatch(changeCart(cartNew));
				})
				.catch((e) => {
					notifiError("Error", e.response.data.msg);
				});
		}
	};

	const handleHeart = (pd, type = true) => {
		if (type) {
			dispatch(addLikeList(pd.productId));
		} else {
			dispatch(removeProduct(pd.productId._id));
		}
	};

	const _deleteOne = (pd) => {
		if (auth.isLogged) {
			const data = auth.user.cart.filter((pr) => {
				if (
					pr.productId === pd.productId._id &&
					pr.sizeId === pd.sizeId._id
				)
					return false;
				return true;
			});
			axios
				.patch(
					"http://localhost:3001/user/cart",
					{ cart: data },
					{
						headers: { Authorization: token },
					}
				)
				.then((res) => {
					dispatch(changeCart(data));
					notifiSuccess("Notify", res.data.msg);
				})
				.catch((err) => notifiError("Notify", err.response.data.msg));
		}
	};
	return (
		<div className="cart__pay">
			<div className="left__detail">
				<div className="details__cart " key={pd.productId._id}>
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
										defaultValue={{
											value: pd.sizeId._id,
										}}
										style={{ width: 120 }}
										onChange={handleChangeSize}
									>
										{pd.productId.sizes.map((size) => (
											<Option value={size.sizeId._id}>
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
										max={sizeSelect.amount}
										defaultValue={1}
										onChange={handleChangeMount}
										value={quality}
									/>
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
								<Button
									type="primary"
									onClick={() => _deleteOne(pd)}
								>
									<DeleteOutlined />
								</Button>
							</div>
						</div>
					</div>
					{/* </Col>
          </Row>
        </Container> */}
				</div>
				{/* ))} */}
			</div>
			{/* ) : (<h3>Chưa có sản phẩm nào được thêm vào giỏ hàng</h3> */}
			{/* )} */}
		</div>
	);
}

export default CartContent;
