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
import { setLoading } from "../../slice/loading.slice";
import RelatedProduct from "./RelatedProduct";
import { Pagination, Rate, Tabs } from "antd";

const { TabPane } = Tabs;

function ProductDetail({ socket }) {
	// const [loading, setLoading] = useState(true);
	const productDetail = useSelector((state) => state.productDetail);
	const { id } = useParams();
	const [page, setPage] = useState(1);
	const pageEnd = useRef();
	const dispatch = useDispatch();
	const seenList = useSelector((state) => state.seenList);
	const [value, setValue] = useState(2.5);
	const { product, comments } = productDetail;
	const [currentPage, setCurrentPage] = useState(1);
	useEffect(() => {
		if (socket) {
			socket.emit("joinRoom", id);
		}
	}, [socket, id]);

	useEffect(() => {
		dispatch(setLoading(true));
		const getProduct = async () => {
			const data = await productApi.getProductDetail(id);
			dispatch(setProduct(data));
			if (data) {
				dispatch(addSeenList(data));

				// cookie.save("seenList", seenList);
			}
			dispatch(setLoading(false));
		};
		getProduct();
	}, [dispatch, id]);

	useEffect(() => {
		dispatch(setLoading(true));
		const getCM = async () => {
			const data = await productApi.getComment(id);
			dispatch(setComment(data));
			dispatch(setLoading(false));
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

	const evalute = (value) => {
		setValue(value);
		// console.log(value);
	};

	return (
		<>
			{productDetail.product && (
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
						<Tabs
							defaultActiveKey="1"
							onChange={(key) => console.log(key)}
						>
							<TabPane tab="Đánh giá" key="1">
								<Rate
									// allowHalf
									onChange={(value) => evalute(value)}
									value={value}
								/>
							</TabPane>
							<TabPane tab="Nhận xét" key="2">
								<FormInput
									productId={product._id}
									socket={socket}
									placeholder="Nhập nội dung bình luận"
								/>
								<div className="comments_list">
									{comments
										? comments
												.slice(
													(currentPage - 1) * 5,
													currentPage * 5
												)
												.map((comment) => (
													<CommentItem
														key={comment._id}
														comment={comment}
														socket={socket}
													/>
												))
										: null}
									<div
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											width: "100%",
										}}
									>
										<Pagination
											defaultCurrent={currentPage}
											defaultPageSize={1}
											current={currentPage}
											total={Math.ceil(
												comments.length / 5
											)}
											onChange={(page, pageSize) =>
												setCurrentPage(page)
											}
										/>
									</div>
								</div>
							</TabPane>
							<TabPane tab="Chi tiết sản phẩm" key="3">
								Chi tiết sản phẩm
							</TabPane>
						</Tabs>
						<div className="viewed">
							<div className="header__viewed">
								<ViewedProduct />
							</div>
						</div>
						{/* <div className="related">
							<div className="header__realated">
							</div>
							<RelatedProduct />
						</div> */}
					</div>

					{/* <FormInput
						productId={product._id}
						socket={socket}
						placeholder="Nhập nội dung bình luận"
					/>
					<div className="comments_list">
						{comments
							? comments.map((comment) => (
									<CommentItem
										key={comment._id}
										comment={comment}
										socket={socket}
									/>
							  ))
							: null}
					</div>
					<button ref={pageEnd} style={{ opacity: 0 }}>
						Load more
					</button> */}
				</div>
			)}
		</>
	);
}

export default ProductDetail;
