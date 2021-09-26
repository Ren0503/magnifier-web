import React from 'react';

import styles from './user-card.module.css';

const UserCard = ({ children }) => {
    return <div className={styles.container}>{children}</div>
};

export default UserCard;