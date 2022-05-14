import React, {useState} from 'react'
import './Field.css'

function Field (props){
    const [clientField, setClientField] = useState('')

    function handleInputChange (event){
        setClientField(event.target.value)
    }
    function handleClear(){
        setClientField("")
    }

    const displayClear = clientField.length > 0

    return (
        <div>
            <form>
                <input type="text" value={clientField} placeholder={props.placeholder} onChange={handleInputChange}/>
                {displayClear && <button onClick={handleClear}></button>}
            </form>
            
        </div>
    )
}

export default Field