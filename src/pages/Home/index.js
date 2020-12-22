import React, { memo, useEffect } from "react";
import PropTypes from "prop-types";
import Promotion from "../../components/Promotion";
import SliderSale from "../../components/SliderSale";
import axios from "axios";
import { useSelector } from "react-redux";

Home.propTypes = {};

function Home(props) {
	return (
		<div>
			<Promotion />
			<SliderSale />
		</div>
	);
}

export default memo(Home);
