import React, { useState, useContext } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { publicFetch } from 'utils/fetcher';
import { AuthContext } from 'context/auth';
import ModalContext from 'context/modal';

import FormInput from 'components/shared/FormInput';
import Button from 'components/shared/Button';

import styles from './login-form.module.css';

const LoginForm = () => {
    const { setAuthState } = useContext(AuthContext);
    const { setIsComponentVisible } = useContext(ModalContext);

    const [loading, setLoading] = useState(false);

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={async (values, { setStatus, resetForm }) => {
                setLoading(true);
                try {
                    const { data } = await publicFetch.post('login', values);
                    const { token, expiresAt, userInfo } = data;
                    setAuthState({ token, expiresAt, userInfo });
                    resetForm({});
                    setIsComponentVisible(false);
                } catch (error) {
                    setStatus(error.response.data.message);
                }
                setLoading(false);
            }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .required('Required')
                    .email('Invalid email format'),
                password: Yup.string()
                    .required('Required')
                    .min(6, 'Must be at least 6 characters long')
                    .max(50, 'Must be at most 50 characters long')
            })}
        >
            {({
                values,
                errors,
                touched,
                status,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
            }) => (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <FormInput 
                        label="Email"
                        type="email"
                        name="email"
                        autoComplete="off"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        hasError={touched.email && errors.email}
                        errorMessage={errors.email && errors.email}
                    />
                    <FormInput 
                        label="Password"
                        type="password"
                        name="password"
                        autoComplete="off"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        hasError={touched.password && errors.password}
                        errorMessage={errors.password && errors.password}
                    />
                    <p className={styles.status}>{status}</p>
                    <Button
                        primary
                        full
                        className={styles.submitButton}
                        type="submit"
                        isLoading={loading}
                        disabled={isSubmitting}
                    >
                        Log in
                    </Button>
                </form>
            )} 
        </Formik>
    );
};

export default LoginForm;