import React from "react";
import Nav from "../components/Nav.jsx";

function Generate(){

    return(
        <>
        <Nav />
        <div className="melody-generator">
            <form className="melody-form">
            <h1 className="melody-title">Write a prompt and get a melody</h1>
            <textarea
                id="prompt"
                name="prompt"
                className="melody-input"
                placeholder="Write your melody prompt here..."
                required
                style={{ 
                resize: 'vertical',
                minHeight: '120px',
                maxHeight: '400px'
            }}
            />
            <button type="submit" className="melody-submit">Submit</button>
            </form>
        </div>
        </>
    );

}

export default Generate;