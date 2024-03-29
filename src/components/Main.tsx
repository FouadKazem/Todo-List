import React from 'react'
import Intro from './Intro'
import Task from './Task'
import { MainProps } from '../interfaces'
import { clientHeight } from '../utilities/common'
import AppContext from '../context/AppContext'

function Main(props: MainProps) {
    const [mainStyles, setMainStyles] = React.useState({})

    const appContext = React.useContext(AppContext)

    React.useEffect(() => {
        setMainStyles({
            height: `${window.innerHeight - clientHeight('header')}px`
        })
    }, [window.innerHeight, clientHeight('header')])

    let startClientY = 0

    function startTouchField(event: React.TouchEvent) {
        startClientY = event.touches[0].clientY
    }

    function moveTouchField(event: React.TouchEvent) {
        const fieldElement = document.querySelector('.field') as Element
        fieldElement.scrollBy({
            top: startClientY - event.touches[0].clientY,
        })
        startClientY = event.touches[0].clientY
    }

    function scrollField(event: React.WheelEvent) {
        const fieldElement = document.querySelector('.field') as Element
        fieldElement.scrollBy({
            top: event.deltaY < 0 ? -30 : 30,
        })
    }

    let TasksElements: Array<React.JSX.Element> = []
    for (let i = 0; i < appContext.fields.fieldsArray.length; i++) {
        let field = appContext.fields.fieldsArray[i]
        if (field.fieldId == appContext.fields.activeFieldId) {
            TasksElements = field.fieldTasks.map(task => {
                return (
                    <Task task={task} />
                )
            })
            break
        }
    }

    return (
        <main style={mainStyles}>
            {
                appContext.fields.activeFieldId == null ?
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
                                        handleClick={() => props.addTask(appContext.fields.activeFieldId as string)}
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
                            <button onClick={() => props.addTask(appContext.fields.activeFieldId as string)} className='btn' id='main-add-task-btn'>ADD NEW TASK</button>
                        }
                    </React.Fragment>
            }
        </main>
    )
}

export default Main