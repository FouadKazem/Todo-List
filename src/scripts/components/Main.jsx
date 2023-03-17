import React from 'react'
import Intro from './Intro'
import Task from './Task'

function Main(props) {
    let startClientY = 0

    function startTouchField(event) {
        startClientY = event.touches[0].clientY
    }

    function moveTouchField(event) {
        document.querySelector('.field').scrollBy({
            top: startClientY - event.touches[0].clientY,
        })
        startClientY = event.touches[0].clientY
    }

    function scrollField(event) {
        document.querySelector('.field').scrollBy({
            top: event.deltaY < 0 ? -30 : 30,
        })
    }

    let TasksElements = null
    for (let i = 0; i < props.fields.fieldsArray.length; i++) {
        let field = props.fields.fieldsArray[i]
        if (field.fieldId == props.fields.activeFieldId) {
            TasksElements = field.fieldTasks.map(task => {
                return (
                    <Task
                        theme={props.fields.theme}
                        activeFieldId={props.fields.activeFieldId}
                        task={task}
                        checkTask={props.checkTask}
                        editTaskDescription={props.editTaskDescription}
                        deleteTask={props.deleteTask}
                    />
                )
            })
            break
        }
    }

    return (
        <main style={props.mainStyles}>
            {
                props.fields.activeFieldId == null ?
                    <Intro
                        message='Board is Empty! Press The Button Below to Add New Field'
                        handleClick={props.addField}
                        btnId='main-add-field-btn'
                        btnMessage='ADD NEW FIELD'
                    />
                    :
                    <React.Fragment>
                        <div onWheel={(event) => scrollField(event)} onTouchStart={event => startTouchField(event)} onTouchMove={event => moveTouchField(event)} className='field'>
                            {
                                TasksElements.length == 0 ?
                                    <Intro
                                        message='Field is Empty! Press The Button Below to Add New Task'
                                        handleClick={() => props.addTask(props.fields.activeFieldId)}
                                        btnId='main-add-task-btn'
                                        btnMessage='ADD NEW TASK'
                                    />
                                    :
                                    <React.Fragment>
                                        {TasksElements}
                                    </React.Fragment>
                            }
                        </div>
                        {
                            TasksElements.length != 0 &&
                            <button onClick={() => props.addTask(props.fields.activeFieldId)} className='btn' id='main-add-task-btn'>ADD NEW TASK</button>
                        }
                    </React.Fragment>
            }
        </main>
    )
}

export default Main