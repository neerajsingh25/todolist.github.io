import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {

    const history = useNavigate();
    const [getData, setGetData] = useState({
        name: "", email: "", message: ""
    });

    const callData = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            //console.log(data);
            setGetData({ ...getData, name: data.name, email: data.email });

            if (!res.json === 201) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (error) {
            console.log(error);
            history('/login');
        }
    }
    useEffect(() => {
        callData();
    }, []);

    //message data storing to mongodb

    let name, value;

    const handleInputs = (e) => {
        //console.log(e);
        name = e.target.name;
        value = e.target.value;

        setGetData({ ...getData, [name]: value })
    };

    const postData = async (e) => {
        e.preventDefault();
        const { name, email, message } = getData;

        const res = await fetch("/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, message
            })
        });

        const data = await res.json();
        if (res.status === 422 || !data) {
            window.alert("failed to send message!!!!!");

        } else {
            window.alert("message sent successful");
            setGetData({...getData, message:""});
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
                                    value={getData.name}
                                    onChange={handleInputs}
                                />
                                <label htmlFor="floatingInput">Name</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="email" name="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                                    value={getData.email}
                                    onChange={handleInputs}
                                />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Write Something</label>
                                <textarea name="message" className="form-control" id="exampleFormControlTextarea1" rows="3"
                                    value={getData.message}
                                    onChange={handleInputs}
                                ></textarea>
                            </div>

                            <div className="d-grid gap-2 mt-3">
                                <button className="btn btn-primary" type="button"
                                    onClick={postData}
                                >Send</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Contact;