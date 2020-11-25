import { Carousel } from "antd";
import React, { memo } from "react";
import "./index.scss";

Promotion.propTypes = {};
function Promotion(props) {
  return (
    <div className="container_promotion">
      <Carousel autoplay dots={false}>
        <p className="promotion">
          BUY MORE PAY LESS - ÁP DỤNG KHI MUA PHỤ KIỆN
        </p>
        <p className="promotion">FREE SHIPPING VỚI HOÁ ĐƠN TỪ 800K !</p>
        <p className="promotion">
          BUY MORE PAY LESS - ÁP DỤNG KHI MUA PHỤ KIỆN
        </p>
        <p className="promotion">FREE SHIPPING VỚI HOÁ ĐƠN TỪ 800K !</p>
        <p className="promotion">
          BUY MORE PAY LESS - ÁP DỤNG KHI MUA PHỤ KIỆN
        </p>
        <p className="promotion">FREE SHIPPING VỚI HOÁ ĐƠN TỪ 800K !</p>
      </Carousel>
    </div>
  );
}

export default memo(Promotion);
