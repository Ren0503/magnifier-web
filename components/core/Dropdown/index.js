import React from 'react';
import Navigation from '../Navigation';
import styles from './dropdown.module.css';

const Dropdown = () => {
    return (
        <div className={styles.dialog}>
            <div className={styles.sidebar}>
                <Navigation />
            </div>
        </div>
    );
};

export default Dropdown;