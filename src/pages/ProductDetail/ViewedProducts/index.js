import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./index.scss";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import InfiniteCarousel from "react-leaf-carousel";
import Images from "../../../constant/image";

// import VNPay from "vnpay";
function ViewedProduct(props) {
  const seenlist = useSelector((state) => state.seenlist);
  const history = useHistory();
  const token = useSelector((state) => state.token);

  // useEffect(() => {
  // 	axios
  // 		.post(
  // 			"http://localhost:3001/api/create_payment_url",
  // 			{
  // 				address: "32 le van duc",
  // 				shipMoney: 30000,
  // 				products: [
  // 					{
  // 						productId: "5fccf7dfe508f35b04ab5ec6",
  // 						sizeId: "5fc5c01e0d06ee295d16901e",
  // 						amount: 1,
  // 						price: 420000,
  // 					},
  // 					{
  // 						productId: "5fccf7f1e508f35b04ab5eca",
  // 						sizeId: "5fc5c01e0d06ee295d16901e",
  // 						amount: 1,
  // 						price: 420000,
  // 					},
  // 				],
  // 				typePayment: 1,
  // 			},
  // 			{ headers: { Authorization: token } }
  // 		)
  // 		.then((res) => {
  // 			console.log(res);
  // 			// Redirect(res.data.url);
  // 			window.location.href = res.data.url;
  // 		});
  // }, []);
  return (
    <div className="container_viewed">
      <div className="header_viewed">
        <span>SẢN PHẨM ĐÃ XEM</span>
      </div>
      <div className="view_produtct list-group-1">
        <InfiniteCarousel
          //   breakpoints={[
          //     {
          //       breakpoint: 500,
          //       settings: {
          //         slidesToShow: 1,
          //         slidesToScroll: 1,
          //       },
          //     },
          //     {
          //       breakpoint: 768,
          //       settings: {
          //         slidesToShow: 3,
          //         slidesToScroll: 3,
          //       },
          //     },
          //   ]}
          dots={true}
          showSides={true}
          sidesOpacity={0.5}
          sideSize={1}
          slidesToScroll={3}
          slidesToShow={3}
          scrollOnDevice={true}
          increme
          className="carousel"
        >
          <div>
            <img alt="" src={Images.cat} />
          </div>
          <div>
            <img alt="" src={Images.cat} />
          </div>
          <div>
            <img alt="" src={Images.cat} />
          </div>
          <div>
            <img alt="" src={Images.cat} />
          </div>
        </InfiniteCarousel>
        {/* {seenlist.length > 0 &&
            seenlist.map((ss, i) => (
              <div
                className="list--item"
                key={i}
                onClick={() => history.push("/product-detail/" + ss._id)}
              >
                <img src={ss.images[0]}></img>
              </div>
            ))} */}
      </div>
    </div>
  );
}

export default ViewedProduct;
