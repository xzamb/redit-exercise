import React from 'react';

import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
    const {show , handleClose, children} = props;
        return (
            <div>
                <Backdrop show={show} clicked={handleClose} />
                <div
                    className="modal"
                    style={{
                        transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: show ? '1' : '0'
                    }}>
                    {children}
                </div>
            </div>
        )
}

export default Modal;