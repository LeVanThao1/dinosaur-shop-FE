import React, { useState } from "react";
import PropTypes from "prop-types";

import "./index.scss";
import { Button } from "antd";
import { Input } from "antd";

function OrderContent(props) {
 ;

  const { price, promotion } = props;
  return (
    <div className="info__pay .col-6 .col-sm-4">
      <div className="header">ĐƠN HÀNG</div>
      <div className="info__content">
        <div className="promotion">
          <div className="id_Promotion">Nhập mã khuyến mãi</div>
          <div className="promotion__content">
            <Input type="text" />
            <Button type="primary" className="btn btnOK">
              ÁP DỤNG
            </Button>
          </div>
        </div>
        <div className="orderDetail">
          <div className="cost">
            <span>Đơn hàng</span>
            <span>{price}500.000 VND</span>
          </div>
          <div className="reduction">
            <p>Giảm</p>
            <p>{promotion}0 VND</p>
          </div>
        </div>
        <div className="tempCacul">
          <div className="child__tempCacul">
            <span>TẠM TÍNH</span>
            <span>500.000 VND</span>
          </div>
          <Button type="primary">TIẾP TỤC THANH TOÁN</Button>
        </div>
      </div>
    </div>
  );
}

export default OrderContent;
