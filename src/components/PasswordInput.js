import React, { useState } from 'react';

const PasswordInput = ({ label, stateType, value }) => {
    const [ showEye, setShowEye] = useState( false )
    const [ showPassword, setShowPassword] = useState(false)

    return (
    <div><label>{label}</label>
        <input type={ showPassword ? 'text' : 'password' } value={value} onFocus={ () => setShowEye(true) } onBlur={ () => setShowEye(false) } onChange={e => stateType(e.target.value)}></input>
        { showEye ? <i onMouseOver={() => setShowPassword(true)} onMouseLeave={() => setShowPassword(false)} className={ showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i> : '' }
    </div>
    )
}

export default PasswordInput;

/*
    <div><label>Rewrite Password</label>
        <input type={ showPassword.rewrite ? 'text' : 'password' } onFocus={ () => setShowEye({rewrite: true}) } onBlur={ () => setShowEye({rewrite: false}) } onChange={e => setStateRewritePassword(e.target.value)}></input>
        { showEye.rewrite ? <i onMouseOver={() => setShowPassword({rewrite: true})} onMouseLeave={() => setShowPassword({rewrite: false})} className={ showPassword.rewrite ? "fas fa-eye" : "fas fa-eye-slash"}></i> : '' }
    </div>
*/