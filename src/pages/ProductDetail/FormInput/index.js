import { Input, Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import API from "../../../axios";
import { notifiError, notifiSuccess } from "../../../utils/notification";

const { TextArea } = Input;
function FormInput({ id, socket, send, name, productId }) {
	// const nameRef = useRef();
	const contentRef = useRef();
	const auth = useSelector((state) => state.auth);
	const history = useHistory();
	const [value, setValue] = useState("");
	const token = useSelector((state) => state.token);
	useEffect(() => {
		if (name) {
			contentRef.current.innerHTML = `
                <a href="#!"
                    style="color: crimson;
                    font-weight: 600;
                    text-transform: capitalize;"
                >${name} : </a>
            `;
		}
	}, [name]);

	const commentSubmit = async () => {
		if (!auth.isLogged) {
			return history.push("/login");
		}
		// const username = nameRef.current.value;
		// if (!username.trim()) return alert("Not Empty!");

		// socket.emit("createComment", {
		// 	userId: auth.user._id,
		// 	content: value,
		// 	productId: productId,
		// 	send,
		// 	id: id,
		// });
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
		// if (rating && rating !== 0) {
		// 	patchData(`/api/products/${id}`, { rating });
		// }
	};

	return (
		<div className="rep_comment">
			{/* <label>
				{auth.isLogged ? auth.user.name : "Người dùng ẩn danh"}
			</label> */}
			{/* <div
				ref={contentRef}
				contentEditable="true"
				style={{
					height: "100px",
					border: "1px solid #ccc",
					padding: "5px 10px",
					outline: "none",
				}}
			/> */}
			<TextArea
				placeholder="Nhập nội dung bình luận"
				allowClear
				onChange={(e) => {
					console.log(e.target.value);
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
