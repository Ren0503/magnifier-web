import React, { useContext } from 'react';
import { TagContext } from 'context/tag';
import { Tag } from 'components/tag';
import { SpinnerIcon } from 'components/icons';
import styles from './extra.module.css';

const Extra = ({ marginTop = 24 }) => {
    const { tagState } = useContext(TagContext);

    return (
        <div className={styles.container}>
            <div
                className={styles.tagContainer}
                style={{ marginTop: `${marginTop}px` }}
            >
                <h2>Popular Tags</h2>
                {!tagState && (
                    <div className="loading">
                        <SpinnerIcon />
                    </div>
                )}
                <div className={styles.popularTags}>
                    {tagState?.map((tag) => (
                        <Tag key={tag._id} count={tag.count}>
                            {tag._id}
                        </Tag>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Extra;
