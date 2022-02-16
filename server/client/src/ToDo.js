import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");

    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
}

const ToDo = () => {

    const history = useNavigate();
    const [mygetData, setMyGetData] = useState({});

    const callHome = async () => {
        try {
            const res = await fetch('/todo', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);
            setMyGetData(data);

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
        callHome();
    }, []);

    //this is for         todo list ...............................................................................

    const [input, setInput] = useState("");
    const [items, setItems] = useState(getLocalData());

    const addItem = () => {
        if (!input) {
            alert("please fill the data!");
        } else {
            const newInput = {
                id: new Date().getTime().toString(),
                name: input
            };
            setItems([...items, newInput]);
            setInput("");
        }
    }
    const deleteItem = (index) => {
        const udate = items.filter((curEle) => {
            return curEle.id !== index;
        });
        setItems(udate);
    }
    const deleteAll = () => {
        setItems([]);
    }

    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items])
    return (
        <>
            <div className=" main container">
                <div className="main-heading">
                    <h2>Welcome {mygetData.name}</h2>
                    <h3>Your ToDoList</h3>
                </div>
                <div className=" main-input container">
                    <div className="row">
                        <div className="col-11">
                            <input type="text" placeholder="type here"
                                value={input}
                                onChange={(event) => setInput(event.target.value)}
                            />
                        </div>

                        <div className=" plus col" >
                            <i className=" fa-solid fa-circle-plus"
                                onClick={addItem}
                            ></i>
                        </div>
                    </div>

                </div>
                <div className=" main-item container">
                    {items.map((curEle, index) => {
                        return (
                            <div className="row">
                                <div className=" item col-6" key={curEle.id}>
                                    <h4>{curEle.name}</h4>
                                </div>
                                <div className="col-6" >
                                    <i className="fa-solid fa-trash-can"
                                        onClick={() => deleteItem(curEle.id)}></i>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <input className="btn btn-primary" type="submit" value="Delete All"
                    onClick={deleteAll}
                ></input>
            </div>
        </>
    );
}

export default ToDo;