interface TaskList {
    Task: string,
    Badges: string[],
    Type: string,
    Exp: string,
    Date: Date,
    ExpirationTime:Date,
    Completed: boolean
}

interface TaskTypes {
    oneTimeTasks: TaskList[],
    dailyTasks: TaskList[],
    weeklyTasks: TaskList[],
    monthlyTasks: TaskList[]
}

export type {TaskList, TaskTypes}