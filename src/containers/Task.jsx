import React from "react";

export default function Task({
                                task, 
                                findCurrentTask, 
                                showAddForm, 
                                deleteTask, 
                                addCompletedTask, 
                                isChecked }){


    return (
            <div className="tasks-list">
                <i 
                    className={`fa-solid fa-check-to-slot ${ isChecked? 'checked':'unchecked' }`}
                    onClick={() => addCompletedTask(task, isChecked)}
                                     
                ></i>
                <div>
                    <p className={`task-name ${ isChecked? 'striken': ''}` }>{task.taskName}</p>
                    <p className="task-desc">{task.taskDescription}</p>
                </div>
                <i 
                    className="fa-solid fa-pen-to-square edit"
                    onClick={() => {
                                    showAddForm(true)
                                    findCurrentTask(task.id)}}
                ></i>
                <i 
                    className="fa-solid fa-trash delete"
                    onClick={() => deleteTask(task, isChecked)}
                ></i>
            </div>          
        )
    
}