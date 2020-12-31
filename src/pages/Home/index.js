import React, { memo, useEffect } from "react";
import PropTypes from "prop-types";
import Promotion from "../../components/Promotion";
import SliderSale from "../../components/SliderSale";
import axios from "axios";
import { useSelector } from "react-redux";

Home.propTypes = {};

function Home(props) {
	const auth = useSelector(state => state.auth)
	console.log(auth.user)
	// vd t làm ở đây thôi nge..
	// sau khi đăng nhập rồi ak

	return (
		<div>
			<SliderSale />
		</div>
	);
}

export default memo(Home);
