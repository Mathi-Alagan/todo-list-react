import { useState } from "react";
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';

//destructured the props directly
export default function AddTask({ currentTask, showAddForm, addOrEditTask }) {
    const [task, setTask] = useState(
        currentTask !== null
            ? currentTask   //conditional rendering
            : {
                id: uuid(),
                taskName: '',
                taskDescription: '',
            }
    );

    function handleChange(event) {
        setTask(prevTask => ({
            ...prevTask,
            [event.target.name]: event.target.value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        showAddForm(false);
        addOrEditTask(task);
        setTask({
            id: uuid(),
            taskName: '',
            taskDescription: '',
        });
    }

    return (
        <div className="backdrop">
            <div className="add-task">
                <form action="#" className="task-form" onSubmit={handleSubmit}>
                    <label htmlFor="task-name">Task</label>
                    <input
                        type="text"
                        name="taskName"
                        id="task-name"
                        placeholder="Enter the Task name"
                        value={task.taskName}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="task-description">Description</label>
                    <textarea
                        name="taskDescription"
                        id="task-description"
                        cols="30"
                        rows="5"
                        placeholder="Optional"
                        value={task.taskDescription}
                        onChange={handleChange}
                    ></textarea>

                    <div className="btns">
                        <button type="submit">Add</button>
                        <button onClick={() => showAddForm(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

//add prop types validation
AddTask.propTypes = {
    currentTask: PropTypes.object,
    showAddForm: PropTypes.func.isRequired,
    addOrEditTask: PropTypes.func.isRequired,
};
