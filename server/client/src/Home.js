import React, { useState, useEffect } from "react";
import "./style.css";

const Home = () => {

    const [mygetData, setMyGetData] = useState({});
    const [show, setShow] = useState(false);

    const callHome = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            console.log(data);
            setMyGetData(data);
            setShow(true);

            if (!res.json === 201) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        callHome();
    }, []);

    return (
        <>
            <div className="mainhome">
                <div className=" home container">
                    <h1>Welcome</h1>
                    <h1>{mygetData.name}</h1>
                    <h2>{show ? 'We are happy to see you back' : 'This is Home page of our Website'}</h2>
                    <h3>{show ? 'Do check your todo list' : 'To access your todo list , Please login first'}</h3>
                </div>
            </div>
        </>
    );
}
export default Home;