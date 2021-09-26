import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import { publicFetch } from 'utils/fetcher';

import Layout from 'layout';
import { SpinnerIcon } from 'components/icons';
import { UserList, UserItem } from 'components/user';
import { PageTitle, SearchInput } from 'components/shared';

const UsersPage = () => {
    const [searchTerm, setSearchTerm] = useState(null);
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchTerm === null) {
            const fetchUser = async () => {
                const { data } = await publicFetch.get('/users');
                setUsers(data);
            }

            fetchUser();
        } else {
            const delayDebounceFn = setTimeout(async () => {
                setLoading(true);
                const { data } = await publicFetch.get(
                    searchTerm ? `/users/${searchTerm}` : `/users`
                );
                setUsers(data);
                setLoading(false);
            }, 500);

            return () => clearTimeout(delayDebounceFn);
        }
    }, [searchTerm]);

    return (
        <Layout extra={false}>
            <Head>
                <title>Users - Forum</title>
            </Head>

            <PageTitle title="Users" borderBottom={false} />

            <SearchInput
                placeholder="Search by user"
                autoFocus
                isLoading={loading}
                autoComplete="off"
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {!users && (
                <div className="loading">
                    <SpinnerIcon />
                </div>
            )}

            {users && (
                <>
                    <UserList>
                        {users?.map(({ username, avatar, created, id }) => (
                            <UserItem
                                key={id}
                                username={username}
                                avatar={avatar}
                                created={created}
                            />
                        ))}
                    </UserList>

                    {users.length == 0 && <p className="not-found">No tags matched your search.</p>}
                </>
            )}
        </Layout>
    );
};

export default UsersPage;