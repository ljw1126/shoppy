import React from "react";

export default function Banner() {
    return (
        <section className="h-96 bg-yellow-900 relative mx-4 my-2">
            <div className="w-full h-full bg-cover bg-banner opacity-80"></div>
            <div className="absolute w-full top-32 text-center text-gray-50 drop-shadow-2xl">
                <h2 className="text-5xl my-2">Shop With US</h2>
                <p className="text-xl">Best Products, High Quality</p>
            </div>
        </section>
    );
}
