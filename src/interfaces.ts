interface Task {
    taskId: string
    taskDescription: string
    taskStatus: boolean
}

interface Field {
    fieldId: string,
    fieldTitle: string,
    fieldTasks: Array<Task>
}

interface Fields {
    fieldsArray: Array<Field>
    activeFieldId: string | null
}

interface HeaderProps {
    switchTheme(): void
    addField(): void
    deleteField(fieldId: string): void
    editFieldTitle(fieldId: string): void
    switchField(fieldId: string): void
}

interface MainProps {
    addField(): void
    addTask(fieldId: string): void
}

interface IntroProps {
    message: string
    handleClick: () => void
    btnId: string
    btnMessage: string
}

interface TaskProps {
    task: Task
}

interface AppContextInterface { 
    fields: Fields
    theme: string
}

interface TaskContextInterface { 
    checkTask(fieldId: string, taskId: string): void
    editTaskDescription(fieldId: string, taskId: string): void
    deleteTask(fieldId: string, taskId: string): void
}

export { 
    Task, 
    Field, 
    Fields,
    HeaderProps,
    MainProps,
    IntroProps,
    TaskProps,
    AppContextInterface,
    TaskContextInterface
}