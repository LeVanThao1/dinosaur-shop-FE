import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function FormInput({ id, socket, send, name, setReply, productId }) {
	// const nameRef = useRef();
	const contentRef = useRef();
	const auth = useSelector((state) => state.auth);
	const history = useHistory();

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

	const commentSubmit = () => {
		if (!auth.isLogged) {
			return history.push("/login");
		}
		// const username = nameRef.current.value;
		const content = contentRef.current.innerHTML;
		// if (!username.trim()) return alert("Not Empty!");

		socket.emit("createComment", {
			userId: auth.user._id,
			username: auth.user?.name,
			content,
			productId: productId,
			send,
			id: id,
		});

		// if (rating && rating !== 0) {
		// 	patchData(`/api/products/${id}`, { rating });
		// }

		contentRef.current.innerHTML = "";

		if (setReply) setReply(false);
	};

	return (
		<div className="rep_comment">
			<label>
				{auth.isLogged ? auth.user.name : "Người dùng ẩn danh"}
			</label>
			<div
				ref={contentRef}
				contentEditable="true"
				style={{
					height: "100px",
					border: "1px solid #ccc",
					padding: "5px 10px",
					outline: "none",
				}}
			/>
			<button
				onClick={commentSubmit}
				style={{
					backgroundColor: "rgb(32, 120, 244)",
					padding: 5,
					width: 120,
					margin: "1%",
				}}
			>
				Send
			</button>
		</div>
	);
}

export default FormInput;
