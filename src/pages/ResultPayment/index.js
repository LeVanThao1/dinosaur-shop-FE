import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../slice/cart.slice";
import { changeCart } from "../../slice/auth.slice";
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
					axios
						.put(
							"http://localhost:3001/user/cart",
							{
								cart: [],
							},
							{ headers: { Authorization: token } }
						)
						.then((res) => {
							dispatch(setCart({ cart: [], type: true }));
							dispatch(changeCart([]));
							history.push("/orders");
						})
						.catch((e) => history.push("/cart"));
				});
		} catch (e) {
			history.push("/cart");
		}
		setLoading(false);
	}, []);
	return <></>;
}

export default ResultPayment;
