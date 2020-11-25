import React, { memo, useRef } from "react";
import PropTypes from "prop-types";
import Carousel, { consts } from "react-elastic-carousel";
import "./index.scss";
import Images from "../../constant/image";
SliderSale.propTypes = {};
let resetTimeout;
function SliderSale(props) {
	const carouselRef1 = useRef(null);
	return (
		<div className="container_sale">
			<Carousel
				id={"slider"}
				ref={carouselRef1}
				psToShow={1}
				enableAutoPlay={true}
				pagination={false}
				showArrows={false}
				autoPlaySpeed={3000} // same time
				onNextEnd={({ index }) => {
					clearTimeout(resetTimeout);
					if (index + 1 === 3) {
						resetTimeout = setTimeout(() => {
							carouselRef1.current.goTo(0);
						}, 3000); // same time
					}
				}}
			>
				<img className="slider" src={Images.SLIDER1} alt="slider1" />
				<img className="slider" src={Images.SLIDER2} alt="slider2" />
				<img className="slider" src={Images.SLIDER} alt="slider3" />
			</Carousel>
		</div>
	);
}

export default memo(SliderSale);
