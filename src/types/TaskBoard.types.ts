export interface Task{
    id:number,
    task:string,
    isDone:boolean,
}

export interface State{
    taskList:Task[]
}

export type Action ={ type:'ADD_TASK';payload:Task } |{ type:'DELETE_TASK';payload:number }|{ type:'TOGGLE_TASK';payload:number }
     | { type:'SET_TASK_LIST';payload:Task[] }
