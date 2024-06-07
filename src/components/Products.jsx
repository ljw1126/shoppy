import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getProducts} from "../api/database";
import ProductCard from "./ProductCard";

export default function Products() {
    const {isLoading, error, data: products} = useQuery({
        queryKey: ['products'],
        queryFn: () => getProducts()
    });

    console.log("확인용=============")
    console.log(products);

    return <>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {products && (
            <ul className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4">
                {
                    products.map(product => <ProductCard key={product.id} product={product}/>)
                }
            </ul>
        )}
    </>;
}
