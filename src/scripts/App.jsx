import React from 'react'
import { nanoid } from 'nanoid'
import Header from './components/Header'
import Main from './components/Main'

function App() {
    // The 'fields' state will search the local storage to retrive the data,
    // If there are no such data in the local storage it will assign the
    // object next to the or operator.
    const [fields, setFields] = React.useState(() => {
        return JSON.parse(localStorage.getItem('fields')) || { fieldsArray: [], activeFieldId: null, theme: 'light' }
    })
    const [windowHeight, setWindowHeight] = React.useState(0)
    const [headerHeight, setHeaderHeight] = React.useState(0)
    const [mainStyles, setMainStyles] = React.useState({})

    // Side effect will only run if the fields object changed, it saves the
    // current fields data to the local storage.
    React.useEffect(() => localStorage.setItem('fields', JSON.stringify(fields)), [fields])

    // Side Effect to listen to change of the size of the window and the header.
    React.useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowHeight(window.innerHeight)
        })
        new ResizeObserver(() => {
            setHeaderHeight(document.querySelector('header').clientHeight)
        }).observe(document.querySelector('header'))
    }, [])

    // Side effect to modify the main styles based on changing in the height of
    // window and header heights states.
    React.useEffect(() => {
        setMainStyles({
            height: `${windowHeight - headerHeight}px`
        })
    }, [windowHeight, headerHeight])

    // Side effect to handle the change of theme.
    React.useEffect(() => {
        const head = document.querySelector('head')
        const oldThemeStyle = document.querySelector('.theme-style')
        if (oldThemeStyle) {
            head.removeChild(oldThemeStyle)
        }
        const themeStyle = document.createElement('style')
        themeStyle.className = 'theme-style'
        if (fields.theme == 'light') {
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
        head.append(themeStyle)
    }, [fields.theme])

    // Event handler will change the theme from light to dark and vice versa.
    function switchTheme() {
        setFields(prevFields => {
            return {
                ...prevFields,
                theme: prevFields.theme == 'light' ? 'dark' : 'light'
            }
        })
    }

    // Event handler will create new field and add it to the end of array.
    function addField() {
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

    // Event handler will edit the field title based on the id.
    function editFieldTitle(id) {
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
                    if (field.fieldId == id) {
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

    // Event handler will delete the field which its id matches with the 
    // 'id' parameter and update the active field status if needed.
    function deleteField(id) {
        setFields(prevFields => {
            let newFields = {
                ...prevFields,
                fieldsArray: []
            }
            let deletedFieldIndex = null
            for (let i = 0; i < prevFields.fieldsArray.length; i++) {
                if (id == prevFields.fieldsArray[i].fieldId) {
                    deletedFieldIndex = i
                    continue
                }
                newFields.fieldsArray.push(prevFields.fieldsArray[i])
            }
            if (newFields.fieldsArray.length == 0) {
                newFields.activeFieldId = null
            }
            else if (newFields.activeFieldId == id) {
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

    // Event handler will switch the field which its id matches with the 
    // 'id' parameter to an active field.
    function switchField(id) {
        setFields(prevFields => {
            return {
                ...prevFields,
                activeFieldId: id
            }
        })
    }

    // Event handler will add task to a field based on the passed field id.
    function addTask(id) {
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
                    if (field.fieldId == id) {
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

    // Event handler will switch a task from done to undone and vic versa,
    function checkTask(fieldId, taskId) {
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

    // Event handler will edit task description.
    function editTaskDescription(fieldId, taskId) {
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

    // Event handler will delete task based on field id and task id.
    function deleteTask(fieldId, taskId) {
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
        <React.Fragment>
            <Header
                fields={fields}
                switchTheme={switchTheme}
                addField={addField}
                deleteField={deleteField}
                editFieldTitle={editFieldTitle}
                switchField={switchField}
            />
            <Main
                fields={fields}
                addField={addField}
                addTask={addTask}
                checkTask={checkTask}
                editTaskDescription={editTaskDescription}
                deleteTask={deleteTask}
                mainStyles={mainStyles}
            />
        </React.Fragment>
    )
}

export default App