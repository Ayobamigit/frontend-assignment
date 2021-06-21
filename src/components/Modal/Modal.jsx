import React from 'react';
import './modal.scss'
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
    return (
        <>
            <Backdrop show = {props.open} clicked = {props.modalClosed} />
            <div style={{display:'flex'}}>
            {/* <Close show = {props.open} clicked = {props.modalClosed} className="close-modal"/> */}
            
            <div 
                className="Modal"
                style = {{
                    transform:props.open ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.open ? '1' :'0'
                }}
            >
                {props.children}
            </div>
            </div>
        
         </>
    )
}

export default Modal
