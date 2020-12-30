import React from "react";
import PropTypes from "prop-types";

import "./index.scss";

function ShippingDetail(props) {
	const {
		name,
		phone_number,
		email,
		address,
		delivery_price,
		size,
		amount,
		price,
		reduction,
		pay_price,
	} = props;

	const total = +price - +reduction + +delivery_price + +pay_price;
	return (
		<div className="detail_shipping">
			<div className="list-group">
				<div className="list-group-item header">ĐƠN HÀNG</div>
				<div className="list-group-item line"></div>
				<div className="list-group-item text-1">
					<span className="text-3 text-3-1">
						{}Urbas Unsettling - Low Top - Starlight/Lavender
					</span>
					<span className="text-3-3">{price}490.000 VND</span>
				</div>
				<div className="list-group-item text-2">
					<span className="text-4">Size: {size}40 </span>
					<span className="text-4-4">x{amount}1</span>
				</div>
				<div className="list-group-item dash"></div>
				<div className="list-group-item text-1 group-2">
					<span className="text-3 text-3-1">Đơn hàng </span>
					<span className="text-3-3 text-3-1-1">
						{price}490.000 VND
					</span>
				</div>
				<div className="list-group-item text-1 group-2">
					<span className="text-3 text-3-1">Giảm </span>
					<span className="text-3-3 text-3-1">
						- {reduction}0 VND
					</span>
				</div>
				<div className="list-group-item text-1-1 group-2">
					<span className="text-3">Phí vận chuyển </span>
					<span className="text-3-3">{delivery_price}50.000 VND</span>
				</div>
				<div className="list-group-item text-1-1">
					<span className="text-3">Phí thanh toán </span>
					<span className="text-3-3">{pay_price}0 VND</span>
				</div>
				<div className="list-group-item dash"></div>
				<div className="list-group-item text-1-1 text-4">
					<span className="text-3 text-4-1">TỔNG CỘNG </span>
					<span className="text-3 text-4-2">{total}815.000 VND</span>
				</div>
				<div className="list-group-item btnComplete">
					<button className="btn btn-cart btn-complete-detail">
						HOÀN TẤT ĐẶT HÀNG
					</button>
				</div>
			</div>
		</div>
	);
}

export default ShippingDetail;
