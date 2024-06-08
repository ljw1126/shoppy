import React from "react";
import {AiOutlineMinusSquare, AiOutlinePlusSquare} from "react-icons/ai";
import {RiDeleteBin5Fill} from "react-icons/ri";
import useCarts from '../hooks/useCarts';

const ICON_CLASS = "transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1";
export default function CartItem({product: {image, option, price, quantity, title, totalPrice}, product}) {
    const {updateItem, removeItem} = useCarts();

    const handleMinus = () => {
        if (quantity < 2) return;

        const nextQuantity = quantity - 1;
        updateItem.mutate({product: {...product, quantity: nextQuantity, totalPrice: price * nextQuantity}});
    };

    const handlePlus = () => {
        const nextQuantity = quantity + 1;
        updateItem.mutate({product: {...product, quantity: nextQuantity, totalPrice: price * nextQuantity}});
    };

    const handleDelete = () => removeItem.mutate({product});


    return (
        <li className="flex justify-between my-2 items-center">
            <img className="w-24 md:w-48 rounded-lg" src={image} alt={title}/>
            <div className="flex flex-1 justify-between ml-4">
                <div className="basis-3/5">
                    <p className="text-lg font-medium">{title}</p>
                    <p className="my-1">
                        <span className="text-gray-400">옵션:</span>
                        <span className="font-bold text-brand text-xl ml-2">{option}</span>
                    </p>
                    <p className="my-1">
                        <span className="text-gray-400">가격:</span>
                        <span className="ml-2">{`₩${totalPrice.toLocaleString("ko-KR")}`}</span>
                    </p>
                </div>
                <div className="text-2xl flex items-center">
                    <AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus}/>
                    <span>{quantity}</span>
                    <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus}/>
                    <RiDeleteBin5Fill className={ICON_CLASS} onClick={handleDelete}/>
                </div>
            </div>
        </li>
    );
}
