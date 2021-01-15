import React, { memo, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, Typography } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { addLikeList, removeProduct } from "../../slice/likelist.slice";
// const { Meta } = Card;
import { formatMoney } from "../../utils/format";
const { Title } = Typography;

const styleLike = {
	position: "fixed",
	right: "8px",
	bottom: "8px",
	color: "#f15e2c",
	fontSize: "30px",
	zIndex: 999,
};

function ProductCard({ product }) {
	const [image, setImage] = React.useState(product.images[0]);
	const likeList = useSelector((state) => state.likeList);
	const dispatch = useDispatch();

	useEffect(() => {
		setImage(product.images[0]);
	}, [product]);

	const history = useHistory();

	const handleOnMouseEnter = () => {
		setImage(product.images[1]);
	};

	const handleOnMouseLeave = () => {
		setImage(product.images[0]);
	};

	const handleChangeLikeStatus = (type = true) => {
		if (type) {
			dispatch(addLikeList(product));
		} else {
			dispatch(removeProduct(product._id));
		}
	};

	return (
		<div style={{ marginBottom: "16px" }} className="wrap-card">
			<Card
				style={{ width: 240, cursor: "pointer" }}
				cover={
					<div
						style={{ width: "240px", position: "relative" }}
						onMouseEnter={handleOnMouseEnter}
						onMouseLeave={handleOnMouseLeave}
					>
						<img
							alt="picture"
							src={image}
							style={{ width: "100%" }}
						/>

						{/* {fillLike(like)} */}
						{likeList.some((ll) => ll._id === product._id) ? (
							<HeartFilled
								onClick={() => handleChangeLikeStatus(false)}
								style={styleLike}
							/>
						) : (
							<HeartOutlined
								onClick={() => handleChangeLikeStatus(true)}
								style={styleLike}
							/>
						)}
					</div>
				}
			>
				<Title level={5} className="text-center">
					<Link
						to={product._id ? "/product-detail/" + product._id : ""}
					>
						{product.name}
					</Link>
				</Title>
				<Title className="text-center" level={5}>
					{formatMoney(product.salePrice)} VND
				</Title>
			</Card>
		</div>
	);
}
export default memo(ProductCard);
