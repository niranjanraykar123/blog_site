// src/components/PostList.jsx
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { BlogCard } from '../components/BlogCard';


const PostList = ({ user, setUser }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            const user = await axios.get('/auth/current_user');
            // console.log(user.data.err)
            if (user.data.err)
                setUser(null)
            else if (user.data)
                setUser(user.data)
        }
        getUser();

        const fetchPosts = async () => {
            const response = await axios.get('/posts');
            setPosts(response.data);
        };
        fetchPosts();
        console.log(posts);

    }, []);

    return (
        <div className="flex justify-center">

            <div className="max-w-xl">


                {posts.length > 0 && posts.map(blog => <BlogCard id={blog._id} key={blog._id} authorName={blog.author.name}
                    publishedDate={blog.createdAt}
                    title={blog.title}
                    content={blog.content} />

                )}
            </div>
        </div>
    );
};

export default PostList;