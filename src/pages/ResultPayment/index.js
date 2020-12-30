import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../slice/cart.slice";
ResultPayment.propTypes = {};

function ResultPayment({ socket }) {
	const [loading, setLoading] = useState(true);
	const location = useLocation();
	const vnpay = queryString.parse(location.search);
	const token = useSelector((state) => state.token);
	const history = useHistory();
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	useEffect(() => {
		setLoading(true);
		try {
			axios
				.post(
					"http://localhost:3001/api/payment_return",
					{
						vnpay,
					},
					{ headers: { Authorization: token } }
				)
				.then((res) => {
					const { products } = res.data;
					if (cart.toString() === products.toString()) {
						dispatch(setCart({ cart: [], type: true }));
					} else {
						const newCart = cart.filter((ca) => {
							return products.some((p) => p._id === ca._id);
						});
						axios
							.patch(
								"http://localhost:3001/user/cart",
								{
									cart: newCart,
								},
								{ headers: { Authorization: token } }
							)
							.then((res) => {
								dispatch(
									setCart({ cart: newCart, type: true })
								);
							});
					}
					history.push("/order");
				})
				.catch((e) => history.push("/cart"));
		} catch (e) {
			console.log(e);
		}
		setLoading(false);
	}, []);
	return <div>thanh toán</div>;
}

export default ResultPayment;
