import React, {useState} from 'react'

const Options = ({auth, setChangePhoto}) => {
    const [menu, setMenu] = useState(false)

    return (
        <div>
            <div className="options" onClick={() => setMenu(!menu)}>
                <i className="fas fa-ellipsis-v"></i>
            </div>
            { menu && <div className="dropdownBlocker" onClick={() => setMenu(!menu)}></div> }
            { menu && <div className="dropdownMenu">
                <button onClick={() => {setChangePhoto(true); setMenu(!menu)}}>Change photo</button>
                <button onClick={() => {auth.signOut(); setMenu(!menu)}}>Sign out</button>
            </div> }
        </div>
    )
}

export default Options