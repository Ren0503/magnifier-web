import React, { useEffect, useContext } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import Image from 'next/image';
import CONST from 'constants';
import ModalContext from 'context/modal';
import { AuthContext } from 'context/auth';
import useWindowSize from 'hooks/useWindowSize';
import useComponentVisible from 'hooks/useComponentVisible';

import Button from 'components/shared/Button';
import Dropdown from '../Dropdown';
import { MenuIcon, CloseIcon } from 'components/icons';

import styles from './header.module.css';
import logo from 'public/logo.png';

const Header = ({ className, ...props }) => {
    const { handleComponentVisible } = useContext(ModalContext);
    const { isAuthenticated, authState, logout } = useContext(AuthContext);

    const {
        ref,
        toggleRef,
        isComponentVisible,
        setIsComponentVisible
    } = useComponentVisible(false);
    const size = useWindowSize();

    useEffect(() => {
        if (size.width > CONST.MOBILE_SIZE) {
            setIsComponentVisible(false);
        }
    }, [size]);

    return (
        <header className={cn(styles.header, className)} {...props}>
            <div className={styles.container}>
                <div ref={toggleRef} className={styles.menuContainer}>
                    <Button
                        className={styles.menu}
                        onClick={() => setIsComponentVisible((isOpen) => !isOpen)}
                    >
                        {isComponentVisible ? <CloseIcon /> : <MenuIcon />}
                    </Button>
                </div>
                <Button className={styles.logo} href="/">
                    <Image src={logo} alt="Logo" width="35" height="35" />
                    Magnifier
                </Button>
                <div style={{ flex: 1 }}></div>

                {isAuthenticated() ? (
                    <div className={styles.userInfo}>
                        <p>
                            Welcome{' '}
                            <Link
                                href="/users/[user]"
                                as={`/users/${authState.userInfo.username}`}
                            >
                                <a>{authState.userInfo.username}!</a>
                            </Link>
                        </p>
                        <a onClick={() => logout()}>log out</a>
                    </div>
                ) : (
                    <>
                        <Button
                            className={styles.auth}
                            secondary
                            onClick={() => handleComponentVisible(true, 'login')}
                        >
                            Log in
                        </Button>
                        <Button
                            className={styles.auth}
                            primary
                            onClick={() => handleComponentVisible(true, 'signup')}
                        >
                            Sign up
                        </Button>
                    </>
                )}
            </div>

            <div ref={ref}>{isComponentVisible && <Dropdown />}</div>
        </header>
    );
};

export default Header;