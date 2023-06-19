import React from 'react'
import { IntroProps } from '../interfaces'

function Intro(props: IntroProps) {
    return (
        <div className='intro'>
            <h1>{props.message}</h1>
            <button onClick={props.handleClick} className='btn' id={props.btnId}>{props.btnMessage}</button>
        </div>
    )
}

export default Intro