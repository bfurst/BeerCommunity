import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import '../styles/style.css';

import VerificationEmailSent from '../components/VerificationEmailSent';
import PswdResetEmailSent from '../components/PswdResetEmailSent';
import EmailUpdateNotificationSent from '../components/EmailUpdateNotificationSent';
import AccountDeleteNotificationSent from '../components/AccountDeleteNotificationSent';

const EmailSent = () => {
    const location = useLocation();
    const navigation = useNavigate();

    const { type, email } = location.state || {};

    useEffect(() => {
        if (!email || !type) {
            navigation("/error");
        }
    }, [email, type, navigation]);

    const renderNotificationComponent = () => {
        switch (type) {
            case "pswd-reset":
                return <PswdResetEmailSent email={email} />;
            case "email-change":
                return <EmailUpdateNotificationSent email={email} />;
            case "delete-account":
                return <AccountDeleteNotificationSent email={email} />;
            default:
                return <VerificationEmailSent email={email} />;
        }
    };

    return (
        <div className="d-flex mt-auto justify-content-center">
            {renderNotificationComponent()}
        </div>
    );
};

export default EmailSent;
