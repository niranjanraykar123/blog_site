import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comments from './Comments';

export const FullBlogs = ({ blog, user }) => {
    const [comments, setComments] = useState([]);
    const [addComment, setAddComment] = useState('');

    const getComments = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/comments/${blog._id}`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        getComments();
    }, [blog._id]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/comments/${blog._id}`, {
                content: addComment,
                id: user._id
            });
            if (response.data) getComments();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleEditComment = async (commentId, newContent) => {
        try {
            console.log(commentId, newContent);
            const response = await axios.put(`http://localhost:3000/comments/${commentId}`, {
                content: newContent
            });
            if (response.data) getComments();
        } catch (error) {
            console.error('Error editing comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/comments/${commentId}`);
            if (response.data) getComments();
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <div>
            <div className="flex justify-center">
                <div className='grid grid-cols-12 px-10 w-full pt-200'>
                    <div className='col-span-8'>
                        <div className='text-2xl font-extrabold'>
                            {blog.title}
                        </div>
                        <div className='text-slate-500 pt-2'>
                            Post On {new Date(blog.createdAt).toLocaleDateString()}
                        </div>
                        <div className='pt-4'>
                            {blog.content}
                        </div>
                    </div>
                    <div className='col-span-4'>
                        <div className="text-slate-600">
                            Author
                        </div>
                        <div className="flex">
                            <div>
                                <div className='text-xl font-bold'>
                                    {blog.author?.name || "Anonymous"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pl-10 p-4'>
                <h3 className="text-2xl font-extrabold mt-10">Comments</h3>
                {user && <div className='flex justify-around'>
                    <div className='w-full'>
                        <input
                            type="text"
                            id="first_name"
                            onChange={(e) => { setAddComment(e.target.value) }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Comment"
                            required
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleAddComment}
                        className="ml-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Post
                    </button>
                </div>}
                <div className='m-4 w-screen bg-gray-500 h-1'></div>
                <Comments
                    comments={comments}
                    onEditComment={handleEditComment}
                    onDeleteComment={handleDeleteComment}
                    user={user}
                />
            </div>
        </div>
    );
};
