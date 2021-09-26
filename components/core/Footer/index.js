import React from 'react';
import Image from 'next/image';
import logo from 'public/logo.png';

import styles from "./footer.module.css";

export default function Footer() {
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={styles.item}>
                    <Image src={logo} alt="logo" width="50" height="50" />
                </div>
                <div className={styles.item}>
                    <h5 className="font-weight">MAGNIFIERS</h5>
                    <ul>
                        <li>Questions</li>
                        <li>Tags</li>
                        <li>Users</li>
                        <li>Directory</li>
                        <li>Helps</li>
                        <li>Mobile</li>
                        <li>Responsive</li>
                    </ul>
                </div>
                <div className={styles.item}>
                    <h5 className="font-weight">PRODUCT</h5>
                    <ul>
                        <li>Team</li>
                        <li>Talent</li>
                        <li>Advertising</li>
                        <li>Enterprise</li>
                    </ul>
                </div>
                <div className={styles.item}>
                    <h5 className="font-weight">COMPANY</h5>
                    <ul>
                        <li>About</li>
                        <li>Press</li>
                        <li>Work Here</li>
                        <li>Legal</li>
                        <li>Privacy Policy</li>
                        <li>Term of Services</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                <div className={styles.item}>
                    <h5 className="font-weight">EXCHANGE NETWORK</h5>
                    <ul>
                        <li>Technology</li>
                        <li>Arts / Life</li>
                        <li>Culture</li>
                        <li>Science</li>
                        <li>Others</li>
                    </ul>
                </div>
                <div className={styles.item}>
                    <p>
                        Facebook
                        Twitter
                        LinkedIn
                        Instagram
                    </p>
                </div>
            </div>
        </div>
    )
}
