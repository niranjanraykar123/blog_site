import React, { useState } from 'react';

const Comments = ({ comments, onEditComment, onDeleteComment, user }) => {
    const [editCommentId, setEditCommentId] = useState(null);
    const [editedContent, setEditedContent] = useState('');

    const handleEditClick = (comment) => {
        setEditCommentId(comment._id);
        setEditedContent(comment.content);
    };

    const handleSaveClick = (commentId) => {
        onEditComment(commentId, editedContent);
        setEditCommentId(null);
        setEditedContent('');
    };

    if (!comments || comments.length === 0) {
        return <div className="p-4 text-gray-500">No comments yet. Be the first to comment!</div>;
    }

    return (
        <div className="p-4 space-y-4">
            {comments.map((comment) => (
                <div key={comment._id} className="comment bg-white shadow p-4 rounded-lg">
                    {editCommentId === comment._id ? (
                        <div className="space-y-2">
                            <input
                                type="text"
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleSaveClick(comment._id)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditCommentId(null)}
                                    className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <p>
                                <strong className="text-gray-700">{comment.author?.name || 'Anonymous'}</strong>: {comment.content}
                            </p>
                        </div>
                    )}
                    {user?._id === comment.author?._id && (
                        <div className="flex space-x-2 mt-2">
                            <button
                                onClick={() => handleEditClick(comment)}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDeleteComment(comment._id)}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Comments;
