import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); 
    const navigate = useNavigate();

    useEffect(() => {
        if (store.token && store.token !== "" && store.token !== undefined) {
            console.log("Token exists, navigating to /");
            navigate("/");
        }
    }, [store.token]);

    const handleClick = async () => {
        const success = await actions.login(email, password);
        if (!success) setErrorMessage("Error logging in");
    };

    return (
        <div className="login-container">
            <div className="main-content">
                <h2>Sign In</h2>
                {store.token && store.token !== "" && store.token !== undefined ? (
                    "You are logged in with this token " + store.token
                ) : (
                    <>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                name="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button onClick={handleClick} type="button" className="btn btn-primary">
                            Login
                        </button>

                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </>
                )}
            </div>
        </div>
    );
};
