import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { CheckCircleOutlined } from "@ant-design/icons";
import Image from "../../../constant/image";
import "./index.scss";
import sub from "sub-vn";

import { Button, Form, Input, Select, Checkbox, Radio, message } from "antd";
const { Option } = Select;
ShippingForm.propTypes = {};

function ShippingForm(props) {
	const {
		name,
		phone_number,
		email,
		address,
		delivery_price,
		size,
		amount,
		price,
		reduction,
		pay_price,
		note,
	} = props;

	const [form] = Form.useForm();

	const onFinish = (values) => {
		console.log("Received values of form: ", values);
	};

	const [shipBy, setShipBy] = useState(1);

	const handleChangeShip = (e) => {
		setShipBy(e.target.value);
	};

	const radioStyle = {
		display: "block",
		height: "30px",
		lineHeight: "30px",
	};

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
	};
	return (
		<div className="info_form">
			<div className="header">THÔNG TIN GIAO HÀNG</div>
			<Form
				form={form}
				{...layout}
				name="nest-messages"
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
						value={name}
						id="success"
					/>
				</Form.Item>
				<Form.Item
					label="Số điện thoại"
					name={"phoneNumber"}
					hasFeedback
					rules={[{ required: true, types: true }]}
				>
					<Input
						className="form-control"
						placeholder="Số điện thoại người nhận"
						name="phone_number"
						value={phone_number}
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
						allowClear
						id="city"
						name="city"
						onChange={handleChangeSelect}
						placeholder="Vui lòng chọn Tỉnh/ Thành phố"
					>
						{sub.getProvinces().map((option, index) => (
							<Option
								key={index}
								value={option.code}
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
						allowClear
						id="district"
						name="district"
						onChange={handleSelectDistrict}
						disabled={province ? false : true}
						placeholder="Vui lòng chọn Quận/ Huyện"
					>
						{province &&
							sub
								.getDistrictsByProvinceCode(province)
								.map((dis, i) => (
									<Option key={i} value={dis.code}>
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
						allowClear
						id="ward"
						name="ward"
						disabled={district ? false : true}
						onChange={handleChangeWard}
						placeholder="Vui lòng chọn Xã/ Phường"
					>
						{district &&
							sub
								.getWardsByDistrictCode(district)
								.map((ward, i) => (
									<Option key={i} value={ward.code}>
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
						value={address}
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
					name={"paymethod"}
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
