import React, { memo, useState, useRef } from 'react'
import sub from "sub-vn";
import { CameraOutlined } from '@ant-design/icons';

import './index.css'
import {
	Form,
	Input,
	Tooltip,
	Cascader,
	Select,
	Row,
	Col,
	Checkbox,
	Button,
	AutoComplete,
	Radio, message
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
function Profile() {
	const { Option } = Select;
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
	const [changePass, setchangePass] = useState(false)

	console.log(sub.getProvinces());
	console.log(sub.getDistricts());
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
		console.log(inputFileRef.current)
		// inputFileRef.current
	}
	const handleChangePass= (e) =>{
		setchangePass(!changePass);
		console.log(changePass);
	}

	const [input, setInput] = useState("warning");
	const validateName = () => {
		validateMessages ? setInput("success") : setInput("warning");
	};
	return (
		<div className="Profile_page">
			<div class="profile_page-header">
				<h2 class="profile_page--title">THÔNG TIN KHÁCH HÀNG</h2>
				<span class="profile_page-notice">Đảm bảo thông tin của bạn là chính xác, thuận tiện hơn trong quá trình sử dụng.</span>
			</div>
			<div className="profile_page-content">
				{
					changePass === false &&
				<Form
					{...layout}
					name="nest-messages"
					validateMessages={validateMessages}
					className="profile_form">
					<div className="profile_img">
						
						<div className="avatar">
							<img src={"https://upload.wikimedia.org/wikipedia/commons/1/17/OK-button_-_Macro_photography_of_a_remote_control.jpg"} alt="avt"/>
							<span className="avatar_change">
								<CameraOutlined className="profile_img-icon" />
								<input type="file" name="file" id="file" onChange={() => console.log("ad")}/>
							</span>
						</div>
						<span className="profile_description">Ảnh đại diện</span>
					</div>
					<div className="profile_text">
						<Form.Item
						onChange={validateName}
						label="Họ tên"
						name={["user", "name"]}
						hasFeedback
						rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}>
							<Input
								className="form-control"
								type="text"
								placeholder="Họ tên"
								name="name"
								// value={name}
								id="success" 
							/>
						</Form.Item>
						<Form.Item
							label="Số điện thoại"
							name={["user", "phoneNumber"]}
							hasFeedback
							rules={[{ required: true,message: "Vui lòng số điện thoại", types: true }]}>
							<Input
								className="form-control"
								placeholder="Số điện thoại"
								name="phone_number"
								// value={phone_number}
								id="phone_number" />
						</Form.Item>
						<Form.Item
							label="Email"
							name={["user", "email"]}
							hasFeedback
							rules={[{ required:true,type: "email" }]}>
							<Input
								className="form-control"
								type="text"
								placeholder="Email"
								name="email"
								disabled
								// value={email}
								id="success" />
						</Form.Item>

						<Form.Item
							label="Tỉnh/ Thành phố"
							name={["user", "provinces"]}
							hasFeedback
							rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố" }]}
							placeholder="Vui lòng chọn Tỉnh/ Thành phố" >
							<Select
								allowClear
								id="city"
								name="city"
								onChange={handleChangeSelect} >
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
							name={["user", "district"]}
							rules={[{ required: true, message: "Vui lòng chọn quận/huyện" }]}>
							<Select
								allowClear
								id="district"
								name="district"
								onChange={handleSelectDistrict}
								disabled={province ? false : true}
								placeholder="Vui lòng chọn Quận/ Huyện">
								{province &&
									sub.getDistrictsByProvinceCode(province).map((dis, i) => (
										<Option key={i} value={dis.code}>
											{dis.name}
										</Option>
									))}
							</Select>
						</Form.Item>
						<Form.Item label="Phường/ Xã" hasFeedback name={["user", "ward"]}
							 rules={[{ required: true, message: "Vui lòng chọn xã/phường" }]}>
							<Select
								allowClear
								id="ward"
								name="ward"
								disabled={district ? false : true}
								onChange={handleChangeWard}
								placeholder="Vui lòng chọn Xã/ Phường" >
								{district &&
									sub.getWardsByDistrictCode(district).map((ward, i) => (
										<Option key={i} value={ward.code}>
											{ward.name}
										</Option>
									))}
							</Select>
						</Form.Item>
						<Form.Item
							label="Số nhà/đường"
							hasFeedback
							name={["user", "address"]}
							rules={[{ required: true, message: "Vui lòng thêm địa chỉ" }]}>
							<Input
								className="form-control"
								type="text"
								placeholder="Nhập địa chỉ"
								name="address"
								// value={address}
								id="success"/>
						</Form.Item>
						<Form.Item >
							<Button className="profile_submit" type="primary" htmlType="submit">
								CẬP NHẬT
							</Button>
						</Form.Item>
					</div>
					
				</Form>
				}
				{
					changePass === true &&
				<Form
					{...layout}
					name="change_password"
					className="profile_form"
					scrollToFirstError>
					<div className="profile_img">
						
						<div className="avatar">
							<img src={"https://upload.wikimedia.org/wikipedia/commons/1/17/OK-button_-_Macro_photography_of_a_remote_control.jpg"} alt="avt"/>
						</div>
					</div>
					<div className="profile_text">
						<Form.Item
							name="oldpassword"
							label="Mật khẩu cũ"
							rules={[
							{
								required: true,
								message: 'Vui lòng nhập mật khẩu cũ',
							},
							]}>
							<Input />
						</Form.Item>
						<Form.Item
							name="password"
							label="Mật khẩu mới"
							rules={[
							{
								required: true,
								message: 'Vui lòng nhập mật khẩu mới',
							},
							]}
							hasFeedback>
							<Input.Password />
						</Form.Item>

						<Form.Item
							name="confirm"
							label="Xác nhận mật khẩu"
							dependencies={['password']}
							hasFeedback
							rules={[
							{
								required: true,
								message: 'Vui lòng xác nhận mật khẩu mới',
							},
							({ getFieldValue }) => ({
								validator(rule, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}

								return Promise.reject('Mật khẩu không trùng khớp, hãy thử lại !!!');
								},
							}),
							]}>
							<Input.Password />
						</Form.Item>
						<Form.Item >
							<Button className="profile_submit" type="primary" htmlType="submit">
									CẬP NHẬT
							</Button>
						</Form.Item>
					</div>
	  			</Form>
				}
				<div className={`profile_control ${changePass?'profile_toggle-active':''}`}>
					<button onClick={handleChangePass} className="profile_toggle" type="button">{changePass?"CHỈNH SỬA THÔNG TIN":"THAY ĐỔI MẬT KHẨU"}</button>
				</div>
			</div>
		</div>
	)
}
export default memo(Profile)
