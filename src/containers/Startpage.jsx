import React from "react";
import addImg from "../assets/Addimg.png"

export default function Startpage(props) {
    return (
        <div className="start-page">
            <button onClick={() => props.showAddForm(true)}>
                <img src={addImg} alt="Add task" />
            </button>
            <h1>Achieve your goals. Do some tasks!</h1>
        </div>
    )
}