import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Switch } from "antd";
import { Badge } from "antd";
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
import { useTranslation } from "react-i18next";
ControlUser.propTypes = {};

function ControlUser() {
	const { t, i18n } = useTranslation();
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const { user, isLogged } = auth;
	const cart = useSelector((state) => state.cart);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (auth.isLogged) {
			setCount(user.cart ? user.cart.length : 0);
		} else {
			setCount(cart ? cart.length : 0);
		}
	}, [auth, cart]);

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
	const onChangeLanguage = (e) => {
		localStorage.setItem("language", e ? "vi" : "en");
		i18n.changeLanguage(e ? "vi" : "en");
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
						<span>{t("homepage.listOrder")}</span>
					</Button>
				</Link>
				<Link to="/tracking-orders">
					<Button className="btn_control">
						<DropboxOutlined className="icon" />
						<span>{t("homepage.lookupOrder")}</span>
					</Button>
				</Link>
				<Link to="/">
					<Button className="btn_control">
						<DropboxOutlined className="icon" />
						<span>{t("homepage.findStore")}</span>
					</Button>
				</Link>
				<Link to="/like-products">
					<Button className="btn_control">
						<HeartOutlined className="icon" />
						<span>{t("homepage.favourite")}</span>
					</Button>
				</Link>
				{!isLogged && (
					<Link to="/login">
						<Button className="btn_control">
							<UserOutlined className="icon" />
							<span>{t("homepage.login")}</span>
						</Button>
					</Link>
				)}
				<Link to="/cart">
					<Button className="btn_control">
						<Badge count={count} showZero>
							<ShoppingCartOutlined
								className="icon"
								style={{ color: "white" }}
							/>
						</Badge>
						<span> {t("homepage.cart")}</span>
					</Button>
				</Link>
				{isLogged && (
					<Button className="btn_control" onClick={_onLogOut}>
						<LogoutOutlined className="icon" />
						<span>{t("homepage.logout")}</span>
					</Button>
				)}
				<div>
					<Switch
						checkedChildren="VN"
						unCheckedChildren="EN"
						defaultChecked={i18n.language == "vi" ? true : false}
						onChange={(e, t) => onChangeLanguage(e)}
					/>
				</div>
			</section>
			<div className="clear"></div>
		</>
	);
}

export default memo(ControlUser);
