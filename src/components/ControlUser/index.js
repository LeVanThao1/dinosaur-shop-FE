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

ControlUser.propTypes = {};

function ControlUser(props) {
  return (
    <>
      <section className="control_user">
        <Button className="btn">
          <DropboxOutlined className="icon" />
          Tra cứu đơn hàng
        </Button>
        <Button className="btn">
          <DropboxOutlined className="icon" />
          Tìm của hàng
        </Button>
        <Button className="btn">
          <HeartOutlined className="icon" />
          Yêu thích
        </Button>
        <Button className="btn">
          <UserOutlined className="icon" />
          Đăng nhập
        </Button>
        <Button className="btn">
          <ShoppingCartOutlined className="icon" />
          Giỏ hàng
        </Button>
      </section>
      <div className="clear"></div>
    </>
  );
}

export default ControlUser;
