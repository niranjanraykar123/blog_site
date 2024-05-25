import { Link } from "react-router-dom"



export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}) => {
    return (<Link to={`/post/${id}`}>

        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-lg ">
            <div className="flex">

                <div className="flex justify-center flex-col">
                </div>
                {/* <div>{authorName} . {publishedDate}</div> */}
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
            {/* <circle /> */}
            <div className="text-xl font-bold">{title}</div>
            <div className="text-md font-semibold font-thin">
                {content.slice(0, 100) + "..."}
            </div>
            <div>
                {`${Math.ceil(content.length / 100)} minutes`}
            </div>
            {/* </div> */}

            <div className="bg-slate-200 h-1 w-full"> </div>
        </div >
    </Link>

    )
}

// function circle() {
//     return <div className="h-1 w-1 rounded-full">
//         .
//     </div>
// }

