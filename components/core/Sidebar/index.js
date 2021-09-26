import React from 'react';
import cn from 'classnames';
import Navigation from '../Navigation';
import styles from './sidebar.module.css';

const Sidebar = ({ className, ...props }) => {
    return (
        <nav className={cn(styles.Sidebar, className)} {...props}>
            <Navigation />
        </nav>
    );
};

export default Sidebar;
