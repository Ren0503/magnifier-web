import React, { useContext } from 'react';
import cn from 'classnames';

import ModalContext from 'context/modal';
import { CloseIcon } from 'components/icons';
import Button from '../Button';

import styles from './modal.module.css';

const Modal = ({ children, className, ...props }) => {
    const { ref, setIsComponentVisible } = useContext(ModalContext);
    return (
        <>
            <div className={cn(styles.modal, className)} {...props}>
                <div ref={ref} className={styles.modalDialog}>
                    <Button className={styles.closeButton} onClick={() => setIsComponentVisible((isOpen) => !isOpen)}>
                        <CloseIcon />
                    </Button>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Modal;