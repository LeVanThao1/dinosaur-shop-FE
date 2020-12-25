import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./index.scss";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
// import VNPay from "vnpay";
function ViewedProduct(props) {
	const seenlist = useSelector((state) => state.seenlist);
	const history = useHistory();
	const token = useSelector((state) => state.token);

	// useEffect(() => {
	// 	axios
	// 		.post(
	// 			"http://localhost:3001/api/create_payment_url",
	// 			{
	// 				address: "32 le van duc",
	// 				shipMoney: 30000,
	// 				products: [
	// 					{
	// 						productId: "5fccf7dfe508f35b04ab5ec6",
	// 						sizeId: "5fc5c01e0d06ee295d16901e",
	// 						amount: 1,
	// 						price: 420000,
	// 					},
	// 					{
	// 						productId: "5fccf7f1e508f35b04ab5eca",
	// 						sizeId: "5fc5c01e0d06ee295d16901e",
	// 						amount: 1,
	// 						price: 420000,
	// 					},
	// 				],
	// 				typePayment: 1,
	// 			},
	// 			{ headers: { Authorization: token } }
	// 		)
	// 		.then((res) => {
	// 			console.log(res);
	// 			// Redirect(res.data.url);
	// 			window.location.href = res.data.url;
	// 		});
	// }, []);
	return (
		<div className="container">
			<div className="header">
				<span>SẢN PHẨM ĐÃ XEM</span>
			</div>
			<div className="view_produtct list-group-1">
				{seenlist.length > 0 &&
					seenlist.map((ss, i) => (
						<div
							className="list--item"
							key={i}
							onClick={() =>
								history.push("/product-detail/" + ss._id)
							}
						>
							<img src={ss.images[0]}></img>
						</div>
					))}
			</div>
		</div>
	);
}

export default ViewedProduct;
