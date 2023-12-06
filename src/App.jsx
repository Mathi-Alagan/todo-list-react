import React from "react"
import Header from "./containers/Header"
import Startpage from "./containers/Startpage"
import AddTask from "./containers/AddTask"
import Task from "./containers/Task";

function App() {

  // states
  const [tasks, setTasks] = React.useState([])
  const [currentTask, setCurrentTask] = React.useState()
  const [completedTasks, setCompletedTasks] = React.useState([])
  const [toAdd, setToAdd] = React.useState(false)//to display the form or not


  //setting initial value for task list and completed task list

  React.useEffect(()=>{

    const tasksList = JSON.parse(localStorage.getItem("tasks"))
    const completedTasksList = JSON.parse(localStorage.getItem("completed-tasks"))


    if(tasksList === null){
      localStorage.setItem("tasks", JSON.stringify([]))
    }
    else {
      setTasks(tasksList)
    }


    if(completedTasksList === null){
      localStorage.setItem("completed-tasks", JSON.stringify([]))
    }
    else {
      setCompletedTasks(completedTasksList)
    }
    
  }, [])



  //updates the tasklist
  
  React.useEffect(()=>{

      localStorage.setItem("tasks", JSON.stringify(tasks))
    
    
  },[tasks])



  // updates the completed tasks list

  React.useEffect(()=>{

    localStorage.setItem("completed-tasks", JSON.stringify(completedTasks))

  }, [completedTasks])



  //decides if the form page should be displayed

  function showAddForm(newState){
    setToAdd(newState)
  }



  //Adding a new task or update the existing task

  function addOrEditTask(task){

    setTasks(
      replaceOrAddElement(task)
    )

    setCurrentTask()
    
  }



    //to find the task to be edited
    function findCurrentTask(taskId) {

      const currTask = tasks.find((task) => task.id === taskId)
  
      setCurrentTask(currTask)
  
    }
  
  
  
    // replacing an array element if existing or append it at last
  
    function replaceOrAddElement(task) {
  
      const res = [...tasks]
      const ind = tasks.findIndex((ele) => ele.id === task.id)
  
      if(ind === -1) res.push(task)
  
      else res.splice(ind, 1, task)
  
      return res
    }


  //It deletes the task (both completed and not completed)

  function deleteTask(task, isChecked){

    if(isChecked === false) {

      const res = [...tasks]
      const ind = tasks.indexOf(task)
      res.splice(ind, 1)
      setTasks(res)

    }
    else {

      const res = [...completedTasks]
      const ind = completedTasks.indexOf(task)
      res.splice(ind, 1)
      setCompletedTasks(res)

    }
  }




  // to add the completed task and move the completed task to original task if not completed

  function addCompletedTask(task, isChecked) {

    if(!completedTasks.includes(task)) {

      deleteTask(task, isChecked)

      setCompletedTasks(
        [...completedTasks, task]
      )
    }
    else {
      
      deleteTask(task, isChecked)

      setTasks( [...tasks, task])
    }
  }



  
  return (
    <>
     <main >

      <Header/>

      { tasks.length === 0 && <Startpage showAddForm={showAddForm}/> }

      { toAdd && <AddTask 
                    showAddForm={showAddForm}
                    addOrEditTask={addOrEditTask}
                    currentTask={currentTask}/> }

      { tasks.length > 0 && 
        
        tasks.map((task) => <Task 
                              key={task.id} 
                              task={task}
                              findCurrentTask={findCurrentTask}
                              deleteTask={deleteTask}
                              showAddForm={showAddForm}
                              addCompletedTask={addCompletedTask}
                              isChecked={false}
                              /> )
      }

      { tasks.length > 0 && 
        <div onClick={() => showAddForm(true)}>
          <i className="fa-solid fa-plus add-btn"></i>
        </div>
      }

      { completedTasks.length > 0 &&
        
        <p style={{fontSize: '18px', marginTop: '10px'}}>Completed Tasks</p>
      }


      { completedTasks.length > 0 && 

        completedTasks.map((task) => <Task 
                                        key={task.id} 
                                        task={task}
                                        findCurrentTask={findCurrentTask}
                                        deleteTask={deleteTask}
                                        showAddForm={showAddForm}
                                        addCompletedTask={addCompletedTask}
                                        isChecked={true}
                                        /> ) }

      
     </main>
    </>
  )
}

export default App
