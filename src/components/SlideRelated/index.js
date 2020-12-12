import React, { memo } from "react";
import { Carousel } from "antd";
import Images from "../../constant/image";
import "./index.scss";

SlideRelated.propTypes = {};

function SlideRelated(props) {
  return (
    <div className="container__related">
      {/* <div className="related__slide">
        <img src={Images.LOGO} alt="" />
        <img src={Images.LOGO} alt="" />
        <img src={Images.LOGO} alt="" />
        <img src={Images.LOGO} alt="" />
      </div> */}
      <Carousel autoplay="true">
        <img className="slider" src={Images.LOGO} alt="slider1" />
        <img className="slider" src={Images.cat} alt="slider2" />
        <img className="slider" src={Images.LOGO} alt="slider3" />
        <img className="slider" src={Images.cat} alt="slider1" />
      </Carousel>
    </div>
  );
}

export default memo(SlideRelated);
