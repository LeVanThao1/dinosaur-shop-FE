import React, { createElement, memo, useState } from "react";
import PropTypes from "prop-types";
import CommentCart from "../CommentCard";
import FormInput from "../FormInput";
import { useParams } from "react-router-dom";
import "./index.scss";
import { Comment, Tooltip } from "antd";
import {
	DislikeOutlined,
	LikeOutlined,
	DislikeFilled,
	LikeFilled,
} from "@ant-design/icons";

CommentItem.propTypes = {};

function CommentItem({ socket, comment }) {
	const [reply, setReply] = useState(false);
	const [name, setName] = useState("");
	const { id } = useParams();
	// const [replyComment, setReplyComment] = useState([])
	const [hideReplyComment, setHideReplyComment] = useState([]);
	const [next, setNext] = useState(3);
	const loadMore = () => {
		setNext(next + 3);
	};
	const [likes, setLikes] = useState(0);
	const [dislikes, setDislikes] = useState(0);
	const [action, setAction] = useState(null);

	const like = () => {
		setLikes(1);
		setDislikes(0);
		setAction("liked");
	};

	const dislike = () => {
		setLikes(0);
		setDislikes(1);
		setAction("disliked");
	};

	const handleReply = (username) => {
		setReply(true);
		setName(username);
	};

	const hideReply = () => {
		setReply(false);
		setNext(3);
	};
	return (
		<>
			<CommentCart comment={comment} className="btn_reply_hide">
				<div className="nav_comment">
					{/* {actions} */}
					<div className="like">
						<LikeOutlined onClick={like} />
						{likes}
					</div>
					<div className="dislike">
						<DislikeOutlined onClick={dislike} />
						{dislikes}
					</div>
					<p
						onClick={() => handleReply(comment.userId.name)}
						style={{ cursor: "pointer" }}
					>
						Reply
					</p>
					{hideReplyComment > 0 && (
						<p onClick={loadMore}>
							Load more {hideReplyComment} comments
						</p>
					)}

					<p onClick={hideReply}>Hide Reply</p>
				</div>
				<div className="reply_comment">
					{comment.reply.map((rep) => (
						<CommentCart comment={rep} key={rep._id}>
							<div className="nav_comment">
								<p onClick={() => handleReply(rep.username)}>
									Reply
								</p>
							</div>
						</CommentCart>
					))}
				</div>
				{reply && (
					<FormInput
						id={comment._id}
						productId={id}
						socket={socket}
						name={name}
						setReply={setReply}
						send="replyComment"
					/>
				)}
			</CommentCart>
		</>
	);
}

export default memo(CommentItem);
