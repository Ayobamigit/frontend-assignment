import React from 'react'
import './backdrop.scss'

const Backdrop = (props) => {
    return props.show ? <div className = 'Backdrop' onClick = {props.clicked} ></div> :null

}

export default Backdrop
