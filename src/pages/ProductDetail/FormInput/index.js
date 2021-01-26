import { Input, Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import API from "../../../axios";
import { notifiError, notifiSuccess } from "../../../utils/notification";

const { TextArea } = Input;
function FormInput({ id, socket, send, name, productId }) {
	const contentRef = useRef();
	const auth = useSelector((state) => state.auth);
	const history = useHistory();
	const [value, setValue] = useState("");
	const token = useSelector((state) => state.token);

	const commentSubmit = async () => {
		if (!auth.isLogged) {
			return notifiError("Vui lòng đăng nhập để bình luận sản phẩm");
		}
		try {
			await API("api/comments", "POST", token, {
				content: value,
				productId: productId,
			});

			setValue("");
			notifiSuccess("Vui lòng đợi hệ thống phê duyệt");
		} catch (err) {
			notifiError("Have Error");
		}
	};

	return (
		<div className="rep_comment">
			<TextArea
				placeholder="Nhập nội dung bình luận"
				allowClear
				onChange={(e) => {
					setValue(e.target.value);
				}}
				onPressEnter={commentSubmit}
				value={value}
			/>
			<div style={{ margin: "15px 0px" }}>
				<Button
					onClick={commentSubmit}
					style={{
						backgroundColor: "#f15e2c",
						color: "#fff",
					}}
				>
					Nhận xét
				</Button>
			</div>
		</div>
	);
}

export default FormInput;
