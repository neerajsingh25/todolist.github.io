import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const history = useNavigate();

    const [user, setUser] = useState({
        name:"", email:"", password:""
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
        const { name, email, password } = user;

        const res = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password
            })
        });

        const data = await res.json();
        if (res.status === 422 || !data) {
            window.alert("Registration failed");
            console.log("Registration failed");
        } else {
            window.alert("Registration successful");
            console.log("Registration successful");

            history('/login');
        }
    }

    return (
        <>
            <div className="container">
                <div className="row" >
                    <div className="col align-self-center ">
                        <form method="POST">
                            <div className="form-floating mb-3">
                                <input type="text" name="name" className="form-control" id="floatingInput" placeholder="name"
                                    value={user.name}
                                    onChange={handleInputs}
                                />
                                <label htmlFor="floatingInput">Name</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="email" name="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                                    value={user.email}
                                    onChange={handleInputs}
                                />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>

                            <div className="form-floating">
                                <input type="password" name="password" className="form-control" id="floatingPassword" placeholder="Password"
                                    value={user.password}
                                    onChange={handleInputs}
                                />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>

                            <div className="d-grid gap-2 mt-3">
                                <button className="btn btn-primary" type="button"
                                    onClick={postData}
                                >Signup Now</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Signup;