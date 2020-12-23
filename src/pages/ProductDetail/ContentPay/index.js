import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Collapse } from "antd";

import "./index.scss";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addLikeList, removeProduct } from "../../../slice/likelist.slice";
import { addCart } from "../../../slice/cart.slice";
import axios from "axios";
import { notifiSuccess, notifiError } from "../../../utils/notification";
const { Panel } = Collapse;

function ContentPay(props) {
	const productDetail = useSelector((state) => state.productDetail);
	const likelist = useSelector((state) => state.likelist);
	const {
		type,
		amount,
		code,
		colors,
		description,
		images,
		limited,
		sizes,
		salePrice,
		style,
		material,
		name,
		_id,
	} = productDetail.product;
	const likeList = useSelector((state) => state.likeList);
	const [warning, setWarning] = useState("none");
	const dispatch = useDispatch();
	const [heart, setHeart] = useState(false);
	const refAmount = useRef(null);
	const refSize = useRef(null);
	const cart = useSelector((state) => state.cart);
	const token = useSelector((state) => state.token);

	const handleHeart = (type = true) => {
		if (type) {
			dispatch(addLikeList(productDetail.product));
		} else {
			dispatch(removeProduct(_id));
		}
	};

	const showWarning = () => {
		//dùng cái này---------------------------------

		//  (size === "none" || amount === 0) ?  setWarning("grid"): setWarning("none");
		setWarning("grid");
	};

	const handleCart = () => {
		// dispatch(
		// 	addCart({
		// 		productId: _id,
		// 		amount: +refAmount.current.value,
		// 	})
		// );
		// console.log(refSize.current.value);
		const sizeId = sizes.filter(
			(size) => size.sizeId._id === refSize.current.value
		)[0];
		axios
			.patch(
				"http://localhost:3001/user/cart",
				{
					cart: [
						...cart,
						{
							productId: _id,
							amount: +refAmount.current.value,
							sizeId: sizeId,
						},
					],
				},
				{ headers: { Authorization: token } }
			)
			.then((res) => {
				dispatch(
					addCart({
						productId: productDetail.product,
						amount: +refAmount.current.value,
						sizeId: sizeId,
					})
				);
				notifiSuccess("Notify", "Add cart success");
			})
			.catch((e) => {
				notifiError("Error", e.response.data.msg);
			});
	};

	return (
		<div className="info__detail child__detail">
			{/* col-xs-12 col-sm-12 col-md-5 col-lg-5 prd-detail-right */}
			<div className="list-group">
				<div className="name child__detail list-group-item">
					<b>{name}</b>
				</div>
				<div className="id__status list-group-item">
					<div className="id">
						Mã sản phẩm: <b>{code}</b>{" "}
					</div>
					<div className="status">
						Tình trạng: <b>Best Seller</b>
					</div>
				</div>
				<div className="price child__detail list-group-item">
					{salePrice} VND
				</div>
				<div className="dash list-group-item"></div>
				<div className="description child__detail list-group-item">
					{description}
				</div>
				<div className="dash list-group-item"></div>
				<div className="color__product child__detail list-group-item">
					{colors.map((color, i) => (
						<div
							key={i}
							className="colorOne"
							style={{
								backgroundColor: color.code,
								width: "30px",
								height: "30px",
								borderRadius: "3px",
								opacity: 0.8,
								border: "1px solid #000",
								margin: "0 5px",
								cursor: "pointer",
							}}
						></div>
					))}
				</div>
				<div className="dash list-group-item"></div>
				<div className="size__amount child__detail list-group-item">
					<div className="size">
						<span>SIZE</span>
						<div className="size__option">
							<select
								className="size__option"
								name="size"
								id="size"
								ref={refSize}
							>
								{sizes.map((size, i) => (
									<option
										key={i}
										value={size.sizeId._id}
										selected={i === 0}
									>
										{size.sizeId.name}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="amount">
						<span>SỐ LƯỢNG</span>
						<div className="size__option">
							<select
								className="size__option"
								name="size"
								id="size"
								ref={refAmount}
							>
								<option value="1" selected>
									1
								</option>
								<option value="2">{amount}2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
							</select>
						</div>
					</div>
				</div>
				<div className="btn__addCart__like child__detail list-group-item">
					<div className="btn btn__addCart" onClick={handleCart}>
						<button className="btn__add">THÊM VÀO GIỎ HÀNG</button>
					</div>
					<div className="btn btn__like">
						{likeList.some((ll) => ll._id === _id) ? (
							<button
								className="btn__heart"
								onClick={() => handleHeart(false)}
								style={{ color: "#f15e2c" }}
							>
								<HeartFilled />
							</button>
						) : (
							<button
								className="btn__heart"
								onClick={() => handleHeart(true)}
								style={{ color: "white" }}
							>
								<HeartFilled />
							</button>
						)}
					</div>
				</div>
				<div className="btn btn__payment child__detail list-group-item">
					<button className="btn__pay" onClick={showWarning}>
						THANH TOÁN
					</button>
				</div>
				<div
					className="warning child__detail list-group-item"
					disabled="true"
				>
					<p className="warning__title" style={{ display: warning }}>
						Vui lòng chọn size/số lượng
					</p>
				</div>
				<div className="panel panelOne list-group-item">
					<div className="panel__heading child__detail">
						<div className="panel__title">
							<Collapse>
								<Panel header="THÔNG TIN SẢN PHẨM">
									<p>
										<span>Gender: {name}Unisex</span>
										<span>Size run: 35 - 46</span>
										<span>Upper: {type.name}</span>
										<span>Outsole: {}Rubber</span>
									</p>
								</Panel>
							</Collapse>
						</div>
					</div>
				</div>
				<div className="panel panelTwo list-group-item">
					<div className="panel__heading child__detail">
						<div className="panel__title">
							<Collapse>
								<Panel header="QUY ĐỊNH ĐỔI TRẢ">
									<div
										className="collapseTwo"
										toggler="#collapseTwo"
									>
										<span>
											Chỉ đổi hàng 1 lần duy nhất, mong
											bạn cân nhắc kĩ trước khi quyết
											định.
										</span>
										<span>
											Thời hạn đổi sản phẩm khi mua trực
											tiếp tại cửa hàng là 07 ngày, kể từ
											ngày mua. Đổi sản phẩm khi mua
											online là 14 ngày, kể từ ngày nhận
											hàng.
										</span>
										<span>
											Sản phẩm đổi phải kèm hóa đơn. Bắt
											buộc phải còn nguyên tem, hộp, nhãn
											mác.
										</span>
										<span>
											Sản phẩm đổi không có dấu hiệu đã
											qua sử dụng, không giặt tẩy, bám
											bẩn, biến dạng.
										</span>
										<span>
											<div>
												Ananas chỉ ưu tiên hỗ trợ đổi
												size. Trong trường hợp sản phẩm
												hết size cần đổi, bạn có thể đổi
												sang 01 sản phẩm khác:
											</div>
											<div>
												- Nếu sản phẩm muốn đổi ngang
												giá trị hoặc có giá trị cao hơn,
												bạn sẽ cần bù khoảng chênh lệch
												tại thời điểm đổi (nếu có).
											</div>
											<div>
												- Nếu bạn mong muốn đổi sản phẩm
												có giá trị thấp hơn, chúng tôi
												sẽ không hoàn lại tiền.
											</div>
										</span>
										<span>
											Trong trường hợp sản phẩm - size bạn
											muốn đổi không còn hàng trong hệ
											thống. Vui lòng chọn sản phẩm khác.
										</span>
										<span>
											Không hoàn trả bằng tiền mặt dù bất
											cứ trong trường hợp nào. Mong bạn
											thông cảm.
										</span>
									</div>
								</Panel>
							</Collapse>
						</div>
					</div>
				</div>
				<div className="panel panelThree list-group-item">
					<div className="panel__heading child__detail">
						<div className="panel__title">
							<Collapse>
								<Panel header="BẢO HÀNH THẾ NÀO">
									<div
										className="collapseThree"
										id="collapseThree"
									>
										<span>{description}</span>
									</div>
								</Panel>
							</Collapse>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ContentPay;