import React, { memo } from "react";
import PropTypes from "prop-types";
import "./index.scss";

const CommentCart = ({ children, comment }) => {
	return (
		<div className="comment list-group-item1">
			<div className="container-comment-item">
				<img
					src={comment.userId.avatar}
					alt="ảnh đại diện"
					className="avatar-comment"
				/>
			</div>
			<>
				<div className="comment_content">
					<label>{comment.userId.name || comment.username}</label>
					<p
						dangerouslySetInnerHTML={{ __html: comment.content }}
					></p>

					{children}
				</div>
			</>
		</div>
	);
};

CommentCart.propTypes = {};

export default memo(CommentCart);
