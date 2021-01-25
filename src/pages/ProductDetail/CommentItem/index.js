import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../../../axios";
import { setLike } from "../../../slice/productdetail.slice";
import { notifiError } from "../../../utils/notification";
import CommentCart from "../CommentCard";
import "./index.scss";
CommentItem.propTypes = {};

function CommentItem({ socket, comment }) {
	const token = useSelector((state) => state.token);
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const like = async () => {
		try {
			if (comment.like.includes(user._id)) return;
			await API(`api/comments/like/${comment._id}`, "PUT", token);
			const like = comment.like
				? [...comment.like, user._id]
				: [user._id];
			const disLike = comment.disLike
				? [...comment.like.filter((id) => id !== user._id)]
				: [];
			dispatch(setLike({ id: comment._id, like, disLike }));
		} catch (err) {
			console.log(err);
			notifiError(err?.response?.data?.msg || "Have error");
		}
	};

	const disLike = async () => {
		try {
			if (comment.disLike.includes(user._id)) return;
			await API(`api/comments/dislike/${comment._id}`, "PUT", token);
			const disLike = comment.disLike
				? [...comment.disLike, user._id]
				: [user._id];
			const like = comment.like
				? [...comment.like.filter((id) => id !== user._id)]
				: [];
			dispatch(setLike({ id: comment._id, like, disLike }));
		} catch (err) {
			console.log(err);
			notifiError(err?.response?.data?.msg || "Have error");
		}
	};
	return (
		<>
			<CommentCart comment={comment} className="btn_reply_hide">
				<div className="nav_comment">
					<div className="like">
						<LikeOutlined onClick={like} />
						{` ${comment?.like?.length | 0}`}
					</div>
					<div className="dislike">
						<DislikeOutlined onClick={disLike} />
						{` ${comment?.disLike?.length | 0}`}
					</div>
				</div>
			</CommentCart>
		</>
	);
}

export default memo(CommentItem);
