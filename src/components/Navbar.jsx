import React from "react";
import {Link} from "react-router-dom";
import {BsPencil} from "react-icons/bs";
import {FiShoppingBag} from "react-icons/fi";
import User from "./User";
import Button from "./ui/Button";
import {useAuthContext} from "../context/AuthContext";
import Login from "./Login";

export default function Navbar() {
    const {user} = useAuthContext();

    return (
        <header className="w-full flex justify-between border-b border-grey-300 p-2">
            <Link to='/' className="flex items-center text-4xl text-brand">
                <FiShoppingBag/>
                <h1 className="font-bold ml-2 text-3l">Shoppy</h1>
            </Link>

            <nav className="flex items-center gap-4 font-semibold">
                <Link to='/products'>Products</Link>
                {user && <Link to='/carts'>Carts</Link>}
                {
                    user && user.isAdmin && (
                        <Link to='/products/new' className="text-2xl"><BsPencil/></Link>
                    )
                }

                <Login/>
            </nav>
        </header>
    );
}
