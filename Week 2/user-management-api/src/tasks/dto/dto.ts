enum Status{
    Pending="pending",
    In_progress="in_progress",
    Done="done"
}

export class Task{
    id:number
    title: string;
    description:string;
    status:Status
}