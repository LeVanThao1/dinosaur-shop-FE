import React, { useState } from "react";
import PropTypes from "prop-types";

import { CheckCircleOutlined } from "@ant-design/icons";
import Image from "../../../constant/image";
import "./index.scss";

import { Button, Form, Input, Select, Checkbox, Radio } from "antd";

ShippingForm.propTypes = {};

function ShippingForm(props) {
  const {
    name,
    phone_number,
    email,
    address,
    delivery_price,
    size,
    amount,
    price,
    reduction,
    pay_price,
  } = props;

  const [shipBy, setShipBy] = useState(1);
  const { Option } = Select;

  const total = +price - +reduction + +delivery_price + +pay_price;

  const handleChangeShip = (e) => {
    console.log(e.target.value);
    setShipBy(e.target.value);
  };

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };

  return (
    <div className="info_form">
      <div className="header">THÔNG TIN GIAO HÀNG</div>
      <div className="form-group text-group">
        <Form.Item label="" hasFeedback validateStatus="success">
          <Input
            className="form-control"
            type="text"
            placeholder="Họ tên"
            name="name"
            value={name}
            id="success"
          />
        </Form.Item>
      </div>
      <div className="form-group text-group">
        <Form.Item label="" hasFeedback validateStatus="success">
          <Input
            className="form-control"
            type="number"
            placeholder="Số điện thoại"
            name="phone_number"
            value={phone_number}
            id="success"
          />
        </Form.Item>
      </div>
      <div className="form-group text-group">
        <Form.Item label="" hasFeedback validateStatus="success">
          <Input
            className="form-control"
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            id="success"
          />
        </Form.Item>
      </div>
      <div className="form-group text-group">
        <Form.Item label="" hasFeedback validateStatus="success">
          <Input
            className="form-control"
            type="text"
            placeholder="Địa chỉ"
            name="address"
            value={address}
            id="success"
          />
        </Form.Item>
      </div>
      <div className="form-group">
        <Form.Item label="" hasFeedback validateStatus="success">
          <Select allowClear id="city" name="city">
            <Option value="1">Tỉnh/ Thành phố</Option>
            <Option value="2">Option 2</Option>
            <Option value="3">Option 3</Option>
          </Select>
        </Form.Item>
      </div>
      <div className="form-group">
        <Form.Item label="" hasFeedback validateStatus="success">
          <Select allowClear id="ward" name="ward">
            <Option value="1">Quận/ Huyện</Option>
            <Option value="2">Option 2</Option>
            <Option value="3">Option 3</Option>
          </Select>
        </Form.Item>
      </div>
      <div className="form-group">
        <Form.Item label="" hasFeedback validateStatus="success">
          <Select allowClear id="district" name="district">
            <Option value="1">Phường/ Xã</Option>
            <Option value="2">Option 2</Option>
            <Option value="3">Option 3</Option>
          </Select>
        </Form.Item>
      </div>
      <div className="form-group check_info">
        <Checkbox checked="true" />
        <label>Cập nhật các thông tin mới nhất về chương trình từ Ananas</label>
      </div>
      <div className="header">PHƯƠNG THỨC GIAO HÀNG</div>
      <div className="form-group check_info deliveryS">
        <div>
          <Checkbox checked="true" />
          <label>Tốc độ tiêu chuẩn (từ 2 - 5 ngày làm việc)</label>
          <img
            src={Image.question}
            style={{ width: "20px", height: "20px", margin: "0 30px" }}
          />
        </div>
        <div className="delivery_price">{delivery_price}0 VND</div>
      </div>
      <div className="header">PHƯƠNG THỨC THANH TOÁN</div>
      <Radio.Group onChange={handleChangeShip} value={shipBy}>
        <Radio style={radioStyle} value={1}>
          <label className="delivery_label">
            Thanh toán trực tiếp khi giao hàng
          </label>
          <img
            src={Image.question}
            style={{ width: "20px", height: "20px", margin: "0 30px" }}
          />
          <img src={Image.cod} style={{ width: "40px", height: "40px" }} />
        </Radio>
        {/* nó bị sao */}
        <Radio style={radioStyle} value={2}>
          <label className="delivery_label">
            Thanh toán bằng thẻ nội địa (ATM)
          </label>
          <img
            src={Image.question}
            style={{ width: "20px", height: "20px", margin: "0 30px" }}
          />
          <img src={Image.atm} style={{ width: "50px", height: "50px" }} />
        </Radio>
        <Radio style={radioStyle} value={3}>
          <label className="delivery_label">Thanh toán bằng thẻ quốc tế</label>
          <img
            src={Image.question}
            style={{ width: "20px", height: "20px", margin: "0 30px" }}
          />
          <img src={Image.visa} style={{ width: "50px", height: "50px" }} />
        </Radio>
        <Radio style={radioStyle} value={4}>
          <label className="delivery_label">Thanh toán bằng ví MoMo </label>
          <img
            src={Image.question}
            style={{ width: "20px", height: "20px", margin: "0 30px" }}
          />
          <img src={Image.momo} style={{ width: "40px", height: "40px" }} />
        </Radio>
      </Radio.Group>
      {/* <div className="form-group check_info">
        <input
          type="radio"
          id="delivery"
          className="delivery_option"
          name="delivery"
          value="payment"
        />
        <label className="delivery_label">
          Thanh toán trực tiếp khi giao hàng
        </label>
        <img
          src={Image.question}
          style={{ width: "20px", height: "20px", margin: "0 30px" }}
        />
        <img src={Image.cod} style={{ width: "40px", height: "40px" }} />
      </div>
      <div className="form-group check_info">
        <input
          type="radio"
          id="delivery"
          className="delivery_option"
          name="delivery"
          value="atm"
        />
      </div>
      <div className="form-group check_info">
        <input
          type="radio"
          id="delivery"
          className="delivery_option"
          name="delivery"
          value="visa"
        />
      </div>
      <div className="form-group check_info">
        <input
          type="radio"
          id="delivery"
          className="delivery_option"
          name="delivery"
          value="momo"
        />
      </div> */}
    </div>
  );
}

export default ShippingForm;
