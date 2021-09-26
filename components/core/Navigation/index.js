import React from 'react';
import { useRouter } from 'next/router';
import NavItem from './NavItem';
import { WorldIcon } from 'components/icons';
import styles from './navigation.module.css';

const Navigation = () => {
    const router = useRouter();

    return (
        <nav className={styles.nav}>
            <NavItem href="/" selected={router.pathname == '/' || router.pathname.split('/')[1] == 'questions'}
            >
                <WorldIcon />
                <span>Forum</span>
            </NavItem>

            <NavItem href="/tags" selected={router.pathname == '/tags'}>
                <span>Tags</span>
            </NavItem>

            <NavItem href="/users" selected={router.pathname.split('/')[1] == 'users'}>
                <span>Users</span>
            </NavItem>
        </nav>
    );
};

export default Navigation;