import React from 'react'
import { TaskContextInterface } from '../interfaces'

const TaskContext: React.Context<TaskContextInterface> = React.createContext({} as TaskContextInterface)

export default TaskContext