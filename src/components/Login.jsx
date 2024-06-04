// Import the functions you need from the SDKs you need
import {logout, login, onUserStateChange} from '../api/firebase'
import {useEffect, useState} from "react";
import User from "./User";

export default function Login() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onUserStateChange(setUser);
    }, []);

    return (<>
        {user && <User user={user}/>}
        {!user && <button onClick={login}>Login</button>}
        {user && <button onClick={logout}>Logout</button>}
    </>);
}
