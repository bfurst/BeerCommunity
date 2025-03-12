import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Card, Button, Form, Container } from 'react-bootstrap';

import '../styles/style.css';

import { completeRegistration } from '../services/Api';


const EmailVerification = () => {
    const { token } = useParams();
    const navigation = useNavigate();

    useEffect(() => {
        const finishRegistration = async () => {
            try {
                await completeRegistration(token);
            } catch (exception) {
                navigation("/error");
            }
        };

        finishRegistration();
    }, [token, navigation]);

    return (
        <Container className="d-flex mt-auto justify-content-center">
            <Card className='border border-secondary border-4' style={{ width: '46rem', borderRadius: 16, backgroundColor: 'whitesmoke', opacity: '0.9' }}>
                <Card.Body>
                    <Card.Title className="mb-3 text-muted">
                        Registration Complete!
                    </Card.Title>
                    <div className='mb-3 fs-6 text-muted'>
                        Thank you for confirming your email address. Your registration is now complete!
                    </div>
                    <Form id="register-form" style={{ textAlign: 'center' }}>
                        <Button variant="outline-primary w-25" type="button" onClick={() => navigation("/login")}>
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EmailVerification;
