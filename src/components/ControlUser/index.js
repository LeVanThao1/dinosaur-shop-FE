import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import {
	DropboxOutlined,
	HeartOutlined,
	UserOutlined,
	ShoppingCartOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
ControlUser.propTypes = {};

function ControlUser(props) {
	const auth = useSelector((state) => state.auth);
	const { user, isLogged } = auth;
	return (
		<>
			<section className="control_user">
				{isLogged && (
					<Link to="/profile">
						<Button className="btn">
							<img
								src={user.avatar}
								alt="avatar"
								className="avatar"
							/>
							<span style={{ marginLeft: "8px" }}>
								{user.name}
							</span>
						</Button>
					</Link>
				)}
				<Link to="/">
					<Button className="btn">
						<DropboxOutlined className="icon" />
						<span>Tra cứu đơn hàng</span>
					</Button>
				</Link>
				<Link to="/">
					<Button className="btn">
						<DropboxOutlined className="icon" />
						<span>Tìm của hàng</span>
					</Button>
				</Link>
				<Link to="/">
					{" "}
					<Button className="btn">
						<HeartOutlined className="icon" />
						<span>Yêu thích</span>
					</Button>
				</Link>
				{!isLogged && (
					<Link to="/login">
						<Button className="btn">
							<UserOutlined className="icon" />
							<span>Đăng nhập</span>
						</Button>
					</Link>
				)}
				<Link to="/cart">
					<Button className="btn">
						<ShoppingCartOutlined className="icon" />
						<span>Giỏ hàng</span>
					</Button>
				</Link>
			</section>
			<div className="clear"></div>
		</>
	);
}

export default ControlUser;
