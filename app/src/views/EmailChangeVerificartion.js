import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import '../styles/style.css';
import * as Icon from 'react-bootstrap-icons';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import { changeEmail, completeRegistration } from '../services/Api';

export default function EmailChangeVerification() {
    const { token } = useParams();
    const navigation = useNavigate();

    useEffect(() => { 
        finishRegistration();
    }, []);

    const finishRegistration = async () => {
        try{
            await changeEmail(token);
        } catch (exception){
            // log
            navigation("/error", {});
        }
    };

    return (
        <Container className="d-flex mt-auto justify-content-center">
            <Card className='border border-secondary border-4' style={{ width: '46rem', borderRadius: 16, backgroundColor: 'whitesmoke', opacity: '0.9' }}>
                <Card.Body>
                    <Card.Title className="mb-3 text-muted">
                        Email Address Updated!
                    </Card.Title>
                    <div className='mb-3 fs-6 text-muted'>
                        Thank you for confirming your new email address. You can close this form now.
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}
