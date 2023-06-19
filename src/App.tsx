import React from 'react'
import { nanoid } from 'nanoid'
import { Fields } from './interfaces'
import Header from './components/Header'
import Main from './components/Main'
import AppContext from './context/AppContext'
import TaskContext from './context/TaskContext'

function App() {
    const [fields, setFields] = React.useState((): Fields => {
        const localData = localStorage.getItem('fields')
        return localData ? JSON.parse(localData) : { fieldsArray: [], activeFieldId: null }
    })
    const [theme, setTheme] = React.useState((): string => {
        return localStorage.getItem('theme') || 'light'
    })
    
    React.useEffect((): void => {
        localStorage.setItem('fields', JSON.stringify(fields))
    }, [fields])

    React.useEffect((): void => {
        const head = document.querySelector('head')
        const oldThemeStyle = document.querySelector('.theme-style')
        if (oldThemeStyle) {
            head?.removeChild(oldThemeStyle)
        }
        const themeStyle = document.createElement('style')
        themeStyle.className = 'theme-style'
        if (theme == 'light') {
            themeStyle.innerHTML = `
                * { color: #292522; }
                svg { stroke: #292522; }
                header { background-color: #efd9b4; }
                .themes-btn {border-color: #292522; background-color: #a39081; }
                .themes-btn>svg { background-color: #292522; stroke: #efd9b4; }
                .btn:hover { background-color: #4d6160; }
                main { background-color: #a39081; }
                .intro { background-color: #efd9b4; }
                .field { background-color: #72655a; }
                .task { background-color: #efd9b4; }
                #main-add-field-btn, #main-add-task-btn { background-color: #d6a692; }
                main>#main-add-task-btn { background-color: #efd9b4; }
                #main-add-field-btn:hover, #main-add-task-btn:hover { background-color: #4d6160; }
            `
        }
        else {
            themeStyle.innerHTML = `
                * { color: white; }
                svg { stroke: white; }
                header { background-color: #12122b; }
                .themes-btn {border-color: white; background-color: #0d0d1e; }
                .themes-btn>svg { background-color: white; stroke: #12122b; fill: #12122b; }
                .btn:hover { background-color: #5e5e5e; }
                .field-tab>button:hover { background-color: #101027; }
                main { background-color: #2a2a40; }
                .intro { background-color: #12122b; }
                .field { background-color: #414155; }
                .task { background-color: #12122b; }
                #main-add-field-btn, #main-add-task-btn { background-color: #383845; }
                #main-add-field-btn:hover, #main-add-task-btn:hover { background-color: #5e5e5e; }
                main>#main-add-task-btn { background-color: #101027; }
            `
        }
        themeStyle.innerHTML = themeStyle.innerHTML.split('').filter(char => char != ' ' && char != '\n').join('')
        head?.append(themeStyle)
        localStorage.setItem('theme', theme)
    }, [theme])

    function switchTheme(): void {
        setTheme(prevTheme => prevTheme == 'light' ? 'dark' : 'light')
    }

    function addField(): void {
        const newFieldTitle = prompt('Enter Title for the New Field')
        if (!newFieldTitle) {
            if (newFieldTitle == '') {
                alert('Field Title Cannot be Empty!')
            }
            return
        }
        const newFieldId = nanoid()
        setFields(prevFields => {
            return {
                ...prevFields,
                activeFieldId: prevFields.activeFieldId == null ? newFieldId : prevFields.activeFieldId,
                fieldsArray: [
                    ...prevFields.fieldsArray,
                    {
                        fieldId: newFieldId,
                        fieldTitle: newFieldTitle,
                        fieldTasks: []
                    }
                ]
            }
        })
    }

    function editFieldTitle(fieldId: string): void {
        const newFieldTitle = prompt('Enter New Title for Field')
        if (!newFieldTitle) {
            if (newFieldTitle == '') {
                alert('Field Title Cannot be Empty!')
            }
            return
        }
        setFields(preFields => {
            return {
                ...preFields,
                fieldsArray: preFields.fieldsArray.map(field => {
                    if (field.fieldId == fieldId) {
                        return {
                            ...field,
                            fieldTitle: newFieldTitle
                        }
                    }
                    return field
                })
            }
        })
    }

    function deleteField(fieldId: string): void {
        setFields(prevFields => {
            let newFields: Fields = {
                ...prevFields,
                fieldsArray: []
            }
            let deletedFieldIndex = -1
            for (let i = 0; i < prevFields.fieldsArray.length; i++) {
                if (prevFields.fieldsArray[i].fieldId == fieldId) {
                    deletedFieldIndex = i
                    continue
                }
                newFields.fieldsArray.push(prevFields.fieldsArray[i])
            }
            if (newFields.fieldsArray.length == 0) {
                newFields.activeFieldId = null
            }
            else if (newFields.activeFieldId == fieldId) {
                if (deletedFieldIndex == 0) {
                    newFields.activeFieldId = newFields.fieldsArray[0].fieldId
                }
                else if (deletedFieldIndex == newFields.fieldsArray.length) {
                    newFields.activeFieldId = newFields.fieldsArray[deletedFieldIndex - 1].fieldId
                }
                else {
                    newFields.activeFieldId = newFields.fieldsArray[deletedFieldIndex].fieldId
                }
            }
            return newFields
        })
    }

    function switchField(fieldId: string): void {
        setFields(prevFields => {
            return {
                ...prevFields,
                activeFieldId: fieldId
            }
        })
    }

    function addTask(fieldId: string): void {
        const newTaskDescription = prompt('Enter Task Description')
        if (!newTaskDescription) {
            if (newTaskDescription == '') {
                alert('Task Description Cannot be Empty!')
            }
            return
        }
        setFields(prevFields => {
            return {
                ...prevFields,
                fieldsArray: prevFields.fieldsArray.map(field => {
                    if (field.fieldId == fieldId) {
                        return {
                            ...field,
                            fieldTasks: [
                                ...field.fieldTasks,
                                {
                                    taskId: nanoid(),
                                    taskDescription: newTaskDescription,
                                    taskStatus: false
                                }
                            ]
                        }
                    }
                    return field
                })
            }
        })
    }

    function checkTask(fieldId: string, taskId: string): void {
        setFields(prevFields => {
            return {
                ...prevFields,
                fieldsArray: prevFields.fieldsArray.map(field => {
                    if (field.fieldId != fieldId) {
                        return field
                    }
                    return {
                        ...field,
                        fieldTasks: field.fieldTasks.map(task => {
                            return task.taskId == taskId ? { ...task, taskStatus: !task.taskStatus } : task
                        })
                    }
                })
            }
        })
    }

    function editTaskDescription(fieldId: string, taskId: string): void {
        const newTaskDescription = prompt('Enter New Description for The Task')
        if (!newTaskDescription) {
            if (newTaskDescription == '') {
                alert('Task Description Cannot be Empty!')
            }
            return
        }
        setFields(prevFields => {
            return {
                ...prevFields,
                fieldsArray: prevFields.fieldsArray.map(field => {
                    if (field.fieldId != fieldId) {
                        return field
                    }
                    return {
                        ...field,
                        fieldTasks: field.fieldTasks.map(task => {
                            if (task.taskId == taskId) {
                                return {
                                    ...task,
                                    taskDescription: newTaskDescription
                                }
                            }
                            return task
                        })
                    }
                })
            }
        })
    }

    function deleteTask(fieldId: string, taskId: string): void {
        setFields(prevFields => {
            return {
                ...prevFields,
                fieldsArray: prevFields.fieldsArray.map(field => {
                    if (field.fieldId != fieldId) {
                        return field
                    }
                    const newFieldTasks = [...field.fieldTasks].filter(task => task.taskId != taskId)
                    return {
                        ...field,
                        fieldTasks: newFieldTasks
                    }
                })
            }
        })
    }

    return (
        <AppContext.Provider value={{ fields, theme }}>
            <Header
                switchTheme={switchTheme}
                addField={addField}
                deleteField={deleteField}
                editFieldTitle={editFieldTitle}
                switchField={switchField}
            />
            <TaskContext.Provider value={{ checkTask, editTaskDescription, deleteTask }}>
                <Main
                    addField={addField}
                    addTask={addTask}
                />
            </TaskContext.Provider>
        </AppContext.Provider>
    )
}

export default App