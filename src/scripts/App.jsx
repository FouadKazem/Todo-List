import React from 'react'
import { nanoid } from 'nanoid'
import Header from './components/Header'
import Main from './components/Main'

function App() {
    // The 'fields' state will search the local storage to retrive the data,
    // If there are no such data in the local storage it will assign the
    // object next to the or operator.
    const [fields, setFields] = React.useState(() => {
        return JSON.parse(localStorage.getItem('fields')) || { fieldsArray: [], activeFieldId: null }
    })

    // Side effect will only run if the fields object changed, it saves the
    // current fields data to the local storage.
    React.useEffect(() => localStorage.setItem('fields', JSON.stringify(fields)), [fields])

    // Event handler will create new field and add it to the end of array.
    function addField() {
        setFields(prevFields => {
            const newFieldId = nanoid()
            return {
                activeFieldId: prevFields.activeFieldId == null ? newFieldId : prevFields.activeFieldId,
                fieldsArray: [
                    ...prevFields.fieldsArray,
                    {
                        fieldId: newFieldId,
                        fieldTitle: `Field ${prevFields.fieldsArray.length + 1}`,
                        fieldTasks: []
                    }
                ]
            }
        })
    }

    // Event handler will delete the field which its id matches with the 
    // 'id' parameter and update the active field status if needed.
    function deleteField(id) {
        setFields(prevFields => {
            let newFields = {
                ...prevFields,
                fieldsArray: []
            }
            let deletedFieldIndex = null
            for (let i = 0; i < prevFields.fieldsArray.length; i++) {
                if (id == prevFields.fieldsArray[i].fieldId) {
                    deletedFieldIndex = i
                    continue
                }
                newFields.fieldsArray.push(prevFields.fieldsArray[i])
            }
            if (newFields.fieldsArray.length == 0) {
                newFields.activeFieldId = null
            }
            else if (newFields.activeFieldId == id) {
                if (deletedFieldIndex == 0) {
                    newFields.activeFieldId = newFields.fieldsArray[0].fieldId
                }
                else if (deletedFieldIndex == newFields.fieldsArray.length) {
                    newFields.activeFieldId = newFields.fieldsArray[deletedFieldIndex - 1].fieldId
                }
                else {
                    newFields.activeFieldId = newFields.fieldsArray[deletedFieldIndex].fieldId
                }
            }
            return newFields
        })
    }

    // Event handler will switch the field which its id matches with the 
    // 'id' parameter to an active field.
    function switchField(id) {
        setFields(prevFields => {
            return {
                ...prevFields,
                activeFieldId: id
            }
        })
    }

    return (
        <React.Fragment>
            <Header fields={fields} addField={addField} deleteField={deleteField} switchField={switchField} />
            <Main fields={fields} addField={addField} />
        </React.Fragment>
    )
}

export default App