import React from 'react'

import './Button.scss'

export default function Button({ children, classes="", disabled, click }) {
    return (
         <button onClick={click} className={`btn ${classes}`} disabled={disabled}> {children} </button>
    )
}
