import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

import { publicFetch } from 'utils/fetcher';
import { SpinnerIcon } from 'components/icons';
import styles from './avatar-card.module.css';

const AvatarCard = ({ username }) => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await publicFetch.get(`/user/${username}`);
            setUserInfo(data);
        }

        fetchUser();
    }, [username]);

    return (
        <div>
            <div className={styles.avatarCard}>
                {!userInfo ? (
                    <div className="loading">
                        <SpinnerIcon />
                    </div>
                ) : (
                    <div className={styles.avatar}>
                        <Link href="/users/[username]" as={`/users/${username}`}>
                            <a>
                                <img
                                    src={`${userInfo.avatar}&s=164`}
                                    alt={username}
                                />
                            </a>
                        </Link>
                    </div>
                )}
                <h2 className={styles.username}>{username}</h2>
                {!userInfo ? (
                    <div className="loading">
                        <SpinnerIcon />
                    </div>
                ) : (
                    <div className="loading">
                        <p>
                            Created: {' '}
                            <span>
                                {formatDistanceToNowStrict(new Date(userInfo.created), {
                                    addSuffix: true
                                })}
                            </span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AvatarCard;