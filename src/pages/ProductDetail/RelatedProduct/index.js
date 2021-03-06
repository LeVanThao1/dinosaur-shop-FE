import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./index.scss";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import InfiniteCarousel from "react-leaf-carousel";
import Images from "../../../constant/image";

function RelatedProduct(props) {
  const relatedlist = useSelector((state) => state.relatedlist);
  const history = useHistory();
  const token = useSelector((state) => state.token);

  return (
    <div className="container">
      <div className="header">
        <span>SẢN PHẨM LIÊN QUAN</span>
      </div>
      <div className="view_produtct list-group-1">
        <InfiniteCarousel
          breakpoints={[
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
          ]}
          dots={true}
          showSides={true}
          sidesOpacity={1}
          sideSize={1}
          slidesToScroll={4}
          slidesToShow={4}
          //   scrollOnDevice={true}
          responsive={false}
          className="carousel"
        >
          <div>
            <img alt="" src={Images.LOGO} />
          </div>
          <div>
            <img alt="" src={Images.LOGO} />
          </div>
          <div>
            <img alt="" src={Images.LOGO} />
          </div>
          <div>
            <img alt="" src={Images.LOGO} />
          </div>
          {/* {relatedlist.length > 0 &&
            relatedlist.map((ss, i) => (
              <div
                className="list--item"
                key={i}
                onClick={() => history.push("/product-detail/" + ss._id)}
              >
                <img src={ss.images[0]}></img>
              </div>
            ))} */}
        </InfiniteCarousel>
      </div>
    </div>
  );
}

export default RelatedProduct;
