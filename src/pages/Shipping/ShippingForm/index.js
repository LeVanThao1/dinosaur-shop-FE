import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { CheckCircleOutlined } from "@ant-design/icons";
import Image from "../../../constant/image";
import "./index.scss";
import sub from "sub-vn";

import { Button, Form, Input, Select, Checkbox, Radio, message } from "antd";

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

  const { Option } = Select;

  const total = +price - +reduction + +delivery_price + +pay_price;
  const [shipBy, setShipBy] = useState(1);
  const handleChangeShip = (e) => {
    console.log(e.target.value);
    setShipBy(e.target.value);
  };

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWawrd] = useState("");

  const handleChangeSelect = (e) => {
    setProvince(e);
  };

  const handleSelectDistrict = (e) => {
    setDistrict(e);
  };

  const handleChangeWard = (e) => {
    setWawrd(e);
  };

  const [input, setInput] = useState("warning");
  const validateName = () => {
    validateMessages ? setInput("success") : setInput("warning");
  };

  return (
    <div className="info_form">
      <div className="header">THÔNG TIN GIAO HÀNG</div>
      <Form
        {...layout}
        name="nest-messages"
        validateMessages={validateMessages}
      >
        <Form.Item
          onChange={validateName}
          label="Họ tên"
          name={["user", "name"]}
          hasFeedback
          rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
        >
          <Input
            className="form-control"
            type="text"
            placeholder="Họ tên"
            name="name"
            value={name}
            id="success"
          />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name={["user", "phoneNumber"]}
          hasFeedback
          rules={[{ required: true, types: true }]}
        >
          <Input
            className="form-control"
            placeholder="Số điện thoại"
            name="phone_number"
            value={phone_number}
            id="phone_number"
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name={["user", "email"]}
          hasFeedback
          rules={[{ required: true, type: "email" }]}
        >
          <Input
            className="form-control"
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            id="success"
          />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          hasFeedback
          name={["user", "address"]}
          rules={[{ required: true, message: "Địa chỉ is required" }]}
        >
          <Input
            className="form-control"
            type="text"
            placeholder="Địa chỉ"
            name="address"
            value={address}
            id="success"
          />
        </Form.Item>
        <Form.Item
          label="Tỉnh/ Thành phố"
          name={["user", "provinces"]}
          hasFeedback
          rules={[{ required: true, message: "Địa chỉ is required" }]}
        >
          <Select
            allowClear
            id="city"
            name="city"
            onChange={handleChangeSelect}
          >
            {sub.getProvinces().map((option, index) => (
              <Option
                key={index}
                value={option.code}
                selected={option.code === province}
              >
                {option.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Quận/ Huyện"
          hasFeedback
          name={["user", "district"]}
          rules={[{ required: true }]}
        >
          <Select
            allowClear
            id="district"
            name="district"
            onChange={handleSelectDistrict}
            disabled={province ? false : true}
          >
            {" "}
            ,
            {province &&
              sub.getDistrictsByProvinceCode(province).map((dis, i) => (
                <Option key={i} value={dis.code}>
                  {dis.name}
                </Option>
              ))}
            {/* <Option value="2">Option 2</Option>
            <Option value="3">Option 3</Option> */}
          </Select>
        </Form.Item>
        <Form.Item label="Phường/ Xã" hasFeedback name={["user", "ward"]}>
          <Select
            allowClear
            id="ward"
            name="ward"
            disabled={district ? false : true}
            onChange={handleChangeWard}
          >
            {/* <Option value="-1" selected={true}>
              Phường/ Xã
            </Option> */}
            {district &&
              sub.getWardsByDistrictCode(district).map((ward, i) => (
                <Option key={i} value={ward.code}>
                  {ward.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Checkbox checked="true" style={{ padding: "20px" }} />
        <label style={{ fontSize: "1.2rem" }}>
          Cập nhật các thông tin mới nhất về chương trình từ Ananas
        </label>
        {/* </div> */}
        <div className="header">PHƯƠNG THỨC GIAO HÀNG</div>
        <div className="form-group check_info deliveryS">
          <div>
            <Checkbox checked="true" style={{ padding: "20px" }} />
            <label style={{ fontSize: "1.2rem" }}>
              Tốc độ tiêu chuẩn (từ 2 - 5 ngày làm việc)
            </label>
            <img
              src={Image.question}
              style={{ width: "20px", height: "20px", margin: "0 30px" }}
            />
          </div>
          <div className="delivery_price">{delivery_price}0 VND</div>
        </div>
        <div className="header">PHƯƠNG THỨC THANH TOÁN</div>
        <Radio.Group
          onChange={handleChangeShip}
          value={shipBy}
          style={{ display: "inline-block" }}
          size="small"
        >
          <Radio style={(radioStyle, { padding: "5px" })} value={1}>
            <label className="delivery_label">
              Thanh toán trực tiếp khi giao hàng
            </label>
            <img
              src={Image.question}
              style={{ width: "20px", height: "20px", margin: "0 30px" }}
            />
            <img src={Image.cod} style={{ width: "40px", height: "40px" }} />
          </Radio>
          <Radio style={(radioStyle, { padding: "5px" })} value={2}>
            <label className="delivery_label">
              Thanh toán bằng thẻ nội địa (ATM)
            </label>
            <img
              src={Image.question}
              style={{ width: "20px", height: "20px", margin: "0 30px" }}
            />
            <img src={Image.atm} style={{ width: "50px", height: "50px" }} />
          </Radio>
          <Radio style={radioStyle} value={3} style={{ padding: "5px" }}>
            <label className="delivery_label">
              Thanh toán bằng thẻ quốc tế
            </label>
            <img
              src={Image.question}
              style={{ width: "20px", height: "20px", margin: "0 30px" }}
            />
            <img src={Image.visa} style={{ width: "50px", height: "50px" }} />
          </Radio>
          <Radio style={(radioStyle, { padding: "5px" })} value={4}>
            <label className="delivery_label">Thanh toán bằng ví MoMo </label>
            <img
              src={Image.question}
              style={{ width: "20px", height: "20px", margin: "0 30px" }}
            />
            <img src={Image.momo} style={{ width: "40px", height: "40px" }} />
          </Radio>
        </Radio.Group>
      </Form>
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
