import React, { useState } from 'react';

const PasswordInput = ({ label, name, handleForm, value, passFunction }) => {
    const [ showEye, setShowEye] = useState( false )
    const [ showPassword, setShowPassword] = useState(false)

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            passFunction(e)
        }
    }

    const setId = (label) => {
        if (label === 'Password') {
            return "signin-password"
        } else {
            return "signin-rewritepassword"
        }
    }

    return (
    <div><label htmlFor={setId(label)}>{label}</label>
        <input id={setId(label)} type={ showPassword ? 'text' : 'password' } value={value} name={name} autoComplete='current-password' onFocus={ () => setShowEye(true) } onBlur={ () => { setShowEye(false); setShowPassword(false) } } onChange={handleForm} onKeyPress={handleKeyPress}></input>
        { showEye && <i onMouseOver={() => setShowPassword(true)} onMouseLeave={() => setShowPassword(false)} className={ showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i> }
    </div>
    )
}

export default PasswordInput;
