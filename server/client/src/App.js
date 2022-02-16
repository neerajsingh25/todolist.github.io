import React, { createContext, useReducer } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Nav from "./Nav";
import Login from "./Login";
import Signup from "./Signup";
import Contact from "./Contact";
import ToDo from "./ToDo";
import Home from "./Home";
import Logout from "./Logout";
import { Routes, Route } from "react-router-dom";
import { initialState, reducer } from "./useReducer";

export const userContext = createContext();
const App = () => {
    const[state, dispatch] = useReducer(reducer, initialState);                        
    return (
        <>
            <userContext.Provider value={{state, dispatch}}>
                <Nav />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/todo" element={<ToDo />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route exact path="/contact" element={<Contact />} />
                    <Route exact path="/logout" element={<Logout />} />
                </Routes>
            </userContext.Provider>
        </>
    );
}

export default App;
