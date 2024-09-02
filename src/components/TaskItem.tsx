import { useAppContext } from "../context/AppContext"
import {TaskItemProps } from "../types/TaskItem.types"

const TaskItem =(props:TaskItemProps)=>{
    const {setTotal,setPending,setDone}=useAppContext();

    const handleDelete=()=>{
        props.dispatch({type:'DELETE_TASK',payload:props.taskItem.id})
        if(props.taskItem.isDone){
            setDone((prev:number)=>prev-1);
        }else{
            //pending
            setPending((prev:number)=>prev-1);
        }

        setTotal((prev:number)=>prev-1);
    }

    const handleDone=()=>{
        props.dispatch({type:'TOGGLE_TASK',payload:props.taskItem.id})

        if(props.taskItem.isDone){
            setDone((prev:number)=>prev-1);
            setPending((prev:number)=>prev+1);
        }else{
            setDone((prev:number)=>prev+1);
            setPending((prev:number)=>prev-1);
        }
    }

    return (
        <div className="task_item">
            <input type="checkbox" defaultChecked={props.taskItem.isDone}
                 onChange={()=>handleDone()}/>
            <div className={props.taskItem.isDone?"strikethrough":""}>{props.taskItem.task}</div>
            <button title="delete" onClick={()=>handleDelete()}>🗑</button>
        </div>
    )
}

export default TaskItem