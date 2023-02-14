import React from 'react'
import '../../styles/Header.css'

function Header(props) {
    let fieldsTitleElements = props.fields.fieldsArray.map(field => {
        return (
            <div style={{ backgroundColor: field.fieldId == props.fields.activeFieldId ? 'red' : 'green' }}>
                <span onClick={() => props.switchField(field.fieldId)}>{field.fieldTitle}</span>
                <button onClick={() => props.deleteField(field.fieldId)}>DELETE FIELD</button>
            </div>
        )
    })

    return (
        <header>
            <nav>
                <h1>Todo List</h1>
                <button>THEME</button>
            </nav>
            <div>
                {fieldsTitleElements}
                <button onClick={props.addField}>ADD FIELD</button>
            </div>
        </header>
    )
}

export default Header