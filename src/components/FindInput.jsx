import React from 'react'

function FindInput({ onChange, userFindText, onKeyPress }) {
    return (
        <input type="text" className="find__input" onChange={onChange} value={userFindText} maxLength="50" onKeyPress={onKeyPress} />
    )
}

export default FindInput
