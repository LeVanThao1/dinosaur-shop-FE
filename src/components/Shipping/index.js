import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import Image from "../../constant/image";

import { CheckCircleOutlined } from "@ant-design/icons";

function index(props) {
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

  const total = +price - +reduction + +delivery_price + +pay_price;

  return (
    <>
      <div className="desktop_shipping">
        <div className="container">
          <div className="info_form">
            <div className="header">THÔNG TIN GIAO HÀNG</div>
            <div className="form-group text-group">
              <input
                className="form-control"
                type="text"
                placeholder="Họ tên"
                name="name"
                value={name}
              />
              <span>
                <CheckCircleOutlined />
              </span>
            </div>
            <div className="form-group text-group">
              <input
                className="form-control"
                type="number"
                placeholder="Số điện thoại"
                name="phone_number"
                value={phone_number}
              />
              <span>
                <CheckCircleOutlined />
              </span>
            </div>
            <div className="form-group text-group">
              <input
                className="form-control"
                type="text"
                placeholder="Email"
                name="email"
                value={email}
              />
              <span>
                <CheckCircleOutlined />
              </span>
            </div>
            <div className="form-group text-group">
              <input
                className="form-control"
                type="text"
                placeholder="Địa chỉ"
                name="address"
                value={address}
              />
              <span>
                <CheckCircleOutlined />
              </span>
            </div>
            <div className="form-group">
              <select className="form-control" id="city" name="city">
                <option value="0">Tỉnh/ Thành phố</option>
              </select>
            </div>
            <div className="form-group">
              <select className="form-control" id="ward" name="ward">
                <option value="0">Quận/ Huyện</option>
              </select>
            </div>
            <div className="form-group">
              <select className="form-control" id="district" name="district">
                <option value="0">Phường/ Xã</option>
              </select>
            </div>

            <div className="form-group check_info">
              <input type="checkbox" />
              <label>
                Cập nhật các thông tin mới nhất về chương trình từ Ananas
              </label>
            </div>
            <div className="header">PHƯƠNG THỨC GIAO HÀNG</div>
            <div className="form-group check_info deliveryS">
              <div>
                <input type="checkbox" checked="true" />
                <label>Tốc độ tiêu chuẩn (từ 2 - 5 ngày làm việc)</label>
                <img
                  src={Image.question}
                  style={{ width: "20px", height: "20px", margin: "0 30px" }}
                />
              </div>
              <div className="delivery_price">{delivery_price}0 VND</div>
            </div>
            <div className="header">PHƯƠNG THỨC THANH TOÁN</div>
            <div className="form-group check_info">
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
              <label className="delivery_label">
                Thanh toán bằng thẻ nội địa (ATM)
              </label>
              <img
                src={Image.question}
                style={{ width: "20px", height: "20px", margin: "0 30px" }}
              />
              <img src={Image.atm} style={{ width: "50px", height: "50px" }} />
            </div>
            <div className="form-group check_info">
              <input
                type="radio"
                id="delivery"
                className="delivery_option"
                name="delivery"
                value="visa"
              />
              <label className="delivery_label">
                Thanh toán bằng thẻ quốc tế
              </label>
              <img
                src={Image.question}
                style={{ width: "20px", height: "20px", margin: "0 30px" }}
              />
              <img src={Image.visa} style={{ width: "50px", height: "50px" }} />
            </div>
            <div className="form-group check_info">
              <input
                type="radio"
                id="delivery"
                className="delivery_option"
                name="delivery"
                value="momo"
              />
              <label className="delivery_label">Thanh toán bằng ví MoMo </label>
              <img
                src={Image.question}
                style={{ width: "20px", height: "20px", margin: "0 30px" }}
              />
              <img src={Image.momo} style={{ width: "40px", height: "40px" }} />
            </div>
          </div>
          <div className="detail_shipping">
            <div className="list-group">
              <div className="list-group-item header">ĐƠN HÀNG</div>
              <div className="list-group-item line"></div>
              <div className="list-group-item text-1">
                <span className="text-3 text-3-1">
                  {}Urbas Unsettling - Low Top - Starlight/Lavender
                </span>
                <span className="text-3-3">{price}490.000 VND</span>
              </div>
              <div className="list-group-item text-2">
                <span className="text-4">Size: {size}40 </span>
                <span className="text-4-4">x{amount}1</span>
              </div>
              <div className="list-group-item dash"></div>
              <div className="list-group-item text-1 group-2">
                <span className="text-3 text-3-1">Đơn hàng </span>
                <span className="text-3-3 text-3-1-1">{price}490.000 VND</span>
              </div>
              <div className="list-group-item text-1 group-2">
                <span className="text-3 text-3-1">Giảm </span>
                <span className="text-3-3 text-3-1">- {reduction}0 VND</span>
              </div>
              <div className="list-group-item text-1-1 group-2">
                <span className="text-3">Phí vận chuyển </span>
                <span className="text-3-3">{delivery_price}50.000 VND</span>
              </div>
              <div className="list-group-item text-1-1">
                <span className="text-3">Phí thanh toán </span>
                <span className="text-3-3">{pay_price}0 VND</span>
              </div>
              <div className="list-group-item dash"></div>
              <div className="list-group-item text-1-1 text-4">
                <span className="text-3 text-4-1">TỔNG CỘNG </span>
                <span className="text-3 text-4-2">{total}815.000 VND</span>
              </div>
              <div className="list-group-item btnComplete">
                <button className="btn btn-cart btn-complete-detail">
                  HOÀN TẤT ĐẶT HÀNG
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
