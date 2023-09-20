import React, { useState, useContext }from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {AuthContext} from "../functions/AuthContext"

function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setAuthState} = useContext(AuthContext);

    let navigate = useNavigate();

    const onLogin = () => {
        const data = {username: username, password: password}
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            } else{
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({username: response.data.username, id: response.data.id, status: true});
                navigate("/");
            }
        })

    };
    return (
        <div className="createElement">
            <div className="form">
                <label>Username:</label>
                <input
                    id="inputCreateElement"
                    type="text"
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                />
                <label>Hasło:</label>
                <input
                    id="inputCreateElement"
                    type="password"
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
                <button onClick={onLogin}>Zaloguj się</button>
            </div>
    </div>);
}

export default Login;