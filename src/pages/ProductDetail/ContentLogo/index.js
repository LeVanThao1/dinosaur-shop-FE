import PropTypes from "prop-types";
import React, { memo, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Collapse } from "antd";

import "./index.scss";
import {
	DownOutlined,
	UserOutlined,
	HeartFilled,
	HeartOutlined,
} from "@ant-design/icons";
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	ButtonDropdown,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import productAPi from "../../../api/productApi";
import { setComment, setProduct } from "../../../slice/productdetail.slice";
import CommentItem from "../CommentItem";
import FormInput from "../FormInput";

function ContentLogo({ socket }) {
	const { Panel } = Collapse;

	const [like, setLike] = useState("blue");
	const [reply, setReply] = useState("none");
	const [warning, setWarning] = useState("none");
	const productDetail = useSelector((state) => state.productDetail);
	const auth = useSelector((state) => state.auth);
	const { comments, product } = productDetail;
	const [index, setIndex] = useState(0);
	const dispatch = useDispatch();
	// useEffect(() => {
	// 	const getCM = async () => {
	// 		const data = await productAPi.getComment(product._id);
	// 		dispatch(setComment(data));
	// 	};
	// 	getCM();
	// }, []);

	const likeBtn = (e) => {
		console.log(e.target);

		if (like === "blue") setLike("#123");
		else {
			setLike("blue");
		}
	};

	const repBtn = () => {
		if (reply === "none") {
			setReply("grid");
		} else setReply("none");
	};

	const showWarning = () => {
		//dùng cái này---------------------------------

		// if (size === "none" || amount === 0) {
		//   setWarning("grid");
		// } else setWarning("none");
		setWarning("grid");
	};

	return (
		<div className="content__logo list-group">
			{/* col-xs-12 col-sm-12 col-md-7 col-lg-7 */}
			<div className="main__logo list-group-item">
				<img src={product.images[index]} alt="image" loading="lazy" />
			</div>
			<div className="child__detail child__logo list-group-item">
				<div className="child-side">
					{product.images.map((image, i) => (
						<div
							className="logo-slide"
							key={i}
							onClick={() => setIndex(i)}
						>
							<img src={image} alt="product" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default memo(ContentLogo);
