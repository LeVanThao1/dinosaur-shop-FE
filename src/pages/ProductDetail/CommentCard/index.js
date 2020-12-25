import React from "react";
import PropTypes from "prop-types";

const CommentCart = ({ children, comment }) => {
	return (
		<div className="comment list-group-item">
			<div className="comment_content">
				<label>{comment.userId.name || comment.username}</label>
				<p dangerouslySetInnerHTML={{ __html: comment.content }}></p>
			</div>
			{children}
		</div>
	);
};

CommentCart.propTypes = {};

export default CommentCart;
