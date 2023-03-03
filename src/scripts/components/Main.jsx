import React from 'react'
import Task from './Task'

function Main(props) {
    const [startClientY, setStartClientY] = React.useState(0)

    function startTouchField(event) {
        setStartClientY(event.touches[0].clientY)
    }

    function moveTouchField(event) {
        document.querySelector('.field').scrollBy({
            top: startClientY < event.touches[0].clientY ? -10 : 10,
        })
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
            TasksElements = field.fieldTasks.map(task => <Task activeFieldId={props.fields.activeFieldId} task={task} checkTask={props.checkTask} editTaskDescription={props.editTaskDescription} deleteTask={props.deleteTask} />)
            break
        }
    }

    return (
        <main style={props.mainStyles}>
            {
                props.fields.activeFieldId == null ?
                    <div className='intro'>
                        <h1>Board is Empty! Press The Button Below to Add New Field</h1>
                        <button onClick={props.addField} className='btn' id='main-add-field-btn'>ADD NEW FIELD</button>
                    </div>
                    :
                    <React.Fragment>
                        <div onWheel={(event) => scrollField(event)} onTouchStart={event => startTouchField(event)} onTouchMove={event => moveTouchField(event)} className='field'>
                            {
                                TasksElements.length == 0 ?
                                    <div className='intro'>
                                        <h1>Field is Empty! Press The Button Below to Add New Task</h1>
                                        <button onClick={() => props.addTask(props.fields.activeFieldId)} className='btn' id='main-add-task-btn'>ADD NEW TASK</button>
                                    </div>
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