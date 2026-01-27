import React, { useEffect, useState } from 'react'
import Dialog from '../Dialog';

const GeneralSettings = ({ref}) => {
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
        ref.current.close()
    }

    return (
        <Dialog classString="option-photo" ref={ref}>
            <form className="settings" onSubmit={changeSettings}>
                <div className="option"><label>UI Color</label>
                    <div>
                        <input type="radio" checked={!colorInput} onChange={() => setColorinput(false)} name="color"></input><label>Dark</label>
                        <input type="radio" checked={colorInput} onChange={() => setColorinput(true)} name="color"></input><label>Light</label>
                    </div>
                </div>
                <div className="save-button"><button onClick={changeSettings}>Close</button></div>
            </form>
        </Dialog>
    )
}

export default GeneralSettings