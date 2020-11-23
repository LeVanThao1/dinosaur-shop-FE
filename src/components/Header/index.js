import React, { useState } from "react";
import PropTypes from "prop-types";
import ControlUser from "../ControlUser";
import SearchBar from "../SearchBar.js";
import Images from "../../constant/image";
import "./index.scss";
import Menu from "../Menu";
import { MenuOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Promotion from "../Promotion";
import SliderSale from "../SliderSale";
Header.propTypes = {};

function Header(props) {
	const [isMenu, setIsMenu] = useState(false);
	return (
		<>
			<header className="desktop">
				<ControlUser />
				<div className="header">
					<div className="header__logo">
						<img
							src={Images.LOGO}
							alt="logo"
							width="80px"
							height="80px"
						/>
					</div>
					<div className="header__nav">
						<Menu />
					</div>
					<div className="header__search">
						<SearchBar />
					</div>
				</div>
			</header>
			<header className="mobile">
				<div className="header">
					<div className="header__logo">
						<img
							src={Images.LOGO}
							alt="logo"
							width="100px"
							height="100px"
						/>
					</div>

					<div className="header__search">
						<SearchBar />
					</div>
					<div className="header__nav">
						{isMenu ? (
							<CloseCircleOutlined
								style={{ fontSize: "40px" }}
								onClick={() => setIsMenu(false)}
							/>
						) : (
							<MenuOutlined
								style={{ fontSize: "40px" }}
								onClick={() => setIsMenu(true)}
							/>
						)}

						{isMenu && (
							<div className="mobile_menu">
								<Menu />
								<ControlUser />
							</div>
						)}
					</div>
				</div>
			</header>
			<Promotion />
			<SliderSale />
		</>
	);
}

export default Header;
