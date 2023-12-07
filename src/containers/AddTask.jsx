import React from "react";
import {v4 as uuid} from 'uuid';

export default function AddTask(props) {


    // initializing the new task or the task to be edited
    const [task, setTask] = React.useState(
        
        (props.currentTask !=null) ? 
        
        props.currentTask :        
        
        {
        id: uuid(),
        taskName: '',
        taskDescription: '',
        }
)



    //updates task state

    function newTask(event) {
        setTask(prevTask => {
            return {
                ...prevTask,
                [event.target.name]: event.target.value
            }
            })
        
        console.log(task)
    }

    
    //send the newly updated task to the App component, and re-initializing the task state

    function pushTask(event) {
        
        event.preventDefault()

        props.showAddForm(false)

        props.addOrEditTask(task)

        setTask({
            id: '',
            taskName: '',
            taskDescription: '',
            isChecked: false
          })
    }


    return (
        <div className=" backdrop ">
            <div className="add-task">
                <form action="#" className="task-form" onSubmit={(e)=>pushTask(e)}>
                    <label htmlFor="task-name">Task</label>
                    <input 
                        type="text" 
                        name="taskName" 
                        id="task-name" 
                        placeholder="Enter the Task name"
                        value={task.taskName}
                        onChange={(event) => newTask(event)}
                        required/>

                    <label htmlFor="task-name">Description</label>
                    <textarea 
                        name="taskDescription" 
                        id="task-description" 
                        cols="30" 
                        rows="5" 
                        placeholder="Optional"
                        value={task.taskDescription}
                        onChange={(event) => newTask(event)}></textarea>

                    <div className="btns">
                        <button type="submit">Add</button>
                        <button onClick={()=>props.showAddForm(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>

    )
}