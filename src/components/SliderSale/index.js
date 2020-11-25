import { Carousel } from "antd";
import React, { memo } from "react";
import Images from "../../constant/image";
import "./index.scss";
SliderSale.propTypes = {};

function SliderSale(props) {
  return (
    <div className="container_sale">
      <Carousel autoplay={true}>
        <img className="slider" src={Images.SLIDER1} alt="slider1" />
        <img className="slider" src={Images.SLIDER2} alt="slider2" />
        <img className="slider" src={Images.SLIDER} alt="slider3" />
      </Carousel>
    </div>
  );
}

export default memo(SliderSale);
