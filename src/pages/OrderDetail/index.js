import React, { useEffect } from "react";
import * as moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import API from "../../axios";
import { setLoading } from "../../slice/loading.slice";
import { setCurrentOrder } from "../../slice/order.slice";
import { notifiError } from "../../utils/notification";
import "./index.scss";
import "../TrackingOrder/index.css";
import { formatMoney } from "../../utils/format";

function OrderDetail(props) {
	const { currentOrder } = useSelector((state) => state.orders);
	const { id } = useParams();
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.loading);
	const token = useSelector((state) => state.token);
	useEffect(() => {
		if (!currentOrder) {
			dispatch(setLoading(true));
			API("api/orders/" + id, "GET", token)
				.then((res) => {
					dispatch(setCurrentOrder(res.data));
					dispatch(setLoading(false));
				})
				.catch((err) => {
					dispatch(setLoading(false));
					notifiError(err.response.data.msg);
				});
			dispatch(setLoading(false));
		}
	}, [id]);
	return (
		<>
			{!loading && currentOrder ? (
				<div className="trackingOrder_page">
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
										<span>{currentOrder._id}</span>
									</h3>
									<span className="status_order-heading--more">
										Thanh toán COD - Tốc độ tiêu chuẩn
									</span>
								</div>
								<div className="status_order-content">
									<div className="status_order-content--box">
										<div className="status_order-content--title">
											<span>ĐẶT HÀNG THÀNH CÔNG</span>
											<i class="arrow right"></i>
										</div>
										<div className="status_order-content--title">
											<span>CHUYỂN QUA GIAO NHẬN</span>
											<i class="arrow right"></i>
										</div>
										<div className="status_order-content--title">
											<span>ĐANG GIAO HÀNG</span>
											<i class="arrow right"></i>
										</div>
										<div className="status_order-content--title">
											GIAO HÀNG THÀNH CÔNG
										</div>
									</div>
									<div className="status_order-content--detail">
										<div className="status_order-content--description">
											<span>
												Vào lúc{" "}
												{moment(
													currentOrder.createAt
												).format("hh:mm")}
												-{" "}
												{moment(
													currentOrder.createAt
												).format("DD/MM/YYYY")}
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
												{moment(
													currentOrder.updatedAt
												).format("hh:mm")}
												-{" "}
												{moment(
													currentOrder.updatedAt
												).format("DD/MM/YYYY")}
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
												{moment(
													currentOrder.dateOrder
												).format("hh:mm")}
												-{" "}
												{moment(
													currentOrder.dateOrder
												).format("DD/MM/YYYY")}
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
										<span>
											Họ tên: {currentOrder.user.name}
										</span>
										<span>
											Điện thoại:{" "}
											{currentOrder.user.phone}
										</span>
										<span>
											Email: {currentOrder.user.email}
										</span>
										<span>
											Địa chỉ: {currentOrder.user.address}
										</span>
										<span>
											Quận/Huyện:{" "}
											{currentOrder.user.district}
										</span>
										<span>
											Thành phố/Tỉnh:{" "}
											{currentOrder.user.provincial}{" "}
										</span>
									</div>
								</div>
								<div className="detail_order-box">
									<h3 className="detail_order-box-heading">
										THÔNG TIN GIAO NHẬN
									</h3>
									<div className="detail_order-box-decription">
										<span>
											Họ tên: {currentOrder.user.name}
										</span>
										<span>
											Điện thoại:{" "}
											{currentOrder.user.phone}
										</span>
										<span>
											Email: {currentOrder.user.email}
										</span>
										<span>
											Địa chỉ: {currentOrder.address}
										</span>
										<span>
											Quận/Huyện:{" "}
											{currentOrder.user.district}
										</span>
										<span>
											Thành phố/Tỉnh:{" "}
											{currentOrder.user.provincial}{" "}
										</span>
									</div>
								</div>
								<div className="detail_order-box">
									<h3 className="detail_order-box-heading">
										DANH SÁCH SẢN PHẨM
									</h3>
									<div className="detail_order-box-decription scroll">
										{currentOrder.products.map(
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
														currentOrder.total
													)}
												</h5>
											</div>
											<div className="detail_order-fee-wrapp">
												<span>Giảm giá:</span>
												<h5>
													{formatMoney(
														(currentOrder.promotion
															.percent *
															currentOrder.intoMoney) /
															100
													)}
												</h5>
											</div>
											<div className="detail_order-fee-wrapp">
												<span>Phí giao hàng:</span>
												<h5>
													{formatMoney(
														currentOrder.shipMoney
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
													{formatMoney(
														currentOrder.total -
															currentOrder.shipMoney
													)}
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
				</div>
			) : (
				<div>Don hang khong ton tai</div>
			)}
		</>
	);
}

export default OrderDetail;
