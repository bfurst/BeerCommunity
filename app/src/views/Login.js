import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import '../styles/style.css';
import * as Icon from 'react-bootstrap-icons';
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Alert } from 'bootstrap';
import { useAuth } from '../components/AuthContext';

export default function Login() {
    const { auth } = useAuth();
    const navigation = useNavigate();

    const [input, setInput] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [remember, setRemember] = React.useState(false);
    const [loginDisabled, setLoginDisabled] = React.useState(true);
    const [loginMessage, setLoginMessage] = React.useState("");

    useEffect(() => {
        if (input.length > 3 && password.length > 8)
            setLoginDisabled(false);
        else
            setLoginDisabled(true);

    }, [input, password]);

    const handleLogin = async (e) => {
        try {
            e.preventDefault();

            const login = {
                "input": input,
                "password": password,
                "remember": remember
            };

            const data = await auth(login);

            if (data["status"] === 200)
                navigation("/user/home/");
            else if (data["status"] === 403)
                setLoginMessage("Your account has been blocked. If you believe this is a mistake or wish to appeal the decision, please contact our support team at <a href=\"mailto: admin@revbeer.info\">admin@revbeer.info</a><br />");
            else
                setLoginMessage("Login failed. Please, check entered data and try again.");

        } catch {
            navigation("/error");
        }
    }

    return (
        <Container className="d-flex mt-auto justify-content-center">
            <Card className='border border-secondary border-4' style={{ width: '24rem', borderRadius: 16, backgroundColor: 'whitesmoke', opacity: '0.9' }}>
                <Card.Body>
                    <Card.Title>Login</Card.Title>
                    <Form id="register-form" style={{ textAlign: 'left' }}>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label className='register-label' >Username or email</Form.Label>
                            <Form.Control type="text" required placeholder="Enter username or email" onChange={e => setInput(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label className='register-label'>Password</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control type={showPassword ? "text" : "password"} required style={{ borderRight: "none" }} placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
                                <InputGroup.Text style={{ backgroundColor: "white" }} onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <Icon.Eye size={24} color='grey' /> : <Icon.EyeSlash size={24} color='grey' />}
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                        <div className="d-flex flex-row justify-content-between mb-3">
                            <Form.Check type="checkbox" id="cb-remember-me" className="fs-6" label="Remember me" onChange={e => setRemember(e.target.checked)} />
                            <Link to="/forgot-password" className="fs-6">Forgot password?</Link>
                        </div>

                        <Button disabled={loginDisabled} isInvalid="false" variant="outline-primary w-100" type="submit" onClick={e => handleLogin(e)}>
                            Login
                        </Button>
                        <div className="mt-2 invalid-feedback validation-error" dangerouslySetInnerHTML={{ __html: loginMessage }} style={{ display: "block" }}>
                        </div>

                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}