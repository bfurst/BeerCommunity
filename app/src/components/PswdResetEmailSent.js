import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/style.css';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { userExists, sendVerificationToken, userExistsByEmail, getUserByEmail, sendResetPswdToken } from '../services/Api';

const PswdResetEmailSent = ({ email }) => {
    const navigation = useNavigate();

    const [spinnerHidden, setSpinnerHidden] = React.useState(false);

    useEffect(() => {
        setTimeout(() => setSpinnerHidden(true), 10000)
        getToken();
    }, []);

    const resendEmail = () => {
        setSpinnerHidden(false);
        setTimeout(() => setSpinnerHidden(true), 10000);
        getToken();
    };

    const getToken = async () => {
        try {
            await sendResetPswdToken(email);
        } catch {
            navigation("/error", {});
        }
    }

    return (
            <Container className="d-flex justify-content-center">
                <Card className='border border-secondary border-4' style={{ width: '46rem', borderRadius: 16, backgroundColor: 'whitesmoke', opacity: '0.9' }}>
                    <Card.Body>
                        <Card.Title className="mb-3 text-muted">
                            Reset password
                        </Card.Title>
                        <div className="mb-3 fs-5 text-muted align-left">
                            In order to reset your password, it is required to verify your email address. Verification link has been sent to <a href={"mailto: " + email}>{email}</a>, please confirm your email.
                        </div>
                        <Form id="email-sent-form" style={{ textAlign: 'center' }}>
                            <Button isInvalid="false" variant="outline-primary w-25" type="submit" style={{ minHeight: 50 }} disabled={!spinnerHidden} onClick={() => resendEmail()}>
                                <Spinner variant="primary" animation="border" hidden={spinnerHidden} />
                                <span hidden={!spinnerHidden}>Resent mail</span>
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
    );
}
export default PswdResetEmailSent;