import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from '../api/axios';


const Navbar = ({ user, setUser }) => {
    // const [user, setUser] = useState(null);

    const googleAuth = () => {
        window.open(
            `http://localhost:3000/auth/google`,
            "_self"
        );
    };
    const getUser = async () => {
        const user = await axios.get('/auth/current_user');
        console.log(user)
        if (user)
            setUser(user.data)
    }

    const logout = async () => {
        await axios.post('/auth/logout');
        setUser(null);
    };

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const response = await axios.get('/auth/current_user');
                if (response.data.err)
                    setUser(null);
                else setUser(response.data);
            } catch {
                setUser(null);
            }
        };
        fetchUser();
    }, []);

    return (
        <nav>
            <div className="border-b
    flex justify-between px-10 py-4 cursor-pointer">
                <Link to={'/'}>
                    <div className="font-bold flex justify-center">BLOG SITE</div>
                </Link>
                <div className='text-xl font-semibold'>
                    {user && (user.name)}
                </div>
                <div className="">
                    {user && <Link to={'/'}>
                        <button type="button" onClick={logout} className=" mr-4 focus:outline-none text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Log Out</button>
                    </Link>}
                    {!user && <Link to={'/'}>
                        <button type="button" onClick={googleAuth} className=" mr-4 focus:outline-none text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Log in</button>
                    </Link>}

                    <Link to={'/publish'}>
                        <button type="button" className=" mr-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Pulblish</button>
                    </Link>


                </div>
            </div>
            {/* <Link to="/">Home</Link>
            {user ? (
                <>
                    <span>{user.name}</span>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <button onClick={googleAuth}>Login with Google</button>
            )} */}
        </nav>
    );
};

export default Navbar;


