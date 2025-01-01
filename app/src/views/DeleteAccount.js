import Card from 'react-bootstrap/Card';
import '../styles/style.css';
import * as Icon from 'react-bootstrap-icons';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import { completeRegistration, deleteAccount } from '../services/Api';
import { useAuth } from '../components/AuthContext';

export default function DeleteAccount() {
    const { logout } = useAuth();
    const { token } = useParams();
    const navigation = useNavigate();

    useEffect(() => { 
        deleteUserAccount();
    }, []);

    const deleteUserAccount = async () => {
        try{
            await deleteAccount(token);
            logout();
        } catch (exception){
            // log
            navigation("/error", {});
        }
    };

    return (
        <Container className="d-flex my-auto justify-content-center">
            <Card className='border border-secondary border-4' style={{ width: '46rem', borderRadius: 16, backgroundColor: 'whitesmoke', opacity: '0.9' }}>
                <Card.Body>
                    <Card.Title className="mb-3 text-muted">
                        Account Deleted Successfully
                    </Card.Title>
                    <div className='mb-3 fs-6 text-muted'>
                        Thank you for confirming your email address. Your account is now deleted.
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}