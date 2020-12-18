import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Collapse } from "antd";

import "./index.scss";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

function ContentPay(props) {
  const {
    productType,
    producer,
    productName,
    idProduct,
    status,
    price,
    description,
    size,
    amount,
    color,
    LOGO,
    amontProduct,
    customer_name,
    repply_customer_name,
  } = props;

  const { Panel } = Collapse;
  const [warning, setWarning] = useState("none");

  const [heart, setHeart] = useState("none");

  const heartClick = () => {
    console.log(heart);
    heart === "none" ? setHeart("#f15e2c") : setHeart("none");
  };

  const showWarning = () => {
    //dùng cái này---------------------------------

    //  (size === "none" || amount === 0) ?  setWarning("grid"): setWarning("none");
    setWarning("grid");
  };
  return (
    <div className="info__detail child__detail">
      {/* col-xs-12 col-sm-12 col-md-5 col-lg-5 prd-detail-right */}
      <div className="list-group">
        <div className="name child__detail list-group-item">
          <b>{productName}BASEBALL CAP - BE POSITIVE - PINK</b>
        </div>
        <div className="id__status list-group-item">
          <div className="id">
            Mã sản phẩm: <b>{idProduct}ABC100</b>{" "}
          </div>
          <div className="status">
            Tình trạng: <b>{status}Best Seller</b>
          </div>
        </div>
        <div className="price child__detail list-group-item">
          {price}275.000 VND
        </div>
        <div className="dash list-group-item"></div>
        <div className="description child__detail list-group-item">
          {description}Dễ dàng mix & match với nhiều loại trang phục và phong
          cách thời trang khác nhau, mũ bóng chày có thiết kế cổ điển cùng hoạ
          tiết thêu đơn giản chính là món phụ kiện không thể thiếu trong tủ đồ
          nhà bạn.
        </div>
        <div className="dash list-group-item"></div>
        <div className="color__product child__detail list-group-item">
          <div
            className="colorOne"
            style={{
              backgroundColor: "orange",
              width: "30px",
              height: "30px",
            }}
          ></div>
        </div>
        <div className="dash list-group-item"></div>
        <div className="size__amount child__detail list-group-item">
          <div className="size">
            <span>SIZE</span>
            <div className="size__option">
              <select className="size__option" name="size" id="size">
                <option value="35" disabled="true">
                  35
                </option>
                <option value="35">{size}36</option>
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
            <div className="size__option">
              <select className="size__option" name="size" id="size">
                <option value="1" disabled="true">
                  1
                </option>
                <option value="2">{amount}2</option>
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
        <div className="btn__addCart__like child__detail list-group-item">
          <div className="btn btn__addCart">
            <button className="btn__add">THÊM VÀO GIỎ HÀNG</button>
          </div>
          <div className="btn btn__like">
            <button
              className="btn__heart"
              onClick={() => heartClick()}
              style={{ color: heart }}
            >
              <HeartFilled />
            </button>
          </div>
        </div>
        <div className="btn btn__payment child__detail list-group-item">
          <button className="btn__pay" onClick={showWarning}>
            THANH TOÁN
          </button>
        </div>
        <div className="warning child__detail list-group-item" disabled="true">
          <p className="warning__title" style={{ display: warning }}>
            Vui lòng chọn size/số lượng
          </p>
        </div>
        <div className="panel panelOne list-group-item">
          <div className="panel__heading child__detail">
            <div className="panel__title">
              <Collapse>
                <Panel header="THÔNG TIN SẢN PHẨM">
                  <p>
                    <span>Gender: {productName}Unisex</span>
                    <span>Size run: {size}35 - 46</span>
                    <span>Upper: {productType}Canvas</span>
                    <span>Outsole: {}Rubber</span>
                  </p>
                </Panel>
              </Collapse>
            </div>
          </div>
        </div>
        <div className="panel panelTwo list-group-item">
          <div className="panel__heading child__detail">
            <div className="panel__title">
              <Collapse>
                <Panel header="QUY ĐỊNH ĐỔI TRẢ">
                  <div className="collapseTwo" toggler="#collapseTwo">
                    <span>
                      Chỉ đổi hàng 1 lần duy nhất, mong bạn cân nhắc kĩ trước
                      khi quyết định.
                    </span>
                    <span>
                      Thời hạn đổi sản phẩm khi mua trực tiếp tại cửa hàng là 07
                      ngày, kể từ ngày mua. Đổi sản phẩm khi mua online là 14
                      ngày, kể từ ngày nhận hàng.
                    </span>
                    <span>
                      Sản phẩm đổi phải kèm hóa đơn. Bắt buộc phải còn nguyên
                      tem, hộp, nhãn mác.
                    </span>
                    <span>
                      Sản phẩm đổi không có dấu hiệu đã qua sử dụng, không giặt
                      tẩy, bám bẩn, biến dạng.
                    </span>
                    <span>
                      <div>
                        Ananas chỉ ưu tiên hỗ trợ đổi size. Trong trường hợp sản
                        phẩm hết size cần đổi, bạn có thể đổi sang 01 sản phẩm
                        khác:
                      </div>
                      <div>
                        - Nếu sản phẩm muốn đổi ngang giá trị hoặc có giá trị
                        cao hơn, bạn sẽ cần bù khoảng chênh lệch tại thời điểm
                        đổi (nếu có).
                      </div>
                      <div>
                        - Nếu bạn mong muốn đổi sản phẩm có giá trị thấp hơn,
                        chúng tôi sẽ không hoàn lại tiền.
                      </div>
                    </span>
                    <span>
                      Trong trường hợp sản phẩm - size bạn muốn đổi không còn
                      hàng trong hệ thống. Vui lòng chọn sản phẩm khác.
                    </span>
                    <span>
                      Không hoàn trả bằng tiền mặt dù bất cứ trong trường hợp
                      nào. Mong bạn thông cảm.
                    </span>
                  </div>
                </Panel>
              </Collapse>
            </div>
          </div>
        </div>
        <div className="panel panelThree list-group-item">
          <div className="panel__heading child__detail">
            <div className="panel__title">
              <Collapse>
                <Panel header="BẢO HÀNH THẾ NÀO">
                  <div className="collapseThree" id="collapseThree">
                    <span>
                      {description}Mỗi đôi giày Ananas trước khi xuất xưởng đều
                      trải qua nhiều khâu kiểm tra. Tuy vậy, trong quá trình sử
                      dụng, nếu nhận thấy các lỗi: gãy đế, hở đế, đứt chỉ
                      may,...trong thời gian 6 tháng từ ngày mua hàng, mong bạn
                      sớm gửi sản phẩm về Ananas nhằm giúp chúng tôi có cơ hội
                      phục vụ bạn tốt hơn. Vui lòng gửi sản phẩm về bất kỳ cửa
                      hàng Ananas nào, hoặc gửi đến trung tâm bảo hành Ananas
                      ngay trong trung tâm TP.HCM trong giờ hành chính:
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
  );
}

export default ContentPay;
