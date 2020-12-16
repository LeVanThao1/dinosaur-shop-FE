import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

function ViewedProduct(props) {
  const imageProduct1 =
    "https://ananas.vn/wp-content/uploads/pro_vintas_A61040_1.jpg";

  const imageProduct2 =
    "https://ananas.vn/wp-content/uploads/pro_vintas_A61040_2.jpg";
  const imageProduct3 =
    "https://ananas.vn/wp-content/uploads/pro_vintas_A61040_3.jpg";
  const imageProduct4 =
    "https://ananas.vn/wp-content/uploads/pro_vintas_A61040_4.jpg";
  return (
    <div className="container">
      <div className="header">
        <span>SẢN PHẨM ĐÃ XEM</span>
      </div>
      <div className="view_produtct list-group-1">
        <div className="list--item">
          <img src={imageProduct1}></img>
        </div>
        <div className="list--item">
          <img src={imageProduct2}></img>
        </div>
        <div className="list--item">
          <img src={imageProduct3}></img>
        </div>
        <div className="list--item">
          <img src={imageProduct4}></img>
        </div>
      </div>
    </div>
  );
}

export default ViewedProduct;
