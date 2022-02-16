import React, { useState , useContext} from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "./App";

const Login = () => {

    const {state, dispatch} = useContext(userContext);

    const history = useNavigate();

    const [user, setUser] = useState({
        email: "", password: ""
    });

    let name, value;

    const handleInputs = (e) => {
        //console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value })
    };

    const postData = async (e) => {
        e.preventDefault();
        const {  email, password } = user;

        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                 email, password
            })
        });

        const data = await res.json();
        if (res.status === 422 || !data) {
            window.alert("login failed!!!!!");
   
        } else {
            dispatch({type:"user", payload: true})
            window.alert("login successful");
            history('/');
        }
    }


    return (
        <>
            <div className="container">
                <div className="row" >
                    <div className="col align-self-center ">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    value={user.email}
                                    onChange={handleInputs}
                                />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" name="password" className="form-control" id="exampleInputPassword1"
                                    value={user.password}
                                    onChange={handleInputs}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary "
                                onClick={postData}
                            >Login Now</button>
                        </form>
                    </div>
                </div>
            </div>


        </>
    );
}
export default Login;