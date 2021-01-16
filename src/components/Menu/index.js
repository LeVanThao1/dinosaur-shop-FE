import { Collapse } from "antd";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import Images from "../../constant/image";
import "./index.scss";
const { Panel } = Collapse;
Menu.propTypes = {};

function Menu(props) {
	const history = useHistory();
	const { filter } = useSelector((state) => state.products);
	const location = useLocation();
	return (
		<>
			<ul className="menu_desktop">
				<li
					className={
						location.pathname === "/products" &&
						!location.search &&
						"liactive"
					}
					onClick={() => history.push("/products")}
				>
					Sản phẩm
					<div className="container_drop">
						<div className="menu_drop">
							<div className="drop_category">
								<div className="drop_child">
									<img
										src={Images.LOGO}
										width="250px"
										height="250px"
									></img>
									<p className="title">Cho nam</p>
								</div>
								<div className="drop_child">
									<img
										src={Images.LOGO}
										width="250px"
										height="250px"
									></img>
									<p className="title">Cho nữ</p>
								</div>
								<div className="drop_child">
									<img
										src={Images.LOGO}
										width="250px"
										height="250px"
									></img>
									<p className="title">Outlet sale</p>
								</div>
								<div className="drop_child">
									<img
										src={Images.LOGO}
										width="250px"
										height="250px"
									></img>
									<p className="title">
										Thời trang & phụ kiện
									</p>
								</div>
							</div>
							<div className="slogent">
								mọi người gọi chúng tôi là{" "}
								<span className="name">dinosaur</span>
							</div>
						</div>
					</div>
				</li>
				<li
					className={
						location.pathname === "/products" &&
						location.search === "category=nam" &&
						"liactive"
					}
				>
					<Link to="/products?caterogy=nam">Nam</Link>
				</li>
				<li
					className={
						location.pathname === "/products" &&
						location.search === "category=nu" &&
						"liactive"
					}
				>
					<Link to="/products?category=nu">Nữ</Link>
				</li>
				<li>
					<Link to="/products">Sale off</Link>
				</li>
				<li>
					<Link to="/products">Discover</Link>
				</li>
			</ul>
			<div className="menu_mobile">
				<Collapse accordion>
					<Panel header="SẢN PHẨM" key="1">
						<div className="item">Giày Nam</div>
						<div className="item">Giày Nữ</div>
						<div className="item">Thời trang & phụ kiện</div>
						<div className="item">Sale-off</div>
					</Panel>
					<Panel header="NAM" key="2">
						<Collapse accordion>
							<Panel header="NỔI BẬT" key="1">
								<div className="item">Best Seller</div>
								<div className="item">New Arrival</div>
								<div className="item">Sale off</div>
							</Panel>
							<Panel header="GIÀY" key="2">
								<div className="item">Basas</div>
								<div className="item">Vintas</div>
								<div className="item">Urbar</div>
							</Panel>
							<Panel header="THỜI TRANG VÀ PHỤ KIỆN" key="3">
								<div className="item">Nón</div>
								<div className="item">Mũ</div>
								<div className="item">Balo</div>
							</Panel>
						</Collapse>
					</Panel>
					<Panel header="NỮ" key="3">
						<Collapse accordion>
							<Panel header="NỔI BẬT" key="1">
								<div className="item">Best Seller</div>
								<div className="item">New Arrival</div>
								<div className="item">Sale off</div>
							</Panel>
							<Panel header="GIÀY" key="2">
								<div className="item">Basas</div>
								<div className="item">Vintas</div>
								<div className="item">Urbar</div>
							</Panel>
							<Panel header="THỜI TRANG VÀ PHỤ KIỆN" key="3">
								<div className="item">Nón</div>
								<div className="item">Mũ</div>
								<div className="item">Balo</div>
							</Panel>
						</Collapse>
					</Panel>
					<Panel header="SALE OFF" key="4" showArrow={false}></Panel>
					<Panel header="Dino You" key="5" showArrow={false}></Panel>
				</Collapse>
			</div>
		</>
	);
}

export default memo(Menu);
