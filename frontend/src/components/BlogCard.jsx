import { Link } from "react-router-dom"
import { EditPost } from "./EditPost";
import { useState } from "react";
// import EditPost from "../components/EditPost"

export const BlogCard = ({
    userId,
    authorId,
    id,
    authorName,
    title,
    content,
    publishedDate
}) => {
    const [editBlog, setEditBlog] = useState(false);

    if (editBlog)
        return <EditPost user={userId} title={title} content={content} id={id} />

    const handleOnEdit = async () => {
        setEditBlog(true);
    }

    const handleOnDelete = async () => {
        // Logic for deleting the post goes here
        console.log(`Deleting post with id: ${id}`);
    }

    console.log(userId, authorId);

    return (
        <div className="flex justify-between items-center p-4 border-b border-slate-200 w-screen max-w-screen-lg">
            <Link to={`/post/${id}`} className="flex-1">
                <div className="pb-4">
                    <div className="flex items-center">
                        <div className="font-extralight pl-2">
                            {authorName}
                        </div>
                        <div className="pl-4 text-xs flex items-center">
                            &#9679;
                        </div>
                        <div className="pl-2 font-thin text-slate-400">
                            {publishedDate}
                        </div>
                    </div>
                    <div className="text-xl font-bold">{title}</div>
                    <div className="text-md font-thin">
                        {content.slice(0, 100) + "..."}
                    </div>
                    <div>
                        {`${Math.ceil(content.length / 100)} minutes`}
                    </div>
                </div>
            </Link>
            {userId === authorId && (
                <div className="flex space-x-2">
                    <svg
                        onClick={handleOnEdit}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    <svg
                        onClick={handleOnDelete}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 6h-15M10.5 6V4.5a1.5 1.5 0 1 1 3 0V6M5.25 6h13.5l-.867 12.264A2.25 2.25 0 0 1 15.643 21H8.357a2.25 2.25 0 0 1-2.24-2.736L5.25 6z" />
                    </svg>
                </div>
            )}
        </div>
    )
}
