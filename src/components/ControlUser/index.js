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
import { setToken } from "../../slice/token.slice";
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
			dispatch(setToken(""));
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<>
			<section className="control_user">
				{isLogged && (
					<Link to="/profile">
						<Button className="btn_control">
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
				<Link to="/orders">
					<Button className="btn_control">
						<DropboxOutlined className="icon" />
						<span>Danh sách đơn hàng</span>
					</Button>
				</Link>
				<Link to="/tracking-orders">
					<Button className="btn_control">
						<DropboxOutlined className="icon" />
						<span>Tra cứu đơn hàng</span>
					</Button>
				</Link>
				<Link to="/">
					<Button className="btn_control">
						<DropboxOutlined className="icon" />
						<span>Tìm cửa hàng</span>
					</Button>
				</Link>
				<Link to="/shipping">
					<Button className="btn_control">
						<HeartOutlined className="icon" />
						<span>Yêu thích</span>
					</Button>
				</Link>
				{!isLogged && (
					<Link to="/login">
						<Button className="btn_control">
							<UserOutlined className="icon" />
							<span>Đăng nhập</span>
						</Button>
					</Link>
				)}
				<Link to="/cart">
					<Button className="btn_control">
						<ShoppingCartOutlined className="icon" />
						<span>Giỏ hàng</span>
					</Button>
				</Link>
				{isLogged && (
					<Button className="btn_control" onClick={_onLogOut}>
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
