import React, { memo } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import {
	DropboxOutlined,
	HeartOutlined,
	UserOutlined,
	ShoppingCartOutlined,
	LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../slice/auth.slice";
import userApi from "../../api/userApi";
ControlUser.propTypes = {};

function ControlUser(props) {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const { user, isLogged } = auth;

	const _onLogOut = async () => {
		try {
			await userApi.logout();
			localStorage.removeItem("firstLogin");
			dispatch(logout());
		} catch (e) {
			console.log(e);
		}
	};
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
				{isLogged && (
					<Button className="btn" onClick={_onLogOut}>
						<LogoutOutlined className="icon" />
						<span>Đăng xuất</span>
					</Button>
				)}
			</section>
			<div className="clear"></div>
		</>
	);
}

export default memo(ControlUser);
