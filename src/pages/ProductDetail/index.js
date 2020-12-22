import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import { useParams } from "react-router-dom";
import SlideRelated from "../../components/SlideRelated";
import ContentPay from "./ContentPay";
import ContentLogo from "./ContentLogo";
import ViewedProduct from "./ViewedProducts";
import productApi from "../../api/productApi";
import { useDispatch, useSelector } from "react-redux";
import { setProduct, setComment } from "../../slice/productdetail.slice";
import { addSeenList } from "../../slice/seenlist.slice";
import CommentItem from "./CommentItem";
import FormInput from "./FormInput";

function ProductDetail({ socket }) {
	const [loading, setLoading] = useState(true);
	const productDetail = useSelector((state) => state.productDetail);
	const { id } = useParams();
	const [page, setPage] = useState(1);
	const pageEnd = useRef();
	const dispatch = useDispatch();

	const { product, comments } = productDetail;
	useEffect(() => {
		if (socket) {
			socket.emit("joinRoom", id);
		}
	}, [socket, id]);

	useEffect(() => {
		setLoading(true);
		const getProduct = async () => {
			const data = await productApi.getProductDetail(id);
			dispatch(setProduct(data));
			if (data) dispatch(addSeenList(data));
			setLoading(false);
		};
		getProduct();
	}, [dispatch]);
	useEffect(() => {
		const getCM = async () => {
			const data = await productApi.getComment(id);
			dispatch(setComment(data));
		};
		getCM();
	}, [dispatch]);
	useEffect(() => {
		if (socket) {
			socket.on("sendCommentToClient", (msg) => {
				dispatch(setComment([msg, ...comments]));
			});

			return () => socket.off("sendCommentToClient");
		}
	}, [socket, comments]);
	useEffect(() => {
		// const observer = new IntersectionObserver(
		// 	(entries) => {
		// 		if (entries[0].isIntersecting) {
		// 			setPage((prev) => prev + 1);
		// 		}
		// 	},
		// 	{
		// 		threshold: 0.1,
		// 	}
		// );
		// observer.observe(pageEnd.current);
	}, []);
	useEffect(() => {
		// console.log(3);
		if (socket) {
			socket.on("sendReplyCommentToClient", (msg) => {
				// const newArr = [...comments];

				// newArr.forEach((cm) => {
				// 	if (cm._id === msg._id) {
				// 		cm.reply = msg.reply;
				// 	}
				// });

				// dispatch(setComment(newArr));
				console.log("msg", msg);
			});

			return () => socket.off("sendReplyCommentToClient");
		}
	}, [socket, comments]);
	return (
		<>
			{productDetail.product && !loading && (
				<div className="desktop-detail">
					<div className="container__product__detail">
						<div className="header__product__detail">
							<div className="header__detail">
								<div className="child__detail">Shoes</div>
								<div className="child__detail">
									{product.type.name}
								</div>
								<div className="child__detail">
									{product.name}
								</div>
							</div>
						</div>
						<div className="content__detail">
							<ContentLogo socket={socket} />
							<div className="dashed"></div>
							<ContentPay />
						</div>
						<div className="viewed">
							<div className="header__viewed">
								<ViewedProduct />
							</div>
						</div>
						<div className="related">
							<div className="header__realated">
								<span>SẢN PHẨM LIÊN QUAN</span>
							</div>
							<SlideRelated />
						</div>
					</div>
					<FormInput productId={product._id} socket={socket} />
					<div className="comments_list">
						{comments.map((comment) => (
							<CommentItem
								key={comment._id}
								comment={comment}
								socket={socket}
							/>
						))}
					</div>
					<button ref={pageEnd} style={{ opacity: 0 }}>
						Load more
					</button>
				</div>
			)}
		</>
	);
}

export default ProductDetail;
