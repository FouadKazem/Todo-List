import React from 'react'

function Header(props) {
    let startClientX = 0

    function startTouchFieldTabs(event) {
        startClientX = event.touches[0].clientX
    }

    function moveTouchFieldTabs(event) {
        document.querySelector('.field-tabs').scrollBy({
            left: startClientX - event.touches[0].clientX,
        })
        startClientX = event.touches[0].clientX
    }

    function scrollFieldTabs(event) {
        document.querySelector('.field-tabs').scrollBy({
            left: event.deltaY < 0 ? -30 : 30,
        })
    }

    const fieldsTabElements = props.fields.fieldsArray.map(field => {
        let styles = {
            backgroundColor: props.theme == 'light' ? 
            (field.fieldId == props.fields.activeFieldId ? '#a39081' : '#d6a692')
            :
            (field.fieldId == props.fields.activeFieldId ? '#2a2a40' : '#59596b')
        }

        return (
            <div style={styles} className='field-tab'>
                <h2 onClick={() => props.switchField(field.fieldId)} title={`Switch to ${field.fieldTitle}`} className='field-title'>{field.fieldTitle}</h2>
                {
                    field.fieldId == props.fields.activeFieldId &&
                    <button onClick={() => props.editFieldTitle(field.fieldId)} title='Edit Field Title' className='btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" viewBox="0 0 24 24" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                            <line x1="16" y1="5" x2="19" y2="8" />
                        </svg>
                    </button>
                }
                <button onClick={() => props.deleteField(field.fieldId)} title={`Delete ${field.fieldTitle}`} className='btn'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" viewBox="0 0 24 24" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="4" y1="7" x2="20" y2="7" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                </button>
            </div>
        )
    })
    const themeBtnStyles = {
        justifyContent: props.theme == 'light' ? 'flex-start' : 'flex-end'
    }

    return (
        <header className=' light'>
            <nav>
                <h1 className='website-title'>Todo List</h1>
                <div style={themeBtnStyles} onClick={props.switchTheme} className='themes-btn'>
                    {
                        props.theme == 'light' ?
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-sun" viewBox="0 0 24 24" strokeWidth="2" stroke="#efd9b4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="12" cy="12" r="4" />
                                <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-moon" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                            </svg>
                    }
                </div>
            </nav>
            <div onWheel={(event) => scrollFieldTabs(event)} onTouchStart={event => startTouchFieldTabs(event)} onTouchMove={event => moveTouchFieldTabs(event)} className='field-tabs'>
                {fieldsTabElements}
                {
                    props.fields.activeFieldId
                    &&
                    <button onClick={props.addField} title='Add New Field' className='btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" viewBox="0 0 24 24" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
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