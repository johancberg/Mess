import React, {useState} from 'react'

const PhotoSettings = ({auth, firestore, setChangeGeneral}) => {
    const [colorInput, setColorinput] = useState(false);

    const changeSettings = (e) => {
        e.preventDefault()

    }

    return (
        <div className="option-photo" onSubmit={changeSettings}>
            <form className="settings">
                <div className="option"><label>UI Color</label>
                <input type="radio" onClick={() => setColorinput(!colorInput)} value={colorInput}></input></div>
                <div className="save-button"><button onClick={changeSettings}>Save</button></div>
            </form>
        </div>
    )
}

export default PhotoSettings