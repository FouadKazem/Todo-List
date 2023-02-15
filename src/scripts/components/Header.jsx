import React from 'react'

function Header(props) {
    const fieldsTabElements = props.fields.fieldsArray.map(field => {
        let styles = {
            backgroundColor: field.fieldId == props.fields.activeFieldId ? '#a39081' : '#d6a692'
        }
        return (
            <div style={styles} className='field-tab'>
                <h2 onClick={() => props.switchField(field.fieldId)} className='field-title'>{field.fieldTitle}</h2>
                <button onClick={() => props.deleteField(field.fieldId)} className='del-btn'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>
        )
    })

    return (
        <header>
            <nav>
                <h1 className='website-title'>Todo List</h1>
                <button className='themes-btn'>THEME</button>
            </nav>
            <div className='field-tabs'>
                {fieldsTabElements}
                {
                    props.fields.activeFieldId
                    &&
                    <button onClick={props.addField} className='add-btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                }
            </div>
        </header>
    )
}

export default Header