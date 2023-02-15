import React from 'react'

function Main(props) {
    return (
        <main>
            {
                props.fields.activeFieldId == null ?
                <React.Fragment>
                    <h1>Press the button below to add new tasks field</h1>
                    <button onClick={props.addField} className='add-btn' id='main-add-btn'>ADD NEW FIELD</button>
                </React.Fragment>
                :
                <React.Fragment>
                    
                </React.Fragment>
            }
        </main>
    )
}

export default Main