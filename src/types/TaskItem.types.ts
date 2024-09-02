import { Action } from "./TaskBoard.types";

export interface TaskItemProps{
    taskItem:{
        id:number,
        task:string,
        isDone:boolean,
    };
    key:number;
    dispatch:React.Dispatch<Action>;
}