import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import * as Icon from 'react-bootstrap-icons';

import '../styles/style.css';

import { register, userExistsByEmail, userExistsByUsername } from '../services/Api';
import TextBox from '../components/TextBox';

const Register = () => {
    const navigation = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pswd, setPswd] = useState("");
    const [repeatPswd, setRepeatPswd] = useState("");
    const [showPswd, setShowPswd] = useState(false);
    const [showRepeatPswd, setShowRepeatPswd] = useState(false);
    const [registerErrorMsg, setRegisterErrorMsg] = useState("");
    const [registerDisabled, setRegisterDisabled] = useState(true);

    const [usernameValid, setUsernameValid] = useState(false);
    const [usernameUnique, setUsernameUnique] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [emailUnique, setEmailUnique] = useState(true);
    const [pswdValid, setPswdValid] = useState(false);
    const [repeatPswdValid, setRepeatPswdValid] = useState(false);

    const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
    const [emailErrorMsg, setEmailErrorMsg] = useState("");

    const usernamePattern = new RegExp('^[A-Za-z0-9]{4,16}$');
    const emailPattern = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
    const pswdPattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z])^.{8,255}$');

    useEffect(() => {
        const isFormValid = usernameValid && usernameUnique && emailValid && emailUnique && pswdValid && repeatPswdValid;
        setRegisterDisabled(!isFormValid);
    }, [usernameValid, usernameUnique, emailValid, emailUnique, pswdValid, repeatPswdValid]);

    useEffect(() => {
        if (usernamePattern.test(username)) {
            setUsernameValid(true);
            const usernameTimer = setTimeout(async () => {
                try {
                    const userExists = await userExistsByUsername(username);
                    if (userExists) {
                        setUsernameUnique(false);
                        setUsernameErrorMsg("Username is already taken.");
                    } else {
                        setUsernameUnique(true);
                        setUsernameErrorMsg("");
                    }
                } catch {
                    navigation("/error");
                }
            }, 1000);
            return () => clearTimeout(usernameTimer);
        } else {
            setUsernameValid(false);
            setUsernameErrorMsg("Username must be 4-16 characters, containing only letters and numbers.");
        }
    }, [username]);

    const validateEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailUnique(true);
        if (emailPattern.test(value)) {
            setEmailValid(true);
            setEmailErrorMsg("");
        } else {
            setEmailValid(false);
            setEmailErrorMsg("Invalid email format.");
        }
    };

    const validatePswd = (e) => {
        const value = e.target.value;
        setPswd(value);
        if (pswdPattern.test(value)) {
            setPswdValid(true);
        } else {
            setPswdValid(false);
        }
    };

    useEffect(() => {
        setRepeatPswdValid(repeatPswd === pswd);
    }, [pswd, repeatPswd]);

    const handleRegistration = async (e) => {
        e.preventDefault();

        try {
            const userExists = await userExistsByEmail(email);
            if (!userExists) {
                setEmailUnique(true);
                setEmailErrorMsg("");

                if (!registerDisabled) {
                    window.grecaptcha.ready(() => {
                        window.grecaptcha.execute('6LelWM0pAAAAAE0Tnf0qjByC7PlfAMruZfS6N806', { action: 'submit' })
                            .then(async (token) => {
                                const user = { username, email, password: pswd, token };
                                const userData = await register(user);
                                if (userData["reCaptcha"]) {
                                    setRegisterErrorMsg(userData["ReCaptchaMessage"]);
                                } else {
                                    navigation("/verification-required", {
                                        state: {
                                            email: userData["email"],
                                            type: "email-conf"
                                        }
                                    });
                                }
                            })
                            .catch(() => {
                                setRegisterErrorMsg("reCAPTCHA validation failed. Please try again.");
                            });
                    });
                } else {
                    setRegisterErrorMsg("Please ensure all fields are filled correctly.");
                }
            } else {
                setEmailUnique(false);
                setEmailErrorMsg("Email is already registered.");
            }
        } catch {
            navigation("/error");
        }
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js?render=6LelWM0pAAAAAE0Tnf0qjByC7PlfAMruZfS6N806";
        script.id = "recaptcha-script";
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
            const recaptchaBadges = document.getElementsByClassName('grecaptcha-badge');
            while (recaptchaBadges.length > 0) {
                recaptchaBadges[0].parentNode.removeChild(recaptchaBadges[0]);
            }
        };
    }, []);

    return (
        <Container className="d-flex mt-auto justify-content-center">
            <Card className='border border-secondary border-4' style={{ width: '24rem', borderRadius: 16, backgroundColor: 'whitesmoke', opacity: '0.9' }}>
                <Card.Body>
                    <Card.Title>Register</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Create your account</Card.Subtitle>
                    <Form id="register-form" style={{ textAlign: 'left' }}>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label className='register-label'>Username</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                placeholder="Enter username"
                                isInvalid={username && (!usernameValid || !usernameUnique)}
                                onChange={e => setUsername(e.target.value)}
                            />
                            <Form.Control.Feedback className="validation-error" type="invalid">
                                {usernameErrorMsg}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='register-label'>Email address</Form.Label>
                            <TextBox.Simple
                                placeholder={"Enter email address"}
                                regex={emailPattern}
                                errorMessage={"Email addres does not have valid form"}
                                setData={(text, isValid) => { setEmail(text); setEmailValid(isValid) }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label className='register-label'>Password</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type={showPswd ? "text" : "password"}
                                    required
                                    isInvalid={pswd && !pswdValid}
                                    style={{ borderRight: "none" }}
                                    placeholder="Enter password"
                                    onChange={validatePswd}
                                />
                                <InputGroup.Text style={{ backgroundColor: "white" }} onClick={() => setShowPswd(!showPswd)}>
                                    {showPswd ? <Icon.Eye size={24} color='grey' /> : <Icon.EyeSlash size={24} color='grey' />}
                                </InputGroup.Text>
                                <Form.Control.Feedback className="validation-error" type="invalid">
                                    Password must be at least 8 characters long, contain at least one uppercase, one number, and one special character.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formRepeatPassword">
                            <Form.Label className='register-label'>Repeat password</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type={showRepeatPswd ? "text" : "password"}
                                    required
                                    isInvalid={repeatPswd && !repeatPswdValid}
                                    style={{ borderRight: "none" }}
                                    placeholder="Repeat password"
                                    onChange={e => setRepeatPswd(e.target.value)}
                                />
                                <InputGroup.Text style={{ backgroundColor: "white" }} onClick={() => setShowRepeatPswd(!showRepeatPswd)}>
                                    {showRepeatPswd ? <Icon.Eye size={24} color='grey' /> : <Icon.EyeSlash size={24} color='grey' />}
                                </InputGroup.Text>
                                <Form.Control.Feedback className="validation-error" type="invalid">
                                    Passwords must match.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Button disabled={registerDisabled} variant="outline-primary w-100" type="submit" onClick={handleRegistration}>
                            Register
                        </Button>
                        {registerErrorMsg && <div className="mt-2 invalid-feedback validation-error" style={{ display: "block" }}>{registerErrorMsg}</div>}
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Register;
