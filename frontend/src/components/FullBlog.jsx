

// import Blog from '../hooks/index'

export const FullBlogs = ({ blog }) => {
    return (
        <div >

            <div className="flex justify-center">
                <div className='grid grid-cols-12 px-10 w-full  pt-200'>
                    <div className='col-span-8 '>
                        <div className='text-2xl font-extrabold'>
                            {blog.title}
                        </div>
                        <div className='text-slate-500 pt-2'>
                            Post On 2nd Jan 2024
                        </div>
                        <div className='pt-4'>
                            {blog.content}
                        </div>
                    </div>
                    <div className='col-span-4 '>
                        <div className="text-slate-600">

                            Author
                        </div>
                        <div className="flex">

                            <div >
                                <div className='text-xl font-bold'>
                                    {blog.author?.name || "Anonymous"}
                                </div>
                                <div className='pt-2 text-slate-500'>
                                    Random catch pharse about the author's ability to grab the user's attention.
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

