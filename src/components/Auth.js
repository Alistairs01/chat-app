import { useState } from "react";
import { signInWithPopup} from "firebase/auth";
import { auth, provider} from "../config/firebase.js";
import Cookies from "universal-cookie";

const cookies = new Cookies();


export const Auth = (props) => {
    const {setIsAuth} = props;
  
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="auth">
            <h1>Sign in with Google</h1>
            <button onClick={signInWithGoogle}>Sign in with Google to continue</button>
        </div>
    );
};