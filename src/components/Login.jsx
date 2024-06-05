import React from "react";
import User from "./User";
import {useAuthContext} from "../context/AuthContext";
import Button from "./ui/Button";

export default function Login() {
    const {user, login, logout} = useAuthContext();

    return (<>
        {user && <User user={user}/>}
        {!user && <Button onClick={login} text={'Login'}/>}
        {user && <Button onClick={logout} text={'Logout'}/>}
    </>);
}
