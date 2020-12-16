import PropTypes from "prop-types";
import React, { useState } from "react";
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

function ContentLogo(props) {
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

  const [like, setLike] = useState("blue");
  const [reply, setReply] = useState("none");
  const [warning, setWarning] = useState("none");

  const likeBtn = (e) => {
    console.log(e.target);

    if (like === "blue") setLike("#123");
    else {
      setLike("blue");
    }
  };

  const repBtn = () => {
    if (reply === "none") {
      setReply("grid");
    } else setReply("none");
  };

  const showWarning = () => {
    //dùng cái này---------------------------------

    // if (size === "none" || amount === 0) {
    //   setWarning("grid");
    // } else setWarning("none");
    setWarning("grid");
  };

  const imageProduct1 =
    "https://ananas.vn/wp-content/uploads/pro_vintas_A61040_1.jpg";

  const imageProduct2 =
    "https://ananas.vn/wp-content/uploads/pro_vintas_A61040_2.jpg";
  const imageProduct3 =
    "https://ananas.vn/wp-content/uploads/pro_vintas_A61040_3.jpg";
  const imageProduct4 =
    "https://ananas.vn/wp-content/uploads/pro_vintas_A61040_4.jpg";
  return (
    <div className="content__logo list-group">
      {/* col-xs-12 col-sm-12 col-md-7 col-lg-7 */}
      <div className="main__logo list-group-item">
        <img src={imageProduct1} alt="" />
      </div>
      <div className="child__detail child__logo list-group-item">
        <div className="child-side">
          <div className="logo-slide">
            <img src={imageProduct2} alt="" />
          </div>
          <div className="logo-slide">
            <img src={imageProduct3} alt="" />
          </div>
          <div className="logo-slide">
            <img src={imageProduct4} alt="" />
          </div>
          <div className="logo-slide">
            <img src={imageProduct1} alt="" />
          </div>
        </div>
      </div>
      <div className="comment list-group-item">
        <div className="comment_content">
          <label>Bình luận</label>
          <label>{customer_name}Thasi Baor</label>
          <textarea />
          <div className="like_rep">
            <div
              className="like"
              style={{ color: like, fontWeight: "bold" }}
              onClick={(e) => likeBtn(e)}
            >
              Thích
            </div>
            <div className="rep" onClick={repBtn}>
              Phản hồi
            </div>
          </div>
        </div>
        <div className="rep_comment" style={{ display: reply }}>
          <label>{repply_customer_name}Baro Thais</label>
          <textarea />
          <div className="like_rep">
            <div className="like">Thích</div>
            <div onClick={reply}>Phản hồi</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentLogo;
