import React, {useState, useEffect} from "react";
import {authMethods} from "../firebase/authMethods";


export const firebaseAuth = React.createContext();

const AuthProvider = (props) => {
    const initState = {email: "", password: ""};
    const [inputs, setInputs] = useState(initState);
    const [errors, setErrors] = useState([]);
    const [token, setToken] = useState(null);

    const handleSingUp = () => {
        console.log("handleSingUp");
        console.log(inputs);
        authMethods.singup(inputs.email, inputs.password, setToken, setErrors);
        console.log(errors, token)
    }

    const handleSingIn = () => {
        console.log("handleSingIn");
        console.log(inputs);
        authMethods.singin(inputs.email, inputs.password, setToken, setErrors);
        console.log(errors, token)
    }

    return (
        <firebaseAuth.Provider
            value={{
                test: "context is working",
                handleSingUp,
                handleSingIn,
                inputs,
                setInputs
            }}>
            {props.children}
        </firebaseAuth.Provider>
    )
}
export default AuthProvider;