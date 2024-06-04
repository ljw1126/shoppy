import React from "react";
import {Link} from "react-router-dom";
import {BsPencil} from "react-icons/bs";
import {FiShoppingBag} from "react-icons/fi";

export default function Navbar() {
    return (
        <header className="w-full flex justify-between border-b border-grey-300 p-2">
            <Link to='/' className="flex items-center text-4xl text-brand">
                <FiShoppingBag/>
                <h1 className="font-bold ml-2 text-3l">Shoppy</h1>
            </Link>

            <nav className="flex items-center gap-4 font-semibold">
                <Link to='/products'>Products</Link>
                <Link to='/carts'>Carts</Link>
                <Link to='/products/new' className="text-2xl"><BsPencil/></Link>
                <Link to='/'>Login</Link>
            </nav>
        </header>
    );
}
