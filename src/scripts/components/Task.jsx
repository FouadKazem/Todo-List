import React from 'react'

function Task(props) {
    return (
        <div className='task'>
            <h2 className='task-description'>{props.task.taskDescription}</h2>
            <div className='control-btns'>
                <button onClick={() => props.checkTask(props.activeFieldId, props.task.taskId)} title={`Mark task as ${!props.task.taskStatus ? 'Done' : 'Undone'}`}>
                    {
                        !props.task.taskStatus ?
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle" viewBox="0 0 24 24" strokeWidth="2" fill="#a39081" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="12" cy="12" r="9" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-check" viewBox="0 0 24 24" strokeWidth="2" fill="#a39081" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="12" cy="12" r="9" />
                                <path d="M9 12l2 2l4 -4" />
                            </svg>
                    }
                </button>
                <button onClick={() => props.editTaskDescription(props.activeFieldId, props.task.taskId)} title='Edit Task Description'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" viewBox="0 0 24 24" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                        <line x1="16" y1="5" x2="19" y2="8" />
                    </svg>
                </button>
                <button onClick={() => props.deleteTask(props.activeFieldId, props.task.taskId)} title='Delete Task' className='btn'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash-x" viewBox="0 0 24 24" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 7h16" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        <path d="M10 12l4 4m0 -4l-4 4" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Task