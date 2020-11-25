import React, { memo, useRef } from "react";
import PropTypes from "prop-types";
import "./index.scss";
import Carousel, { consts } from "react-elastic-carousel";
import Images from "../../constant/image";

Promotion.propTypes = {};
let resetTimeout;
function Promotion(props) {
	const carouselRef = useRef(null);
	const myArrow = ({ type, onClick, isEdge }) => {
		const pointer = type === consts.PREV ? Images.PREV : Images.NEXT;
		return (
			<div onClick={onClick} disabled={isEdge} className="btn-prev-next">
				<img src={pointer} width="20" height="20" />
			</div>
		);
	};

	return (
		<div className="container_promotion">
			<Carousel
				ref={carouselRef}
				psToShow={1}
				enableAutoPlay={true}
				pagination={false}
				renderArrow={myArrow}
				autoPlaySpeed={3000} // same time
				onNextEnd={({ index }) => {
					clearTimeout(resetTimeout);
					if (index + 1 === 6) {
						resetTimeout = setTimeout(() => {
							carouselRef.current.goTo(0);
						}, 3000); // same time
					}
				}}
			>
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
