import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { sendChangeEmailToken, userExistsByEmail } from '../services/Api';
import { useNavigate } from 'react-router-dom';

const ResetEmailModal = (props) => {
    const navigation = useNavigate();
    
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [confirmMsg, setConfirmMsg] = useState('');

    const validateEmail = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue === '') {
            setEmailValid(false);
            setEmailErrorMsg('Email address is required.');
        } else if (!emailRegex.test(emailValue)) {
            setEmailValid(false);
            setEmailErrorMsg('Please enter a valid email address.');
        } else {
            setEmailValid(true);
            setEmailErrorMsg('');
        }
    };

    const handleConfirm = async (e) => {
        try {
            e.preventDefault();
            const userExists = await userExistsByEmail(email);
            if (!userExists) {
                navigation("/verification-required", {state: { email: email, type: "email-change" }});
            }

            setConfirmMsg("Email address is alredy used. Please, choose different address.");
        } catch (ex) {
            navigation("/error");
        }
    };

    const closeModal = () => {
        setEmail('');
        setEmailErrorMsg('');
        setEmailValid(false);
        setConfirmMsg('');

        props.onClose();
    };

    return (
        <Modal
            {...props}
            backdrop="static"
            centered>
            <Modal.Header>
                <Modal.Title>Reset Your Email</Modal.Title>
                <button type="button" class="btn-close" aria-label="Close" onClick={() => closeModal()}></button>
            </Modal.Header>
            <Modal.Body>
                <div className='mb-3 fs-6 text-muted'>
                    Please, provide your email address in order to reset your password.
                </div>
                <Form id="forgot-password-form" style={{ textAlign: 'left' }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="register-label">Email address</Form.Label>
                        <Form.Control
                            type="email"
                            required
                            placeholder="Enter email"
                            isInvalid={email === "" ? false : !emailValid}
                            onChange={validateEmail}
                        />
                        <Form.Control.Feedback className="validation-error" type="invalid">
                            {emailErrorMsg}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button
                        disabled={!emailValid}
                        variant="outline-primary w-100"
                        type="submit"
                        onClick={handleConfirm}
                    >
                        Confirm
                    </Button>
                    <div className="mt-2 invalid-feedback validation-error" style={{ display: "block" }}>
                        {confirmMsg}
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ResetEmailModal;
