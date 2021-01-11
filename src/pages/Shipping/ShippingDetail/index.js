import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import "./index.scss";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { formatMoney } from "../../../utils/format";
const ship = 32000;
function ShippingDetail({ form }) {
	const { creatingOrder } = useSelector((state) => state.orders);
	// const { promotion, products } = creatingOrder
	const [total, setTotal] = useState(0);

	useEffect(() => {
		if (creatingOrder) {
			setTotal(
				creatingOrder.products.reduce(
					(a, b) => a + b.productId.salePrice * b.amount,
					0
				)
			);
		} else {
			<Redirect to="/products" />;
		}
	}, [creatingOrder]);

	return (
		<>
			{creatingOrder ? (
				<div className="detail_shipping">
					<div className="list-group">
						<div className="list-group-item header">ĐƠN HÀNG</div>
						<div className="list-group-item line"></div>
						{creatingOrder.products.map((pd, i) => (
							<>
								<div className="list-group-item text-1">
									<span className="text-3 text-3-1">
										{pd.productId.name}
									</span>
									<span className="text-3-3">
										{formatMoney(pd.productId.salePrice)}{" "}
										VND
									</span>
								</div>
								<div className="list-group-item text-2">
									<span className="text-4">
										Size: {pd.sizeId.name}{" "}
									</span>
									<span className="text-4-4">
										x {pd.amount}
									</span>
								</div>
							</>
						))}
						<div className="list-group-item dash"></div>
						<div className="list-group-item text-1 group-2">
							<span className="text-3 text-3-1">Đơn hàng </span>
							<span className="text-3-3 text-3-1-1">
								{formatMoney(total)} VND
							</span>
						</div>
						<div className="list-group-item text-1 group-2">
							<span className="text-3 text-3-1">Giảm </span>
							<span className="text-3-3 text-3-1">
								-
								{formatMoney(
									(total *
										creatingOrder?.promotion?.percent ||
										0) / 100
								)}
								VND
							</span>
						</div>
						<div className="list-group-item text-1-1 group-2">
							<span className="text-3">Phí vận chuyển </span>
							<span className="text-3-3">
								{formatMoney(ship)} VND
							</span>
						</div>
						<div className="list-group-item text-1-1">
							<span className="text-3">Phí thanh toán </span>
							<span className="text-3-3">
								{formatMoney(0)} VND
							</span>
						</div>
						<div className="list-group-item dash"></div>
						<div className="list-group-item text-1-1 text-4">
							<span className="text-3 text-4-1">TỔNG CỘNG </span>
							<span className="text-3 text-4-2">
								{formatMoney(
									total *
										(1 -
											(creatingOrder?.promotion
												?.percent || 0) /
												100) +
										ship
								)}
								VND
							</span>
						</div>
						<div className="list-group-item btnComplete">
							<Button
								className="btn btn-cart btn-complete-detail"
								// onClick={() => form.onFinish()}
								form="form"
								htmlType="submit"
							>
								HOÀN TẤT ĐẶT HÀNG
							</Button>
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
