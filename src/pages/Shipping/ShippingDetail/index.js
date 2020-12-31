import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./index.scss";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
const ship = 32000;
function ShippingDetail(props) {
	const cart = useSelector((state) => state.cart);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		if (cart) {
			setTotal(
				cart.reduce((a, b) => a + b.productId.salePrice * b.amount, 0)
			);
		}
	}, [cart]);
	return (
		<>
			{cart ? (
				<div className="detail_shipping">
					<div className="list-group">
						<div className="list-group-item header">ĐƠN HÀNG</div>
						<div className="list-group-item line"></div>
						{cart.map((pd, i) => (
							<>
								<div className="list-group-item text-1">
									<span className="text-3 text-3-1">
										{pd.productId.name}
									</span>
									<span className="text-3-3">
										{pd.productId.salePrice} VND
									</span>
								</div>
								<div className="list-group-item text-2">
									<span className="text-4">
										Size: {pd.sizeId.name}{" "}
									</span>
									<span className="text-4-4">
										x{pd.amount}
									</span>
								</div>
							</>
						))}
						<div className="list-group-item dash"></div>
						<div className="list-group-item text-1 group-2">
							<span className="text-3 text-3-1">Đơn hàng </span>
							<span className="text-3-3 text-3-1-1">
								{total} VND
							</span>
						</div>
						<div className="list-group-item text-1 group-2">
							<span className="text-3 text-3-1">Giảm </span>
							<span className="text-3-3 text-3-1">- 0 VND</span>
						</div>
						<div className="list-group-item text-1-1 group-2">
							<span className="text-3">Phí vận chuyển </span>
							<span className="text-3-3">{ship} VND</span>
						</div>
						<div className="list-group-item text-1-1">
							<span className="text-3">Phí thanh toán </span>
							<span className="text-3-3">0 VND</span>
						</div>
						<div className="list-group-item dash"></div>
						<div className="list-group-item text-1-1 text-4">
							<span className="text-3 text-4-1">TỔNG CỘNG </span>
							<span className="text-3 text-4-2">
								{total + ship} VND
							</span>
						</div>
						<div className="list-group-item btnComplete">
							<button
								className="btn btn-cart btn-complete-detail"
								// onClick={}
								htmpType
							>
								HOÀN TẤT ĐẶT HÀNG
							</button>
						</div>
					</div>
				</div>
			) : (
				<Redirect to="/cart" />
			)}
		</>
	);
}

export default ShippingDetail;
