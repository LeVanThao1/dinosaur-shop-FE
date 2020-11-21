import React from "react";
import PropTypes from "prop-types";
import Images from "../../constant/image";
import { Link } from "react-router-dom";
import "./index.scss";

Menu.propTypes = {};

function Menu(props) {
  return (
    <ul className="menu">
      <li>
        <Link to="/products">Sản phẩm</Link>
        <div className="container_drop">
          <div className="menu_drop">
            <div className="drop_category">
              <div className="drop_child">
                <img src={Images.LOGO} width="250px" height="250px"></img>
                <p className="title">Cho nam</p>
              </div>
              <div className="drop_child">
                <img src={Images.LOGO} width="250px" height="250px"></img>
                <p className="title">Cho nữ</p>
              </div>
              <div className="drop_child">
                <img src={Images.LOGO} width="250px" height="250px"></img>
                <p className="title">Outlet sale</p>
              </div>
              <div className="drop_child">
                <img src={Images.LOGO} width="250px" height="250px"></img>
                <p className="title">Thời trang & phụ kiện</p>
              </div>
            </div>
            <div className="slogent">
              mọi người gọi chúng tôi là <span className="name">dinosaur</span>
            </div>
          </div>
        </div>
      </li>
      <li>
        <Link to="/products">Nam</Link>
      </li>
      <li>
        <Link to="/products">Nữ</Link>
      </li>
      <li>
        <Link to="/products">Sale off</Link>
      </li>
      <li>
        <Link to="/products">Discover</Link>
      </li>
    </ul>
  );
}

export default Menu;
