import React from 'react';

const Comments = ({ comments }) => {
    if (!comments || comments.length === 0) {
        return <div>No comments yet. Be the first to comment!</div>;
    }

    return (
        <div>
            {comments.map((comment, index) => (
                <div key={index} className="comment">
                    <p><strong>{comment.author.name}</strong>: {comment.content}</p>
                </div>
            ))}
        </div>
    );
};

export default Comments;
