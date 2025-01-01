import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';

function AgeVerificationModal() {
    const { isAuth } = useAuth();
    const [showAgeVerification, setShowAgeVerification] = React.useState(false);

    useEffect(() => {
        if (isAuth !== null) {
            if (document.cookie.indexOf("ageVerified=true") === -1 && !isAuth)
                setShowAgeVerification(true);
            else
                setShowAgeVerification(false);
        }
    }, [isAuth]);

    const handleModal = () => {
        var date = new Date();
        date.setMinutes(date.getMinutes() + 10000);
        document.cookie = "ageVerified=true; expires=" + date.toUTCString() + "; path=/";
        setShowAgeVerification(false);
    };

    return (
        <Modal
            show={showAgeVerification}
            size="md"
            aria-labelledby="contained-modal-title-full"
            backdrop="static"
            keyboard={false}
            Full screen
        >
            <Modal.Header className="justify-content-center" style={{ borderBottom: "none" }}>
                <Modal.Title id="contained-modal-title-full">
                    Welcome to beer reviewer application
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <h6>Hey there! Just a quick check before we get started: Are you old enough to enjoy a cold one?</h6>
                <div className="mt-4 mb-4 d-flex gap-3 justify-content-center">
                    <Button variant="outline-primary" onClick={handleModal}>I'm over 18</Button>
                    <Button variant="outline-danger" onClick={() => window.history.back()}>I'm under 18</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default AgeVerificationModal;