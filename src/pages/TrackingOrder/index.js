import axios from "axios";
import { React, memo, useState, useRef } from 'react'

import './index.css'

function TrackingOrder() {
	const [order, setOrder] = useState({})
	const [loading, setLoading] = useState(true)
	const [input, setInput] = useState('')
	
	const handleChangeInput = (e) => {
        const { value } = e.target;
        setInput(value);
	};
	
	const searchOrder = ()=> {
        // let temp = axios.get()
	}
	
	return (
		<div className="trackingOrder_page">
			<div className="tracking_order">
				<h2 className="tracking_order--title">
					TRA CỨU ĐƠN HÀNG
                </h2>
				<div className="tracking_content">
					<form className="tracking_form">
						<div className="tracking_form-group">
							<input value={input} onChange={handleChangeInput} type="text" class="tracking_form-input" placeholder="MÃ ĐƠN HÀNG" />
						</div>
						<div className="tracking_form-group">
							<input type="submit" class="tracking_form-button" value="TRA CỨU ĐƠN HÀNG" />
						</div>
					</form>
				</div>
			</div>
			<div className="info_order">
				<div className="info_order-header">
					<h2 className="tracking_order--title">THÔNG TIN ĐƠN HÀNG</h2>
					<span className="info_order-notice">
						Mong bạn thông cảm! Vì hệ thống đang cao điểm nên việc giao hàng có thể chậm hơn dự kiến.
                    </span>
				</div>
				<div className="info_order-content">
					<div className="status_order">
						<div className="status_order-heading">
							<h3 className="status_order-heading--title">TRẠNG THÁI ĐƠN HÀNG <span>W321P</span></h3>
							<span className="status_order-heading--more">Thanh toán COD - Tốc độ tiêu chuẩn</span>
						</div>
						<div className="status_order-content">
							<div className="status_order-content--box">
								<div className="status_order-content--title">
									<span>ĐẶT HÀNG THÀNH CÔNG</span>
									<i class="arrow right"></i>
								</div>
								<div className="status_order-content--title">
									<span>ĐẶT HÀNG THÀNH CÔNG</span>
									<i class="arrow right"></i>
								</div>
								<div className="status_order-content--title">
									<span>ĐẶT HÀNG THÀNH CÔNG</span>
									<i class="arrow right"></i>
								</div>
								<div className="status_order-content--title">
									GIAO HÀNG THÀNH CÔNG
                                </div>
							</div>
							<div className="status_order-content--detail">
								<div className="status_order-content--description">
									<span>Vào lúc 10:55 - 14/07/2020</span>
									<p>Thời gian xử lý đơn hàng có thể từ 1-2 ngày làm việc. Vui lòng gọi đến hotline 0963 429 749 (trong giờ hành chính) nếu bạn muốn thay đổi thông tin đơn hàng trước khi đơn hàng của bạn được CHUYỂN QUA GIAO NHẬN.</p>
								</div>
								<div className="status_order-content--description">
									<span>Vào lúc 10:55 - 14/07/2020</span>
									<p>Đơn hàng của bạn đã được đóng gói và chuyển cho đơn vị vận chuyển.</p>
								</div>
								<div className="status_order-content--description">
									<p>Thời gian giao hàng tuỳ thuộc vào địa điểm và phương thức giao hàng bạn đã chọn. Hãy tin rắng chúng tôi luôn cố gắng để hàng đến tay bạn sớm nhất!</p>
								</div>
								<div className="status_order-content--description">
									<span>Vào lúc 10:55 - 14/07/2020</span>
									<p>Đơn hàng đã được giao thành công ! Chúc bạn có một trải nghiệm thú vị ^^</p>
								</div>
							</div>
						</div>
					</div>
					<div className="detail_order">
						<div className="detail_order-box">
							<h3 className="detail_order-box-heading">THÔNG TIN KHÁCH HÀNG</h3>
							<div className="detail_order-box-decription">
								<span>Họ tên: Nguyễn Hoàng Duy Quang</span>
								<span>Điện thoại: 0834275980</span>
								<span>Email: duyquang31296@gmail.com</span>
								<span>Địa chỉ: Cây Xăng Trung Hiếu(Bên Cạnh Điện Máy Xanh), Hòa Tiến</span>
								<span>Quận/Huyện: Huyện Hòa Vang</span>
								<span>Thành phố/Tỉnh: Đà Nẵng </span>
							</div>
						</div>
						<div className="detail_order-box">
							<h3 className="detail_order-box-heading">THÔNG TIN KHÁCH HÀNG</h3>
							<div className="detail_order-box-decription">
								<span>Họ tên: Nguyễn Hoàng Duy Quang</span>
								<span>Điện thoại: 0834275980</span>
								<span>Email: duyquang31296@gmail.com</span>
								<span>Địa chỉ: Cây Xăng Trung Hiếu(Bên Cạnh Điện Máy Xanh), Hòa Tiến</span>
								<span>Quận/Huyện: Huyện Hòa Vang</span>
								<span>Thành phố/Tỉnh: Đà Nẵng </span>
							</div>
						</div>
						<div className="detail_order-box">
							<h3 className="detail_order-box-heading">THÔNG TIN GIAO NHẬN</h3>
							<div className="detail_order-box-decription scroll">
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
							</div>
						</div>

						<div className="detail_order-box">
							<h3 className="detail_order-box-heading">THÔNG TIN KHÁCH HÀNG</h3>
							<div className="detail_order-box-decription">
								<div className="detail_order-fee">
									<div className="detail_order-fee-wrapp">
										<span>Trị giá đơn hàng:</span>
										<h5>480.000 VNĐ</h5>
									</div>
									<div className="detail_order-fee-wrapp">
										<span>Giảm giá:</span>
										<h5>0 VNĐ</h5>
									</div>
									<div className="detail_order-fee-wrapp">
										<span>Phí giao hàng:</span>
										<h5>60.000 VND</h5>
									</div>
									<div className="detail_order-fee-wrapp">
										<span>Phí thanh toán:</span>
										<h5>0 VND</h5>
									</div>
								</div>
								<div className="detail_order-total-price">
									<div className="detail_order-fee-wrapp">
										<h5>Tổng thanh toán:</h5>
										<h5>540.000 VNĐ</h5>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="detail_order-action">
							<div></div>
                            <button className="detail_order-btn">QUAY LẠI TRANG CHỦ</button>
                    </div>
				</div>
			</div>
		</div>
	)
}
export default memo(TrackingOrder)