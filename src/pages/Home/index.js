import React from "react";
import PropTypes from "prop-types";
import Promotion from "../../components/Promotion";
import SliderSale from "../../components/SliderSale";

Home.propTypes = {};

function Home(props) {
	return (
		<div>
			<Promotion />
			<SliderSale />
		</div>
	);
}

export default Home;
