import { useAppContext } from "../context/AppContext";

const TaskSummary=()=>{

    const {total,pending,done}=useAppContext();

    return(
        <ul className="task_summary">
            <li>Total: {total}</li>
            <li>Pending: {pending}</li>
            <li>Done: {done}</li>
        </ul>
    )
}

export default TaskSummary;