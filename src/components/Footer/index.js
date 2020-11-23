import React from "react";
import PropTypes from "prop-types";
import "./index.scss";
import {
	FacebookOutlined,
	InstagramOutlined,
	YoutubeOutlined,
	ArrowRightOutlined,
} from "@ant-design/icons";
import { Collapse } from "antd";
const { Panel } = Collapse;

Fotter.propTypes = {};

function Fotter(props) {
	return (
		<div className="container_footer">
			<div className="footer_desktop">
				<div className="map">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.707188875568!2d108.21789381484669!3d16.028751144778987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219f18a5d6887%3A0x29cc219e52a9a9b8!2zMzIgTMOqIFbEg24gxJDhu6ljLCBIb8OgIEPGsOG7nW5nIE5hbSwgSOG6o2kgQ2jDonUsIMSQw6AgTuG6tW5nLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1606047234144!5m2!1svi!2s"
						width="300"
						height="100%"
						frameBorder="0"
						style={{
							border: 0,
							borderRadius: "10px",
							opacity: 0.8,
						}}
						allowFullScreen=""
						aria-hidden="false"
						tabIndex="0"
					></iframe>
				</div>
				<div className="infor_shop">
					<div className="category">
						<p className="title">Sản phẩm</p>
						<ul>
							<li>Giày Nam</li>
							<li>Giày Nữ</li>
							<li>Thời trang & phụ kiện</li>
							<li>Sale-off</li>
						</ul>
					</div>
					<div className="company">
						<p className="title">Về công ty</p>
						<ul>
							<li>Dinosaur tuyển dụng</li>
							<li>Liên hệ nhượng quyền</li>
							<li>Về Dinosaur</li>
						</ul>
					</div>
					<div className="suport">
						<p className="title">Hỗ trợ</p>
						<ul>
							<li>FAQs</li>
							<li>Bảo mật thông tin</li>
							<li>Chính sách chung</li>
							<li>Tra cứu đơn hàng</li>
						</ul>
					</div>
					<div className="contact">
						<p className="title">Liên hệ</p>
						<ul>
							<li>Email đóng góp</li>
							<li>Hotline</li>
							<li>0348120116</li>
						</ul>
					</div>
					<div className="social">
						<p className="title">Dino Social</p>
						<div className="icons">
							<FacebookOutlined className="icon" />
							<InstagramOutlined className="icon" />
							<YoutubeOutlined className="icon" />
						</div>
					</div>
					{/* <div className="register_email">
						<p className="title">ĐK nhận Email</p>
						<div className="email">
							<input
								type="text"
								className="input"
								placeholder="Nhập Email"
							/>
							<ArrowRightOutlined className="icon_next" />
						</div>
					</div> */}
				</div>
			</div>
			<div className="footer_mobile">
				<Collapse accordion>
					<Panel header="Sản phẩm" key="1">
						<div className="item">Giày Nam</div>
						<div className="item">Giày Nữ</div>
						<div className="item">Thời trang & phụ kiện</div>
						<div className="item">Sale-off</div>
					</Panel>
					<Panel header="Về công ty" key="2">
						<div className="item">Dinosaur tuyển dụng</div>
						<div className="item">Liên hệ nhượng quyền</div>
						<div className="item">Về Dinosaur</div>
					</Panel>
					<Panel header="Hổ trợ" key="3">
						<div className="item">FAQs</div>
						<div className="item">Bảo mật thông tin</div>
						<div className="item">Chính sách chung</div>
						<div className="item">Tra cứu đơn hàng</div>
					</Panel>
					<Panel header="Liên hê" key="4">
						<div className="item">Email đóng góp</div>
						<div className="item">Hotline</div>
						<div className="item">0348120116</div>
					</Panel>
				</Collapse>
				<div className="map">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.707188875568!2d108.21789381484669!3d16.028751144778987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219f18a5d6887%3A0x29cc219e52a9a9b8!2zMzIgTMOqIFbEg24gxJDhu6ljLCBIb8OgIEPGsOG7nW5nIE5hbSwgSOG6o2kgQ2jDonUsIMSQw6AgTuG6tW5nLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1606047234144!5m2!1svi!2s"
						width="100%"
						height="100%"
						frameBorder="0"
						style={{
							border: 0,
							borderRadius: "10px",
							opacity: 0.8,
						}}
						allowFullScreen=""
						aria-hidden="false"
						tabIndex="0"
					></iframe>
				</div>
				<div className="social">
					<p className="title">Dino Social</p>
					<div className="icons">
						<FacebookOutlined className="icon" />
						<InstagramOutlined className="icon" />
						<YoutubeOutlined className="icon" />
					</div>
				</div>
				<div className="register_email">
					<p className="title">Đăng ký nhận Email</p>
					<div className="email">
						<input
							type="text"
							className="input"
							placeholder="Nhập Email"
						/>
						<ArrowRightOutlined className="icon_next" />
					</div>
				</div>
			</div>
			<div className="create_by">
				<p>Copyright © 2020 Dinosaur. All rights reserved.</p>
			</div>
		</div>
	);
}

export default Fotter;
