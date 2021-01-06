import { CameraOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sub from "sub-vn";
import API from "../../axios";
import { updateUser } from "../../slice/auth.slice";
import { notifiError, notifiSuccess } from "../../utils/notification";
import "./index.css";

const { Option } = Select;
function Profile() {
	const { user } = useSelector((state) => state.auth);
	const [formProfile] = Form.useForm();
	const [formPassword] = Form.useForm();
	const [image, setImage] = useState(user.avatar);
	const token = useSelector((state) => state.token);
	const dispatch = useDispatch();
	useEffect(() => {
		formProfile.setFieldsValue({
			name: user.name,
			phone: user.phone,
			address: user.address,
			email: user.email,
			provinces: user.provincial,
			district: user.district,
			ward: user.wards,
		});
	}, []);
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
	const inputFileRef = useRef(null);
	const [changePass, setchangePass] = useState(false);

	const handleChangeSelect = (e) => {
		setProvince(e);
	};

	const handleSelectDistrict = (e) => {
		setDistrict(e);
	};

	const handleChangeWard = (e) => {
		setWawrd(e);
	};
	const selectImg = (e) => {
		console.log(inputFileRef.current);
		// inputFileRef.current
	};
	const handleChangePass = (e) => {
		setchangePass(!changePass);
		console.log(changePass);
	};
	const _onFinishPassword = () => {
		const oldPassword = formPassword.getFieldValue("oldPassword");
		const newPassword = formPassword.getFieldValue("newPassword");
		API("user/reset", "POST", token, {
			newPassword: newPassword,
			oldPassword: oldPassword,
		})
			.then((res) => {
				formPassword.resetFields();
				notifiSuccess(res.data.msg);
			})
			.catch((err) => notifiError(err.response.data.msg));
	};
	const _onFinishProfile = () => {
		const {
			name,
			email,
			phone,
			provinces,
			ward,
			district,
			address,
		} = formProfile.getFieldsValue();
		const dataUpdate = {
			name,
			email,
			phone,
			provincial: provinces[0],
			wards: ward[0],
			district: district[0],
			address,
			avatar: image,
		};

		API("user/update", "PUT", token, dataUpdate)
			.then((res) => {
				formProfile.resetFields();
				dispatch(updateUser(dataUpdate));
				notifiSuccess("Cập nhật thành công");
			})
			.catch((err) => {
				notifiError("Cập nhật thất bại");
			});
	};
	const [input, setInput] = useState("warning");
	const validateName = () => {
		validateMessages ? setInput("success") : setInput("warning");
	};

	const _onChangeImage = async (e) => {
		e.preventDefault();
		try {
			const file = e.target.files[0];

			if (!file) return notifiError("No files were uploaded.");

			if (file.size > 1024 * 1024) return notifiError("Size too large.");

			if (file.type !== "image/jpeg" && file.type !== "image/png")
				return notifiError("File format is incorrect.");

			let formData = new FormData();
			formData.append("file", file);

			// dispatch(setLoading(true))
			const res = await axios.post(
				"http://localhost:3001/api/upload_avatar",
				formData,
				{
					headers: {
						"content-type": "multipart/form-data",
						Authorization: token,
					},
				}
			);

			setImage(res.data.url);

			// dispatch(setLoading(false))
		} catch (err) {
			notifiError(err.response.data.msg);
		}
	};
	return (
		<div className="Profile_page">
			<div class="profile_page-header">
				<h2 class="profile_page--title">THÔNG TIN KHÁCH HÀNG</h2>
				<span class="profile_page-notice">
					Đảm bảo thông tin của bạn là chính xác, thuận tiện hơn trong
					quá trình sử dụng.
				</span>
			</div>
			<div className="profile_page-content">
				{!changePass && user && (
					<Form
						form={formProfile}
						{...layout}
						name="profile"
						onFinish={_onFinishProfile}
						validateMessages={validateMessages}
						className="profile_form"
					>
						<div className="profile_img">
							<div className="avatar">
								<img src={image} alt="avt" />
								<span className="avatar_change">
									<CameraOutlined className="profile_img-icon" />
									<input
										type="file"
										name="file"
										id="file"
										onChange={_onChangeImage}
									/>
								</span>
							</div>
							<span className="profile_description">
								Ảnh đại diện
							</span>
						</div>
						<div className="profile_text">
							<Form.Item
								onChange={validateName}
								label="Họ tên"
								name={"name"}
								hasFeedback
								rules={[
									{
										required: true,
										message: "Vui lòng nhập họ tên",
									},
								]}
							>
								<Input
									className="form-control"
									type="text"
									placeholder="Họ tên"
									name="name"
									defaultValue={user.name}
									initialValue={user.name}
									value={user.name}
									id="success"
								/>
							</Form.Item>
							<Form.Item
								label="Số điện thoại"
								name={"phone"}
								hasFeedback
								rules={[
									{
										required: true,
										message: "Vui lòng số điện thoại",
										types: true,
									},
								]}
							>
								<Input
									className="form-control"
									placeholder="Số điện thoại"
									name="phone_number"
									initialValue={user.phone}
									// value={phone_number}
									defaultValue={user.phone}
									id="phone_number"
								/>
							</Form.Item>
							<Form.Item
								label="Email"
								name={"email"}
								hasFeedback
								rules={[{ required: false, type: "email" }]}
							>
								<Input
									className="form-control"
									type="text"
									placeholder="Email"
									name="email"
									disabled
									initialValue={user.email}
									defaultValue={user.email}
									// value={email}
									id="success"
								/>
							</Form.Item>

							<Form.Item
								label="Tỉnh/ Thành phố"
								name={"provinces"}
								hasFeedback
								rules={[
									{
										required: true,
										message: "Vui lòng chọn tỉnh/thành phố",
									},
								]}
								placeholder="Vui lòng chọn Tỉnh/ Thành phố"
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
											// selected={option.code === province}
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
								rules={[
									{
										required: true,
										message: "Vui lòng chọn quận/huyện",
									},
								]}
							>
								<Select
									showSearch
									allowClear
									id="district"
									name="district"
									onChange={handleSelectDistrict}
									disabled={
										province || user.district ? false : true
									}
									placeholder="Vui lòng chọn Quận/ Huyện"
								>
									{province &&
										sub
											.getDistrictsByProvinceCode(
												province[1]
											)
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
								rules={[
									{
										required: true,
										message: "Vui lòng chọn xã/phường",
									},
								]}
							>
								<Select
									showSearch
									allowClear
									id="ward"
									name="ward"
									disabled={
										district || user.wards ? false : true
									}
									onChange={handleChangeWard}
									placeholder="Vui lòng chọn Xã/ Phường"
								>
									{district &&
										sub
											.getWardsByDistrictCode(district[1])
											.map((ward, i) => (
												<Option
													key={i}
													value={[
														ward.name,
														ward.code,
													]}
												>
													{ward.name}
												</Option>
											))}
								</Select>
							</Form.Item>
							<Form.Item
								label="Số nhà/đường"
								hasFeedback
								name={"address"}
								rules={[
									{
										required: true,
										message: "Vui lòng thêm địa chỉ",
									},
								]}
							>
								<Input
									className="form-control"
									type="text"
									placeholder="Nhập địa chỉ"
									name="address"
									// value={address}
									defaultValue={user.address}
									initialValue={user.address}
									id="success"
								/>
							</Form.Item>
							<Form.Item>
								<Button
									className="profile_submit"
									type="primary"
									form="profile"
									htmlType="submit"
								>
									CẬP NHẬT
								</Button>
							</Form.Item>
						</div>
					</Form>
				)}
				{changePass && (
					<Form
						{...layout}
						onFinish={_onFinishPassword}
						form={formPassword}
						name="changePassword"
						className="profile_form"
						scrollToFirstError
					>
						<div className="profile_img">
							<div className="avatar">
								<img
									src={
										"https://upload.wikimedia.org/wikipedia/commons/1/17/OK-button_-_Macro_photography_of_a_remote_control.jpg"
									}
									alt="avt"
								/>
							</div>
						</div>
						<div className="profile_text">
							<Form.Item
								name="oldPassword"
								label="Mật khẩu cũ"
								rules={[
									{
										required: true,
										message: "Vui lòng nhập mật khẩu cũ",
									},
								]}
							>
								<Input.Password />
							</Form.Item>
							<Form.Item
								name="newPassword"
								label="Mật khẩu mới"
								rules={[
									{
										required: true,
										message: "Vui lòng nhập mật khẩu mới",
									},
								]}
								hasFeedback
							>
								<Input.Password />
							</Form.Item>

							<Form.Item
								name="confirm"
								label="Xác nhận mật khẩu"
								dependencies={["newPassword"]}
								hasFeedback
								rules={[
									{
										required: true,
										message:
											"Vui lòng xác nhận mật khẩu mới",
									},
									({ getFieldValue }) => ({
										validator(rule, value) {
											if (
												!value ||
												getFieldValue("newPassword") ===
													value
											) {
												return Promise.resolve();
											}

											return Promise.reject(
												"Mật khẩu không trùng khớp, hãy thử lại !!!"
											);
										},
									}),
								]}
							>
								<Input.Password />
							</Form.Item>
							<Form.Item>
								<Button
									className="profile_submit"
									type="primary"
									form="changePassword"
									htmlType="submit"
								>
									CẬP NHẬT
								</Button>
							</Form.Item>
						</div>
					</Form>
				)}
				<div
					className={`profile_control ${
						changePass ? "profile_toggle-active" : ""
					}`}
				>
					<button
						onClick={handleChangePass}
						className="profile_toggle"
						type="button"
					>
						{changePass
							? "CHỈNH SỬA THÔNG TIN"
							: "THAY ĐỔI MẬT KHẨU"}
					</button>
				</div>
			</div>
		</div>
	);
}
export default memo(Profile);
