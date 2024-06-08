import React from "react";
import CartItem from "../components/CartItem";
import {BsFillPlusCircleFill} from "react-icons/bs";
import {FaEquals} from "react-icons/fa";
import PriceCard from "../components/PriceCard";
import Button from "../components/ui/Button";
import useCarts from '../hooks/useCarts';

const SHIPPING = 3000;
export default function MyCart() {
    const {cartsQuery : {isLoading, data: products}} = useCarts();

    if (isLoading) return <p>Loading...</p>;

    const hasProducts = products && Object.keys(products).length > 0;
    const totalPrice = hasProducts && Object.values(products)
        .reduce((prev, current) => prev + parseInt(current.price) * current.quantity, 0);

    return (<div className="p-8 flex flex-col">
        <h1 className="text-2xl border-b border-b-gray-300 pb-4">장바구니</h1>
        {!hasProducts && (
            <p className="font-bold text-xl my-4">장바구니에 담은 상품이 없습니다.</p>
        )}
        {hasProducts && (
            <>
                <ul className="border-b border-gray-300 mb-8 p-4 px-8">
                    {Object.keys(products).map(key => <CartItem key={key} itemKey={key} product={products[key]}/>)}
                </ul>
                <div className="flex justify-between items-center mb-6 px-2 md:px-8 lg:px-16">
                    <PriceCard text={"상품 총액"} price={totalPrice}/>
                    <BsFillPlusCircleFill className="shrink-0"/>
                    <PriceCard text={"배송액"} price={SHIPPING}/>
                    <FaEquals className="shrink-0"/>
                    <PriceCard text={"총 가격"} price={totalPrice + SHIPPING}/>
                </div>
                <Button text="주문하기"/>
            </>
        )}
    </div>);
}
