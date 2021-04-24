import React from 'react'

function FindInput({ onChange, userFindText }) {
    return (
        <input type="text" className="find__input" onChange={onChange} value={userFindText} maxLength="50" />
    )
}

export default FindInput
