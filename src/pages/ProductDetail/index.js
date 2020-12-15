import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

import SlideRelated from "../../components/SlideRelated";
import ContentPay from "./ContentPay";
import ContentLogo from "./ContentLogo";
import ViewedProduct from "./ViewedProducts";

function ProductDetail(props) {
  const { productType, producer, productName } = props;

  return (
    <>
      <div className="desktop-detail">
        <div className="container__product__detail">
          <div className="header__product__detail">
            <div className="header__detail">
              <div className="child__detail">{productType}Phụ kiện</div>
              <div className="child__detail">{producer}Hat/Búp bê</div>
              <div className="child__detail">
                {productName}Basell Cap - Be Posible
              </div>
            </div>
          </div>
          <div className="content__detail">
            <ContentLogo />
            <div className="dashed"></div>
            <ContentPay />
          </div>
          <div className="viewed">
            <div className="header__viewed">
              <ViewedProduct />
            </div>
          </div>
          <div className="related">
            <div className="header__realated">
              <span>SẢN PHẨM LIÊN QUAN</span>
            </div>
            <SlideRelated />
          </div>
        </div>
      </div>
      <div className="mobile"></div>
    </>
  );
}

export default ProductDetail;
