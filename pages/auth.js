import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { AuthContext } from 'context/auth';
import AuthForms from 'components/auth';

const Login = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        isAuthenticated() && router.replace('/');
    }, [isAuthenticated()]);

    return (
        <div className="auth-container">
            <div className="card">
                <AuthForms screen="signup" />
            </div>
        </div>
    );
};

export default Login