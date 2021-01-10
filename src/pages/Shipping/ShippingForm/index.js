import { Checkbox, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import sub from "sub-vn";
import API from "../../../axios";
import { changeCart } from "../../../slice/auth.slice";
import { setCart } from "../../../slice/cart.slice";
import { notifiError, notifiSuccess } from "../../../utils/notification";
import "./index.scss";

const { Option } = Select;
ShippingForm.propTypes = {};

function ShippingForm({ form }) {
	const { creatingOrder } = useSelector((state) => state.orders);
	const { user } = useSelector((state) => state.auth);
	const token = useSelector((state) => state.token);
	const history = useHistory();
	const dispatch = useDispatch();
	useEffect(() => {
		form.setFieldsValue({
			name: user.name,
			phone: user.phone,
			address: user.address,
			typePayment: 0,
		});
	}, []);

	const layout = {
		labelCol: { span: 4 },
		wrapperCol: { span: 20 },
	};

	const validateMessages = {
		required: "${label} is required!",
		types: {
			email: "${label} is not a valid email!",
			number: "${label} is not a valid number!",
		},
		number: {
			range: "${label} must be between ${min} and ${max}",
		},
	};
	const [province, setProvince] = useState("");
	const [district, setDistrict] = useState("");
	const [ward, setWawrd] = useState("");

	const handleChangeSelect = (e) => {
		setProvince(e);
	};

	const handleSelectDistrict = (e) => {
		setDistrict(e);
	};

	const handleChangeWard = (e) => {
		setWawrd(e);
	};

	const [input, setInput] = useState("warning");
	const validateName = () => {
		validateMessages ? setInput("success") : setInput("warning");
	};
	const _onChange = () => {
		console.log(form.getFieldValue("name"));
	};
	const _onFinish = () => {
		console.log("submit");

		const {
			name,
			address,
			phone,
			note,
			typePayment,
			ward,
			provinces,
			district,
		} = form.getFieldsValue();
		const dataOrder = {
			recipientName: name,
			recipientPhone: phone,
			note,
			typePayment,
			address: `${address}, ${ward[0]}, ${district[0]}, ${provinces[0]}`,
			shipMoney: 32000,
			...creatingOrder,
		};
		console.log(dataOrder);
		if (typePayment === 0) {
			API("api/orders", "POST", token, dataOrder)
				.then((res) => {
					notifiSuccess(res.data.msg);
					dispatch(setCart({ cart: [], type: true }));
					dispatch(changeCart([]));
					history.push("/orders");
				})
				.catch((err) => notifiError(err.response.data.msg));
		} else {
			API("api/create_payment_url", "POST", token, dataOrder)
				.then((res) => {
					// notifiSuccess(res.data.msg);
					// history.push("/orders");
					// <Redirect to={res.data.url} />;
					window.location.href = res.data.url;
				})
				.catch((err) => notifiError(err.response.data.msg));
		}
	};
	return (
		<div className="info_form">
			<div className="header">THÔNG TIN GIAO HÀNG</div>
			<Form
				form={form}
				{...layout}
				name="form"
				validateMessages={validateMessages}
				onChange={_onChange}
				onFinish={_onFinish}
				scrollToFirstError
			>
				<Form.Item
					onChange={validateName}
					label="Họ tên"
					name={"name"}
					hasFeedback
					rules={[
						{ required: true, message: "Vui lòng nhập họ tên" },
					]}
				>
					<Input
						className="form-control"
						type="text"
						placeholder="Nhập đầy đủ họ và tên"
						name="name"
						initialValue={user.name}
						defaultValue={user.name}
						value={user.name}
						id="success"
					/>
				</Form.Item>
				<Form.Item
					label="Số điện thoại"
					name={"phone"}
					hasFeedback
					rules={[{ required: true, types: true }]}
				>
					<Input
						className="form-control"
						placeholder="Số điện thoại người nhận"
						name="phone_number"
						initialValue={user.phone}
						defaultValue={user.phone}
						value={user.phone}
						id="phone_number"
					/>
				</Form.Item>

				<Form.Item
					label="Tỉnh/ Thành phố"
					name={"provinces"}
					hasFeedback
					rules={[
						{ required: true, message: "Tỉnh thành phố bắt buộc" },
					]}
				>
					<Select
						showSearch
						allowClear
						id="city"
						name="city"
						onChange={handleChangeSelect}
						placeholder="Vui lòng chọn Tỉnh/ Thành phố"
					>
						{sub.getProvinces().map((option, index) => (
							<Option
								key={index}
								value={[option.name, option.code]}
								selected={option.code === province}
							>
								{option.name}
							</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					label="Quận/ Huyện"
					hasFeedback
					name={"district"}
					rules={[{ required: true }]}
				>
					<Select
						showSearch
						allowClear
						id="district"
						name="district"
						onChange={handleSelectDistrict}
						disabled={province ? false : true}
						placeholder="Vui lòng chọn Quận/ Huyện"
					>
						{province &&
							sub
								.getDistrictsByProvinceCode(province[1])
								.map((dis, i) => (
									<Option
										key={i}
										value={[dis.name, dis.code]}
									>
										{dis.name}
									</Option>
								))}
					</Select>
				</Form.Item>
				<Form.Item
					label="Phường/ Xã"
					hasFeedback
					name={"ward"}
					rules={[{ required: true }]}
				>
					<Select
						showSearch
						allowClear
						id="ward"
						name="ward"
						disabled={district ? false : true}
						onChange={handleChangeWard}
						placeholder="Vui lòng chọn Xã/ Phường"
					>
						{district &&
							sub
								.getWardsByDistrictCode(district[1])
								.map((ward, i) => (
									<Option
										key={i}
										value={[ward.name, ward.code]}
									>
										{ward.name}
									</Option>
								))}
					</Select>
				</Form.Item>
				<Form.Item
					label="Địa chỉ cụ thể"
					hasFeedback
					name={"address"}
					rules={[{ required: true, message: "Địa chỉ bắt buộc" }]}
				>
					<Input
						className="form-control"
						type="text"
						placeholder="Nhập địa chỉ"
						name="address"
						initialValue={user.address}
						defaultValue={user.address}
						value={user.address}
						id="success"
					/>
				</Form.Item>
				<Form.Item
					label="Ghi chú"
					hasFeedback
					name={"note"}
					rules={[{ required: false }]}
				>
					<Input.TextArea
						placeholder="Thêm ghi chú"
						name="note"
						maxLength={200}
						showCount={true}
						autoSize={true}
						value={""}
					/>
				</Form.Item>
				<Checkbox checked="true" style={{ padding: "20px" }} />
				<label style={{ fontSize: "1.2rem" }}>
					Cập nhật các thông tin mới nhất về chương trình từ Ananas
				</label>
				{/* </div> */}
				<div className="header">PHƯƠNG THỨC GIAO HÀNG</div>
				<div className="form-group check_info deliveryS">
					<div>
						<Checkbox checked="true" style={{ padding: "20px" }} />
						<label style={{ fontSize: "1.2rem" }}>
							Tốc độ tiêu chuẩn (từ 2 - 5 ngày làm việc)
						</label>
					</div>
					<div className="delivery_price">{32000} VND</div>
				</div>
				<div className="header">PHƯƠNG THỨC THANH TOÁN</div>
				<Form.Item
					label="Phương thức"
					hasFeedback
					name={"typePayment"}
					rules={[
						{
							required: true,
							message: "Phương thức thanh toán bắt buộc",
						},
					]}
				>
					<Select
						allowClear
						id="paymethod"
						name="paymethod"
						defaultValue={0}
						style={{ color: "#f15e2c" }}
					>
						<Option className="delivery_label" value={0}>
							Thanh toán trực tiếp khi giao hàng
						</Option>
						<Option className="delivery_label" value={1}>
							Thanh toán bằng thẻ trực tuyến
						</Option>
					</Select>
				</Form.Item>
				{/* </Radio.Group> */}
			</Form>
		</div>
	);
}

export default ShippingForm;
