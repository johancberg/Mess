import React from 'react'

const Error = ({error = '404'}) => {

    return (
        <>{ error === '403' ?
        <div className="error-page">
            <h1 className="error-text">403 Forbidden</h1>
            <p className="error-text">You have entered a page where you ain't granted access.</p>
        </div>
        :
        <div className="error-page">
            <h1 className="error-text">404 Not Found</h1>
            <p className="error-text">You have entered a page that doesn't exist.</p>
        </div>
        }</>
    )
}

export default Error