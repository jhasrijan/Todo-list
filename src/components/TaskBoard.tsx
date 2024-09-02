import {  useEffect, useReducer, useRef, useState } from "react";
import TaskItem from "./TaskItem";
import { Task, State, Action } from "../types/TaskBoard.types";
import { useAppContext } from "../context/AppContext";

const initialState:State={
    taskList:[]
}

const reducer=(state:State,action:Action)=>{
    switch(action.type){
        case 'ADD_TASK':
            return {...state,taskList:[...state.taskList,action.payload]}
        case 'DELETE_TASK':{
            const newTaskList=state.taskList.filter((task:Task)=>{
                return task.id!==action.payload
            })
            return {...state,taskList:newTaskList}
        }
        case 'TOGGLE_TASK':{
            const updatedTaskList=state.taskList.map((task:Task)=>{
                if(task.id===action.payload){
                    return {...task,isDone:!task.isDone}
                }
                return task;
            })
            return {...state,taskList:updatedTaskList};
        }
        case 'SET_TASK_LIST':{
            return {...state,taskList:action.payload}
        }
        default:
            return state;
    }
}


const TaskBoard=()=>{

    const {setTotal,setPending,setDone} =useAppContext();

    const [state,dispatch]=useReducer(reducer,initialState);

    const [task,setTask]=useState<string>('');

    const isInitialMount =useRef(true);

    const loadTasksFromLocalStorage=()=>{
        const taskList=localStorage.getItem('taskList');
        if(taskList&&taskList.length>0){
            try{
               const processedTaskList=JSON.parse(taskList);
               dispatch({type:'SET_TASK_LIST',payload:processedTaskList});
               setTotal(processedTaskList.length);
               setPending(processedTaskList.filter((task:Task)=>!task.isDone)?.length)
               setDone(processedTaskList.filter((task:Task)=>task.isDone)?.length)
            }catch(error){
                console.error('Error while fetching tasklist form local storage: ',error);
            }
        }
    }

    useEffect(()=>{
        if(isInitialMount.current){
            loadTasksFromLocalStorage();
            isInitialMount.current=false;
        }
    },[]);

    useEffect(()=>{
        if(!isInitialMount.current)localStorage.setItem('taskList',JSON.stringify(state.taskList));
    },[state.taskList])

    const handleSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(task.trim()===''){
            return;
        }
        const newTask:Task={
            id:new Date().getTime(),
            task:task,
            isDone:false
        }
        dispatch({type:'ADD_TASK',payload:newTask});
        setTotal((prev:number)=>prev+1);
        setPending((prev:number)=>prev+1);
        setTask('');
    }

    return (
        <div className="task_board">
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input type="text" placeholder="Enter task..." onChange={(e)=>setTask(e.target.value)} value={task}/>
                <button type="submit">ADD</button>
            </form>
            
            {state.taskList.length===0&&<p className="no_task">No task available</p>}

            {
                state.taskList.length>0&&
                    state.taskList.map((taskItem:Task)=>(
                        <TaskItem taskItem={taskItem} key={taskItem.id} dispatch={dispatch}/>
                    )
                )
            }
        </div>
    )
}

export default TaskBoard