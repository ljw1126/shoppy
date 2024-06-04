import React from "react";
import {useRouteError} from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <div className="relative h-screen flex flex-col justify-center items-center gap-8"
             id="error-page">
            <h1 className="text-3xl font-semibold">Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p className="text-gray-500">
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}
