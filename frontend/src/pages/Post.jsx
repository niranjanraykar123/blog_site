import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { FullBlogs } from "../components/FullBlog";
import Comments from "../components/Comments";

export const Post = ({ user }) => {
    const { id } = useParams();
    console.log(id)
    const [blog, setBlog] = useState([]);
    const getBlog = async () => {
        const blog = await axios.get(`http://localhost:3000/posts/${id}`);
        console.log(blog.data);
        setBlog(blog.data)
    }



    useEffect(() => {
        getBlog();
    }, [])
    return <div>
        <FullBlogs user={user} blog={blog} />
        {/* <Comments comments={blog.comments} /> */}
    </div>



}