import { React, memo } from "react";
import PropTypes from "prop-types";
import Image from "../../constant/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { HeartOutlined } from "@ant-design/icons";
import "./index.scss";

Payment.propTypes = {};

function Payment(props) {
  const { price } = props;
  return (
    <>
      <div className="desktop_payment">
        <div className="container__pay">
          <div className="cart__pay">
            <div className="header__cart">GIỎ HÀNG</div>
            <div className="left__detail">
              <div className="details__cart ">
                <div className="img_detail__cart">
                  <div className="logo">
                    <img src={Image.LOGO} alt="" width="250px" height="250px" />
                  </div>
                  <div className="detail">
                    <div className="detail__content">
                      <div className="name">
                        Urbas Unsettling - Low Top - Starlight/Lavender
                      </div>
                      <div className="price">Giá: {price}500.000 VND</div>
                    </div>
                    <div className="size-amount">
                      <div className="size">
                        <div>
                          <span>Size</span>
                        </div>
                        <select name="size" id="size">
                          <option value="35" disabled="true">
                            35
                          </option>
                          <option value="35">36</option>
                          <option value="35">37</option>
                          <option value="35">38</option>
                          <option value="35">39</option>
                          <option value="35">40</option>
                          <option value="35">41</option>
                          <option value="35">42</option>
                          <option value="35">43</option>
                        </select>
                      </div>
                      <div className="amount">
                        <div>
                          <span>Số lượng</span>
                        </div>
                        <select name="size" id="size">
                          <option value="1" disabled="true">
                            1
                          </option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="action">
                  <div className="price__status">
                    <div className="price__action">{price}500.000 VND</div>
                    <div className="status">Còn hàng</div>
                  </div>
                  <div className="btnAction">
                    <div className="heartBtn">
                      <button>♥</button>
                    </div>
                    <div className="deleteBtn">
                      <button>Del</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="btn btn-delete-back">
                <button className="btn__delete">XOÁ HẾT</button>
                <button className="btn__back">QUAY LẠI MUA HÀNG</button>
              </div>
            </div>
          </div>
          <div className="info__pay .col-6 .col-sm-4">
            <div className="header">ĐƠN HÀNG</div>
            <div className="info__content">
              <div className="promotion">
                <div className="id_Promotion">Nhập mã khuyến mãi</div>
                <div className="promotion__content">
                  <input type="text" />
                  <button className="btn btnOK">ÁP DỤNG</button>
                </div>
              </div>
              <div className="orderDetail">
                <div className="cost">
                  <span>Đơn hàng</span>
                  <span>{price}500.000 VND</span>
                </div>
                <div className="reduction">
                  <span>Giảm</span>
                  <span>{price}0 VND</span>
                </div>
              </div>
              <div className="tempCacul">
                <div className="child__tempCacul">
                  <span>TẠM TÍNH</span>
                  <span>500.000 VND</span>
                </div>
                <button>TIẾP TỤC THANH TOÁN</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Payment);
