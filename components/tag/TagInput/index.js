import React from 'react';
import cn from 'classnames';
import TagsInput from 'react-tagsinput';
import { AlertIcon } from 'components/icons';
import styles from './tag-input.module.css';

const TagInput = ({ 
    label,
    inputInfo,
    hasError = false,
    errorMessage,
    ...props
}) => {
    return (
        <div className={styles.container}>
            <label className={styles.label}>{label}</label>
            {inputInfo && <p className={styles.inputInfo}>{inputInfo}</p>}
            <div className={styles.inputContainer}>
                <TagsInput 
                    onlyUnique
                    className={cn('react-tagsinput', hasError && styles.error)}
                    focusedClassName={styles.inputContainer}
                    {...props}
                />
                {hasError && <AlertIcon className={styles.alert} />}
            </div>
            {hasError && <p className={styles.errorMessage}>{errorMessage}</p>}
        </div>
    );
};

export default TagInput;