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
import {
	setProduct,
	setComment,
	setEvalute,
	setValue,
} from "../../slice/productdetail.slice";
import { addSeenList } from "../../slice/seenlist.slice";
import CommentItem from "./CommentItem";
import FormInput from "./FormInput";
import { setLoading } from "../../slice/loading.slice";
import RelatedProduct from "./RelatedProduct";
import { Pagination, Rate, Tabs, Progress } from "antd";
import API from "../../axios";
import { notifiError, notifiSuccess } from "../../utils/notification";

const { TabPane } = Tabs;
const rate = [0, 1, 2, 3, 4];
function ProductDetail({ socket }) {
	const productDetail = useSelector((state) => state.productDetail);
	const { user } = useSelector((state) => state.auth);
	const { id } = useParams();
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const [dataEvalute, setDataEvalute] = useState({});
	const { product, comments, star, evalute, value } = productDetail;
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

			dispatch(setLoading(false));
			if (data) {
				dispatch(addSeenList(data));
			}
		};
		getProduct();
	}, [dispatch, id]);

	useEffect(() => {
		const getCM = async () => {
			const data = await productApi.getComment(id);
			dispatch(setComment(data));
		};
		getCM();
	}, [dispatch]);

	useEffect(() => {
		if (user) {
			const getEvalute = async () => {
				const res = await API(`api/product/${id}/evalutes`, "GET");
				dispatch(setEvalute({ id: user._id, evalute: res.data }));
			};

			getEvalute();
		}
	}, [user]);
	const onEvalute = async (value) => {
		try {
			if (!token) {
				notifiError("Vui lòng đăng nhập để đánh giá sản phẩm");
				return;
			}
			await API(`api/evalutes/${id}`, "POST", token, { star: value });
			dispatch(setValue({ id: user._id, value }));
			notifiSuccess("Đánh giá thành công");
		} catch (err) {
			notifiError(err.response.data.msg || "Have error");
		}
	};
	const filter = () => {
		let tamp = {};
		evalute.map((ev) => {
			if (tamp[ev.star]) {
				tamp[ev.star]++;
			} else tamp[ev.star] = 1;
		});
		setDataEvalute(tamp);
	};
	useEffect(() => {
		if (evalute && evalute.length > 0) {
			filter();
		}
	}, [evalute]);

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
								<div className="container-evalue">
									<div className="table-evalue">
										<div className="rate-evalue">
											<div className="value-rate">
												{star}/5
											</div>
											<Rate
												defaultValue={star}
												// disabled={true}
												value={star}
											/>
											<div className="total-evalute">
												{evalute?.length | 0} đánh giá
											</div>
										</div>
										<div className="list-evalute">
											{rate.map((i) => (
												<div
													style={{
														display: "flex",
														flexDirection: "row",
														alignItems: "center",
														justifyContent:
															"center",
													}}
												>
													<Rate
														defaultValue={5 - i}
														disabled={true}
													/>
													<div
														style={{
															width: "150px",
															paddingLeft: "15px",
														}}
													>
														<Progress
															percent={
																((dataEvalute[
																	5 - i
																] |
																	0) /
																	evalute?.length) *
																100
															}
															strokeColor={{
																"0%": "#fadb14",
																"100%":
																	"fadb14",
															}}
															size="small"
														/>
													</div>
													<div className="quality-rate">
														{dataEvalute[5 - i]}
													</div>
												</div>
											))}
										</div>
									</div>
									<div className="user-evalue">
										<Rate
											onChange={(value) =>
												onEvalute(value)
											}
											value={value}
										/>
									</div>
								</div>
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
										{comments.length > 0 && (
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
										)}
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
					</div>
				</div>
			)}
		</>
	);
}

export default ProductDetail;
