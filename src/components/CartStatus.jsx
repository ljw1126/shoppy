import React from "react";
import {GiShoppingCart} from "react-icons/gi";
import useCarts from '../hooks/useCarts';

export default function CartStatus() {
    const {cartsQuery: {data: products}} = useCarts();
    
    return <div className="relative">
        <GiShoppingCart className="text-3xl"/>
        {products && (
            <span className="absolute -top-1 -right-2 border w-6 h-6 bg-brand rounded-full font-bold text-center text-white">
                {Object.keys(products).length}
            </span>
        )}
    </div>;
}
