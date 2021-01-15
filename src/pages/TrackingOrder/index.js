import * as moment from "moment";
import axios from "axios";
import { React, memo, useState, useRef } from "react";
import API from "../../axios";
import { useSelector } from "react-redux";
import "./index.css";
import { Loading } from "../../components";
import {
	notifiError,
	notifiSuccess,
	showErrMsg,
	showSuccessMsg,
} from "../../utils/notification";
import { Link } from "react-router-dom";
import { formatMoney } from "../../utils/format";
function TrackingOrder() {
	const token = useSelector((state) => state.token);
	const [order, setOrder] = useState(null);
	const [loading, setLoading] = useState(false);
	const errorRef = useRef(null);
	// neu kh lay du lieu ngay tu dau thi bo loading lai la false con ma lay du lieu ngay luc dau vao component ms bỏ true trc nge. ok. de t biet la cái page thong tin user , mới vô là nó load lấy dữ liệu ấy.
	const [input, setInput] = useState("");
	const handleChangeInput = (e) => {
		if (input !== "") errorRef.current.style.display = "none";
		const { value } = e.target;
		setInput(value);
	};
	console.log("input", input === "");
	const searchOrder = () => {
		if (input === "") errorRef.current.style.display = "block";
		else {
			setLoading(true);
			API("api/orders/" + input, "GET", token)
				.then((res) => {
					// console.log(res.data)
					setOrder(res.data);
					console.log("Order : ", order);
					setLoading(false);
				})
				.catch((err) => {
					notifiError(err.response.data.msg);
					setLoading(false);
				});
		}
	};
	const searchOrderAll = () => {
		setLoading(true);
		API("api/orders", "GET", token)
			.then((res) => {
				console.log(res.data);
				setOrder(res.data);
				console.log("Order : ", order);
				setLoading(false);
			})
			.catch((err) => {
				notifiError(err.response.data.msg);
				setLoading(false);
			});
	};
	return (
		<div className="trackingOrder_page">
			<div className="tracking_order">
				<h2 className="tracking_order--title">TRA CỨU ĐƠN HÀNG</h2>
				<div className="tracking_content">
					<div className="tracking_form-group">
						<input
							value={input}
							onChange={handleChangeInput}
							type="text"
							className="tracking_form-input"
							placeholder="MÃ ĐƠN HÀNG"
						/>
					</div>
					<span
						className="tracking_form-error"
						ref={errorRef}
						style={{ display: "none" }}
					>
						Vui lòng nhập mã đơn hàng muốn tra cứu
					</span>
					<div className="tracking_form-group">
						<button
							onClick={searchOrder}
							className="tracking_form-button"
						>
							TRA CỨU ĐƠN HÀNG
						</button>
					</div>
				</div>
			</div>
			{!loading ? (
				order && (
					<div className="info_order">
						<div className="info_order-header">
							<h2 className="tracking_order--title">
								THÔNG TIN ĐƠN HÀNG
							</h2>
							<span className="info_order-notice">
								Mong bạn thông cảm! Vì hệ thống đang cao điểm
								nên việc giao hàng có thể chậm hơn dự kiến.
							</span>
						</div>
						<div className="info_order-content">
							<div className="status_order">
								<div className="status_order-heading">
									<h3 className="status_order-heading--title">
										TRẠNG THÁI ĐƠN HÀNG{" "}
										<span>{order._id}</span>
									</h3>
									<span className="status_order-heading--more">
										Thanh toán COD - Tốc độ tiêu chuẩn
									</span>
								</div>
								<div className="status_order-content">
									<div className="status_order-content--box">
										<div className="status_order-content--title">
											<span
												className={
													order.status === -1
														? "active-status"
														: ""
												}
											>
												ĐANG XÁC NHẬN
											</span>
											<i className="arrow right"></i>
										</div>
										<div className="status_order-content--title">
											<span
												className={
													order.status === 0
														? "active-status"
														: ""
												}
											>
												CHUYỂN QUA GIAO NHẬN
											</span>
											<i className="arrow right"></i>
										</div>
										<div className="status_order-content--title">
											<span
												className={
													order.status === 1
														? "active-status"
														: ""
												}
											>
												ĐANG GIAO HÀNG
											</span>
											<i className="arrow right"></i>
										</div>
										<div
											className={`status_order-content--title ${
												order.status === 2
													? "active-status"
													: ""
											}`}
										>
											GIAO HÀNG THÀNH CÔNG
										</div>
									</div>
									<div className="status_order-content--detail">
										<div className="status_order-content--description">
											<span>
												Vào lúc{" "}
												{moment(order.createAt).format(
													"hh:mm"
												)}
												-{" "}
												{moment(order.createAt).format(
													"DD/MM/YYYY"
												)}
											</span>
											<p>
												Thời gian xử lý đơn hàng có thể
												từ 1-2 ngày làm việc. Vui lòng
												gọi đến hotline 0963 429 749
												(trong giờ hành chính) nếu bạn
												muốn thay đổi thông tin đơn hàng
												trước khi đơn hàng của bạn được
												CHUYỂN QUA GIAO NHẬN.
											</p>
										</div>
										<div className="status_order-content--description">
											<span>
												Vào lúc{" "}
												{moment(order.updatedAt).format(
													"hh:mm"
												)}
												-{" "}
												{moment(order.updatedAt).format(
													"DD/MM/YYYY"
												)}
											</span>
											<p>
												Đơn hàng của bạn đã được đóng
												gói và chuyển cho đơn vị vận
												chuyển.
											</p>
										</div>
										<div className="status_order-content--description">
											<p>
												Thời gian giao hàng tuỳ thuộc
												vào địa điểm và phương thức giao
												hàng bạn đã chọn. Hãy tin rắng
												chúng tôi luôn cố gắng để hàng
												đến tay bạn sớm nhất!
											</p>
										</div>
										<div className="status_order-content--description">
											<span>
												Vào lúc{" "}
												{moment(order.dateOrder).format(
													"hh:mm"
												)}
												-{" "}
												{moment(order.dateOrder).format(
													"DD/MM/YYYY"
												)}
											</span>
											<p>
												Đơn hàng đã được giao thành công
												! Chúc bạn có một trải nghiệm
												thú vị ^^
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="detail_order">
								<div className="detail_order-box">
									<h3 className="detail_order-box-heading">
										THÔNG TIN KHÁCH HÀNG
									</h3>
									<div className="detail_order-box-decription">
										<span>Họ tên: {order.user.name}</span>
										<span>
											Điện thoại: {order.user.phone}
										</span>
										<span>Email: {order.user.email}</span>
										<span>
											Địa chỉ: {order.user.address}
										</span>
										<span>
											Quận/Huyện: {order.user.district}
										</span>
										<span>
											Thành phố/Tỉnh:{" "}
											{order.user.provincial}{" "}
										</span>
									</div>
								</div>
								<div className="detail_order-box">
									<h3 className="detail_order-box-heading">
										THÔNG TIN GIAO NHẬN
									</h3>
									<div className="detail_order-box-decription">
										<span>Họ tên: {order.user.name}</span>
										<span>
											Điện thoại: {order.user.phone}
										</span>
										<span>Email: {order.user.email}</span>
										<span>Địa chỉ: {order.address}</span>
										<span>
											Quận/Huyện: {order.user.district}
										</span>
										<span>
											Thành phố/Tỉnh:{" "}
											{order.user.provincial}{" "}
										</span>
									</div>
								</div>
								<div className="detail_order-box">
									<h3 className="detail_order-box-heading">
										DANH SÁCH SẢN PHẨM
									</h3>
									<div className="detail_order-box-decription scroll">
										{order.products.map(
											(product, index) => {
												return (
													<div className="detail_order-box-product">
														<div className="product_order-image">
															<a>
																<img
																	src={
																		product
																			.productId
																			.images[0]
																	}
																	alt="photo"
																/>
															</a>
														</div>
														<div className="product_order-detail">
															<h5>
																{
																	product
																		.productId
																		.name
																}
															</h5>
															<h5>
																Giá:
																<span>
																	{formatMoney(
																		product.price
																	)}
																</span>
															</h5>
															<h5>
																Size:
																<span>
																	{
																		product
																			.sizeId
																			.name
																	}
																</span>
															</h5>
															<h5>
																Số Lượng:
																<span>
																	{
																		product.amount
																	}
																</span>
															</h5>
															<h5>
																{formatMoney(
																	product.price *
																		product.amount
																)}
															</h5>
														</div>
													</div>
												);
											}
										)}
										{/* <div className="detail_order-box-product">
									<div className="product_order-image">
										<a>
											<img src="https://thucphamplaza.com/tpplaza_content/uploads/products_img/gio-qua-2021-TP03-logo-small.jpg" alt="photo" />
										</a>
									</div>
									<div className="product_order-detail">
										<h5>Vintas Yesterday - Low Top - Moonstruck Pirate Moonstruck Pirate</h5>
										<h5>Giá:<span>480.000 VNĐ</span></h5>
										<h5>Size:<span>40</span></h5>
										<h5>Số Lượng:<span>1</span></h5>
										<h5>480.000 VNĐ</h5>
									</div>
								</div>
								<div className="detail_order-box-product">
									<div className="product_order-image">
										<a>
											<img src="https://thucphamplaza.com/tpplaza_content/uploads/products_img/gio-qua-2021-TP03-logo-small.jpg" alt="photo" />
										</a>
									</div>
									<div className="product_order-detail">
										<h5>Vintas Yesterday - Low Top - Moonstruck Pirate Moonstruck Pirate</h5>
										<h5>Giá:<span>480.000 VNĐ</span></h5>
										<h5>Size:<span>40</span></h5>
										<h5>Số Lượng:<span>1</span></h5>
										<h5>480.000 VNĐ</h5>
									</div>
								</div>
								<div className="detail_order-box-product">
									<div className="product_order-image">
										<a>
											<img src="https://thucphamplaza.com/tpplaza_content/uploads/products_img/gio-qua-2021-TP03-logo-small.jpg" alt="photo" />
										</a>
									</div>
									<div className="product_order-detail">
										<h5>Vintas Yesterday - Low Top - Moonstruck Pirate Moonstruck Pirate</h5>
										<h5>Giá:<span>480.000 VNĐ</span></h5>
										<h5>Size:<span>40</span></h5>
										<h5>Số Lượng:<span>1</span></h5>
										<h5>480.000 VNĐ</h5>
									</div>
								</div> */}
									</div>
								</div>

								<div className="detail_order-box">
									<h3 className="detail_order-box-heading">
										THANH TOÁN
									</h3>
									<div className="detail_order-box-decription">
										<div className="detail_order-fee">
											<div className="detail_order-fee-wrapp">
												<span>Trị giá đơn hàng:</span>
												<h5>
													{formatMoney(
														(order.intoMoney /
															(100 -
																(order.promotion
																	? order
																			.promotion
																			.percent
																	: 0))) *
															100
													)}
												</h5>
											</div>
											<div className="detail_order-fee-wrapp">
												<span>Giảm giá:</span>
												<h5>
													{formatMoney(
														(order?.promotion
															?.percent || 0) *
															(order.intoMoney /
																(100 -
																	(order.promotion
																		? order
																				.promotion
																				.percent
																		: 0))) *
															100
													)}{" "}
													VND
												</h5>
											</div>
											<div className="detail_order-fee-wrapp">
												<span>Phí giao hàng:</span>
												<h5>
													{formatMoney(
														order.shipMoney
													)}
												</h5>
											</div>
											<div className="detail_order-fee-wrapp">
												<span>Phí thanh toán:</span>
												<h5>{formatMoney(0)} VND</h5>
											</div>
										</div>
										<div className="detail_order-total-price">
											<div className="detail_order-fee-wrapp">
												<h5>Tổng thanh toán:</h5>
												<h5>
													{formatMoney(order.total)}
												</h5>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="detail_order-action">
								<div></div>
								<Link to="/" className="detail_order-btn">
									QUAY LẠI TRANG CHỦ
								</Link>
							</div>
						</div>
					</div>
				)
			) : (
				<Loading />
			)}
		</div>
	);
}
export default memo(TrackingOrder);
