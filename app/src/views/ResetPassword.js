import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';

import '../styles/style.css';

import * as Icon from 'react-bootstrap-icons';

import { resetPassword } from '../services/Api';

export default function EmailSent() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [pswd, setPswd] = useState("");
    const [showPswd, setShowPswd] = useState(false);
    const [pswdValid, setPswdValid] = useState(false);
    const pswdPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,255}$/;

    const [repeatPswd, setRepeatPswd] = useState("");
    const [showRepeatPswd, setShowRepeatPswd] = useState(false);
    const [repeatPswdValid, setRepeatPswdValid] = useState(false);

    useEffect(() => {
        setRepeatPswdValid(repeatPswd === pswd);
    }, [pswd, repeatPswd]);

    const validatePswd = (e) => {
        const inputPswd = e.target.value;
        setPswd(inputPswd);
        setPswdValid(pswdPattern.test(inputPswd));
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            const data = { password: pswd, token };
            await resetPassword(data);
            navigate("/login");
        } catch {
            navigate("/error");
        }
    };

    return (
        <Container className="d-flex mt-auto justify-content-center align-items-center">
            <Card className="border border-secondary border-4" style={{ width: '24rem', borderRadius: 16, backgroundColor: 'whitesmoke', opacity: 0.9 }}>
                <Card.Body>
                    <Card.Title className="text-center">Reset Password</Card.Title>
                    <p className="mb-3 fs-6 text-muted text-center">
                        Please enter your new password
                    </p>
                    <Form id="pswd-reset-form" onSubmit={handlePasswordReset}>
                        <Form.Group className="mb-3 text-start" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type={showPswd ? "text" : "password"}
                                    required
                                    isInvalid={pswd !== "" && !pswdValid}
                                    placeholder="Enter password"
                                    onChange={validatePswd}
                                />
                                <InputGroup.Text onClick={() => setShowPswd(!showPswd)} style={{ cursor: 'pointer', backgroundColor: 'white' }}>
                                    {showPswd ? <Icon.Eye size={24} color="grey" /> : <Icon.EyeSlash size={24} color="grey" />}
                                </InputGroup.Text>
                                <Form.Control.Feedback type="invalid">
                                    Password must be at least 8 characters long and contain at least one uppercase letter, one symbol, and one number.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3 text-start" controlId="formRepeatPassword">
                            <Form.Label>Repeat Password</Form.Label>
                            <InputGroup className="mb-3 ">
                                <Form.Control
                                    type={showRepeatPswd ? "text" : "password"}
                                    required
                                    isInvalid={repeatPswd !== "" && !repeatPswdValid}
                                    placeholder="Repeat password"
                                    onChange={(e) => setRepeatPswd(e.target.value)}
                                />
                                <InputGroup.Text onClick={() => setShowRepeatPswd(!showRepeatPswd)} style={{ cursor: 'pointer', backgroundColor: 'white' }}>
                                    {showRepeatPswd ? <Icon.Eye size={24} color="grey" /> : <Icon.EyeSlash size={24} color="grey" />}
                                </InputGroup.Text>
                                <Form.Control.Feedback type="invalid">
                                    Passwords must match.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Button
                            type="submit"
                            variant="outline-primary"
                            className="w-100"
                            disabled={!pswdValid || !repeatPswdValid}
                        >
                            Confirm Password
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}