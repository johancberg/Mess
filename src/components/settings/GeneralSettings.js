import React, { useEffect, useState } from 'react'

const PhotoSettings = ({auth, firestore, setChangeGeneral}) => {
    const [colorInput, setColorinput] = useState( localStorage.getItem("mess-theme") === "light" ? true : false );

    useEffect(() => {
        if (colorInput) {
            localStorage.setItem("mess-theme", "light")
            document.body.setAttribute('data-theme', 'light')
        } else {
            localStorage.setItem("mess-theme", "dark")
            document.body.setAttribute('data-theme', 'dark')
        }
    }, [colorInput])

    const changeSettings = (e) => {
        e.preventDefault()
        setChangeGeneral(false)
    }

    return (
        <div className="option-photo" onSubmit={changeSettings}>
            <form className="settings">
                <div className="option"><label>UI Color</label>
                    <div>
                        <input type="radio" onClick={() => setColorinput(false)} checked={!colorInput} name="color"></input><label>Dark</label>
                        <input type="radio" onClick={() => setColorinput(true)} checked={colorInput} name="color"></input><label>Light</label>
                    </div>
                </div>
                <div className="save-button"><button onClick={changeSettings}>Close</button></div>
            </form>
        </div>
    )
}

export default PhotoSettings