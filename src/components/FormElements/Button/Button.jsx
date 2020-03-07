import React from 'react'

import './Button.scss'

export default function Button({ children, classes="" }) {
    return (
        <button className={`btn ${classes}`}> {children} </button>
    )
}
