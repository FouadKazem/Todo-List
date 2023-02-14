import React from 'react'
import { nanoid } from 'nanoid'
import Header from './components/Header'
import Main from './components/Main'

function App() {
    const [fields, setFields] = React.useState({
        fieldsArray: [],
        activeFieldId: null,
    })

    function addField() {
        setFields(prevFields => {
            const newFieldId = nanoid()
            return {
                activeFieldId: prevFields.activeFieldId == null ? newFieldId : prevFields.activeFieldId,
                fieldsArray: [
                    ...prevFields.fieldsArray,
                    {
                        fieldId: newFieldId,
                        fieldTitle: `Title ${prevFields.fieldsArray.length + 1}`,
                        fieldTasks: []
                    }
                ]
            }
        })
    }

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
            <Main />
        </React.Fragment>
    )
}

export default App