import React, { useState } from "react";
import image from "../../constant/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { Collapse } from "antd";

import "./index.scss";
import {
  DownOutlined,
  UserOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
} from "reactstrap";

function ProductDetail(props) {
  const {
    productType,
    producer,
    productName,
    idProduct,
    status,
    price,
    description,
    color,
    LOGO,
    amontProduct,
  } = props;

  const { Panel } = Collapse;

  const [amount, setAmount] = useState(1);

  const increase = () => {
    // this is amount <= amontProduct// (Change 12)
    if (amount <= 12) setAmount(amount + 1);
  };

  const reduction = () => {
    // this is amount >= amontProduct// (Change 1)
    if (amount >= 1) setAmount(amount - 1);
  };

  return (
    <>
      <div className="desktop-detail">
        <div className="container__product__detail">
          <div className="header__product__detail">
            <div className="header__detail col-xs-9 col-sm-9 col-md-11 hidden-xs hidden-sm">
              <div className="child__detail">{productType}Phụ kiện</div>
              <div className="child__detail">{producer}Hat/Búp bê</div>
              <div className="child__detail">
                {productName}Basell Cap - Be Posible
              </div>
            </div>
          </div>
          <div className="content__detail">
            <div className="content__logo col-xs-12 col-sm-12 col-md-7 col-lg-7">
              <div className="main__logo">
                <img src={image.LOGO} alt="" />
              </div>
              <div className="child__detail child__logo">
                <div className="child-side"></div>
              </div>
            </div>
            <div className="info__detail child__detail col-xs-12 col-sm-12 col-md-5 col-lg-5 prd-detail-right">
              <div className="name child__detail">
                <b>{productName}BASEBALL CAP - BE POSITIVE - PINK</b>
              </div>
              <div className="id__status child__detail">
                <div className="id">
                  Mã sản phẩm: <b>{idProduct}ABC100</b>{" "}
                </div>
                <div className="status">
                  Tình trạng: <b>{status}Best Seller</b>
                </div>
              </div>
              <div className="price child__detail">{price}275000</div>

              <div className="description child__detail">
                {description}Dễ dàng mix & match với nhiều loại trang phục và
                phong cách thời trang khác nhau, mũ bóng chày có thiết kế cổ
                điển cùng hoạ tiết thêu đơn giản chính là món phụ kiện không thể
                thiếu trong tủ đồ nhà bạn.
              </div>
              <div className="color__product child__detail">
                <div
                  className="colorOne"
                  style={{
                    backgroundColor: "orange",
                    width: "30px",
                    height: "30px",
                  }}
                ></div>
              </div>
              <div className="size__amount child__detail">
                <div className="size">
                  <span>SIZE</span>
                  <div className="size__option">
                    <select className="size__option" name="size" id="size">
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
                </div>
                <div className="amount">
                  <span>SỐ LƯỢNG</span>
                  <div className="amount__option">
                    <button onClick={reduction}>-</button>
                    <input type="text" value={amount} />
                    <button onClick={increase}>+</button>
                  </div>
                </div>
              </div>
              <div className="btn__addCart__like child__detail">
                <div className="btn btn__addCart">
                  <button className="btn__add">THÊM VÀO GIỎ HÀNG</button>
                </div>
                <div className="btn btn__like">
                  <button className="btn__heart">{HeartOutlined}</button>
                </div>
              </div>
              <div className="btn btn__payment child__detail">
                <button className="btn__pay">THANH TOÁN</button>
              </div>
              <div className="warning" disabled="true">
                <p className="warning__title">Vui lòng chọn size/số lượng</p>
              </div>
              <div className="panel panelOne">
                <div className="panel__heading child__detail">
                  <div className="panel__title">
                    <Collapse>
                      <Panel header="THÔNG TIN SẢN PHẨM">
                        <p>
                          <span>Gender: Unisex</span>
                          <span>Size run: 35 - 46</span>
                          <span>Upper: Canvas</span>
                          <span>Outsole: Rubber</span>
                        </p>
                      </Panel>
                    </Collapse>
                  </div>
                </div>
              </div>
              <div className="panel panelTwo">
                <div className="panel__heading child__detail">
                  <div className="panel__title">
                    <Collapse>
                      <Panel header="QUY ĐỊNH ĐỔI TRẢ">
                        <div className="collapseTwo" toggler="#collapseTwo">
                          <span>
                            Chỉ đổi hàng 1 lần duy nhất, mong bạn cân nhắc kĩ
                            trước khi quyết định.
                          </span>
                          <span>
                            Thời hạn đổi sản phẩm khi mua trực tiếp tại cửa hàng
                            là 07 ngày, kể từ ngày mua. Đổi sản phẩm khi mua
                            online là 14 ngày, kể từ ngày nhận hàng.
                          </span>
                          <span>
                            Sản phẩm đổi phải kèm hóa đơn. Bắt buộc phải còn
                            nguyên tem, hộp, nhãn mác.
                          </span>
                          <span>
                            Sản phẩm đổi không có dấu hiệu đã qua sử dụng, không
                            giặt tẩy, bám bẩn, biến dạng.
                          </span>
                          <span>
                            <div>
                              Ananas chỉ ưu tiên hỗ trợ đổi size. Trong trường
                              hợp sản phẩm hết size cần đổi, bạn có thể đổi sang
                              01 sản phẩm khác:
                            </div>
                            <div>
                              - Nếu sản phẩm muốn đổi ngang giá trị hoặc có giá
                              trị cao hơn, bạn sẽ cần bù khoảng chênh lệch tại
                              thời điểm đổi (nếu có).
                            </div>
                            <div>
                              - Nếu bạn mong muốn đổi sản phẩm có giá trị thấp
                              hơn, chúng tôi sẽ không hoàn lại tiền.
                            </div>
                          </span>
                          <span>
                            Trong trường hợp sản phẩm - size bạn muốn đổi không
                            còn hàng trong hệ thống. Vui lòng chọn sản phẩm
                            khác.
                          </span>
                          <span>
                            Không hoàn trả bằng tiền mặt dù bất cứ trong trường
                            hợp nào. Mong bạn thông cảm.
                          </span>
                        </div>
                      </Panel>
                    </Collapse>
                  </div>
                </div>
              </div>
              <div className="panel panelThree">
                <div className="panel__heading child__detail">
                  <div className="panel__title">
                    <Collapse>
                      <Panel header="BẢO HÀNH THẾ NÀO">
                        <div className="collapseThree" id="collapseThree">
                          <span>
                            Mỗi đôi giày Ananas trước khi xuất xưởng đều trải
                            qua nhiều khâu kiểm tra. Tuy vậy, trong quá trình sử
                            dụng, nếu nhận thấy các lỗi: gãy đế, hở đế, đứt chỉ
                            may,...trong thời gian 6 tháng từ ngày mua hàng,
                            mong bạn sớm gửi sản phẩm về Ananas nhằm giúp chúng
                            tôi có cơ hội phục vụ bạn tốt hơn. Vui lòng gửi sản
                            phẩm về bất kỳ cửa hàng Ananas nào, hoặc gửi đến
                            trung tâm bảo hành Ananas ngay trong trung tâm
                            TP.HCM trong giờ hành chính:
                          </span>
                          <span>
                            Lầu 1, 11 Mười Một, Cẩm Lệ, TP. Đà Nẵng Hotline:
                            0909090909
                          </span>
                        </div>
                      </Panel>
                    </Collapse>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="related">
            <div className="header__realated">
              <span>SẢN PHẨM LIÊN QUAN</span>
            </div>
            {/* <div className="related__slide">
              <img src={image.LOGO} alt="" />
              <img src={image.LOGO} alt="" />
              <img src={image.LOGO} alt="" />
              <img src={image.LOGO} alt="" />
            </div> */}
          </div>
        </div>
      </div>
      <div className="mobile"></div>
    </>
  );
}

export default ProductDetail;
