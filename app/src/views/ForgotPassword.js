import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

import '../styles/style.css';

import { userExistsByEmail, sendResetPswdToken } from '../services/Api';
import TextBox from '../components/TextBox';

export default function ForgotPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(false);
    const [confirmMsg, setConfirmMsg] = useState("");

    const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    const handleConfirm = async (e) => {
        e.preventDefault();

        try {
            const userExists = await userExistsByEmail(email);

            if (userExists)
                navigate("/verification-required", { state: { email, type: "pswd-reset" } });

            setConfirmMsg("Email address not found or not confirmed.");
        } catch (error) {
            navigate("/error", {});
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center mt-auto">
            <Card className="border border-secondary border-4" style={{ width: '24rem', borderRadius: 16, backgroundColor: 'whitesmoke', opacity: 0.9 }}>
                <Card.Body>
                    <Card.Title className="text-center">Forgot Password</Card.Title>
                    <p className="mb-3 fs-6 text-muted text-center">
                        Please provide your email address to reset your password.
                    </p>
                    <Form id="forgot-password-form" onSubmit={handleConfirm}>
                        <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <TextBox.Simple
                                placeholder={"Enter email address"}
                                regex={emailPattern}
                                errorMessage={"Email addres does not have valid form"}
                                setData={(text, isValid) => { setEmail(text); setEmailValid(isValid) }}
                            />
                        </Form.Group>

                        <Button
                            type="submit"
                            variant="outline-primary"
                            className="w-100"
                            disabled={!emailValid}
                        >
                            Confirm
                        </Button>

                        {confirmMsg && (
                            <div className="mt-2 text-danger text-center">
                                {confirmMsg}
                            </div>
                        )}
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
