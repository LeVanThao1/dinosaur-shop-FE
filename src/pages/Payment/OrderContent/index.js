import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./index.scss";
import { Button } from "antd";
import { Input } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function OrderContent({ total, promotion }) {
  const history = useHistory();
  return (
    <div className="info__pay .col-6 .col-sm-4">
      <div className="header">ĐƠN HÀNG</div>
      <div className="info__content">
        <div className="promotion">
          <div className="id_Promotion">Nhập mã khuyến mãi</div>
          <div className="promotion__content">
            <Input type="text" />
            <Button className="btn btnOK">ÁP DỤNG</Button>
          </div>
        </div>
        <div className="orderDetail">
          <div className="cost">
            <span>Đơn hàng</span>
            <span>{total} VND</span>
          </div>
          <div className="reduction">
            <p>Giảm ({promotion} %)</p>
            <p>{(total * promotion) / 100} VND</p>
          </div>
        </div>
        <div className="tempCacul">
          <div className="child__tempCacul">
            <span>TẠM TÍNH</span>
            <span>{(total * (100 - promotion)) / 100} VND</span>
          </div>
          <Button type="primary" onClick={() => history("/shipping")}>
            TIẾP TỤC THANH TOÁN
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrderContent;
