// src/components/PostList.jsx
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { BlogCard } from '../components/BlogCard';


const PostList = ({ user, setUser }) => {
    const [posts, setPosts] = useState([]);

    setTimeout(() => {
        // location.reload();

    });
    useEffect(() => {
        const reloadOnce = localStorage.getItem('reloadOnce');
        if (!reloadOnce) {
            localStorage.setItem('reloadOnce', 'true');
            location.reload();
        }

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
        <div className="flex ml-40">

            {/* {posts[0]} */}
            <div className="max-w-xl">
                {posts.length > 0 && posts.map(blog => <BlogCard userId={user?._id} authorId={blog.author._id} id={blog._id} key={blog._id} authorName={blog.author.name}
                    publishedDate={blog.createdAt.toString().substring(0, 10)}

                    title={blog.title}
                    content={blog.content} />
                )}
            </div>
        </div>
    );
};

export default PostList;
