import React from "react";
import PropTypes from "prop-types";
import "./index.scss";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function ViewedProduct(props) {
	const seenlist = useSelector((state) => state.seenlist);
	const history = useHistory();
	return (
		<div className="container">
			<div className="header">
				<span>SẢN PHẨM ĐÃ XEM</span>
			</div>
			<div className="view_produtct list-group-1">
				{seenlist.map((ss, i) => (
					<div
						className="list--item"
						key={i}
						onClick={() =>
							history.push("/product-detail/" + ss._id)
						}
					>
						<img src={ss.images[0]}></img>
					</div>
				))}
				{/* <div className="list--item">
					<img src={imageProduct1}></img>
				</div>
				<div className="list--item">
					<img src={imageProduct2}></img>
				</div>
				<div className="list--item">
					<img src={imageProduct3}></img>
				</div>
				<div className="list--item">
					<img src={imageProduct4}></img>
				</div> */}
			</div>
		</div>
	);
}

export default ViewedProduct;
